import Vue from 'vue'
import Vuex from 'vuex'
import { db } from '@/firebase/firebase'
import { addDoc, collection, serverTimestamp,  getDocs, query, updateDoc, orderBy , doc, deleteDoc, where} from 'firebase/firestore'//
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import * as Tone from 'tone';

Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
    fetchTimers: [], //ここにユーザールームのタイマーが入る
    getTime: 0, //タイマー使用時のカウントが入る
    setTime: '', //カウントダウン用
    isStop: true,
    fetchTimersIds: [], //ユーザーのタイマーIDが入る
    nextTimerId: 0, //ユーザーがはじめてタイマーを作成するときのID
    communityTimers: [], //ここにコミュニティのタイマーが入る
    users: [], //コミュニティのタイマーにユーザー名を結びつけるための配列
    uid: null, //ログインしているユーザーのuid
    empty: '', //ログインしておりかつ、タイマーが空の場合に、作成画面に飛ぶ
    themeColors: [
      {id: 1, name: 'tomato', color: 'rgba(220, 10, 5, 0.8)'},
      {id: 2, name: 'orange', color: 'rgba(255, 100, 0, 0.8)'},
      {id: 3, name: 'grass', color: 'rgba(0, 255, 4, 0.8)'},
      {id: 4, name: 'sky', color: 'rgba(190, 255, 255, 0.8)'},
      {id: 5, name: 'ocean', color: 'rgba(0, 50, 200, 0.7)'},
      {id: 6, name: 'snow', color: 'rgba(200, 200, 200, 0.3)'},
      {id: 7, name: 'darkgrey', color: 'rgba(100, 100, 100, 0.8)'},
      {id: 8, name: 'brack', color: 'rgba(20, 20, 20, 0.8)'}
    ], 
    accentColors: [
      {id: 1, name: 'pink', color: 'rgba(255, 0, 200, 0.9)'},
      {id: 2, name: 'red', color: 'rgba(240, 0, 0, 0.9)'},
      {id: 3, name: 'orange', color: 'rgba(255, 100, 0, 0.9)'},
      {id: 4, name: 'yellow', color: 'rgba(255, 255, 0, 0.9)'},
      {id: 5, name: 'green', color: 'rgba(0, 255, 4, 0.9)'},
      {id: 6, name: 'blue', color: 'rgba(0, 0, 255, 0.9)'},
      {id: 7, name: 'darkgrey', color: 'rgba(100, 100, 100, 0.9)'},
      {id: 8, name: 'brack', color: 'rgba(20, 20, 20, 0.9)'}
    ],
    sounds: [
      {id: 1, name: 'flick'},
      {id: 2, name: 'poly'},
      {id: 3, name: 'delay'}
    ],
    styles: [
      {id: 1, name: 'digital'},
      {id: 2, name: 'chronograph'},
      {id: 3, name: 'circle'}
    ],
    currentTimerId: 0, //TimerComp.vueに表示されるタイマーのIDが入る（ユーザーが使用するタイマー）
  },
  getters: {
    time(state) {
      return state.fetchTimers[state.currentTimerId].time;
    },
    getTime(state) {
      return state.getTime;
    }
  },
  mutations: {
    async makeTimer(state, {text, style, themeColor, accentColor, sound, time}) { //firebaseにタイマーを追加する
      const q = query(collection(db, 'timers'));
      const timersDoc = await getDocs(q);
      let setid = 0;
      timersDoc.docs.forEach((doc) => { //各ユーザーの現在のタイマー数の中で最も大きいIDを取得
        const getid = doc.data().timerId;
        if (getid > setid) {
          setid = getid;
        }
      })
      console.log("setid:",setid);
      console.log(state.uid);
      state.nextTimerId = setid; //現在のIDを取得
      state.nextTimerId++; //最新のIDに更新
      addDoc(collection(db, 'timers'), {
        createdAt: serverTimestamp(),
        timerId: state.nextTimerId,
        userId: state.uid,
        name: text,
        style: style,
        themeColor: themeColor,
        accentColor: accentColor,
        sound: sound,
        time: time,
        isCom: false,
        userOnly: false,
      })
      .then(doc => {
        console.log(`DBへのデータ追加成功 (${doc})`);
      })
      .catch(error => {
        console.log(`DBへのデータ追加失敗 (${error})`);
      })
    },
    selectTimer(state, {index}) { //ユーザールームでタイマーを選ぶ
      console.log(index);
      state.currentTimerId = index;
      console.log(state.fetchTimers);
    },
    async putPrivate(state, {id, privateCom}) { //タイマーをプライベイトに設定する
      console.log(state.fetchTimersIds, id);
      const timerId = state.fetchTimersIds[id];
      console.log(timerId);
      console.log(privateCom);
      state.fetchTimers[id].isCom = privateCom;
      const q = doc(db, 'timers', timerId);
      console.log(q)
      await updateDoc(q, {
        isCom: false
      });
    },
    async putCom(state, {id, privateCom}) { //タイマーをコミュニティに公開する
      console.log(state.fetchTimersIds, id);
      const timerId = state.fetchTimersIds[id];
      console.log(timerId);
      console.log(privateCom);
      state.fetchTimers[id].isCom = privateCom;
      const q = doc(db, 'timers', timerId);
      console.log(q)
      await updateDoc(q, {
        isCom: true
      });
    },
    async deleteTimer(state, {id}) { //タイマーを削除するasync 
      console.log(state.fetchTimersIds[id]);
      const docId = state.fetchTimersIds[id];
      await deleteDoc(doc(db, 'timers', `${docId}` ));
    },
    changeTime(state, {number}) { //使用するタイマーの時間を変更する
      const time = state.getTime;
      state.getTime = time + number;
    },
    countTime(state) {
      state.isStop = false;
      state.setTime = setInterval(() => {
        if(state.getTime > - state.fetchTimers[state.currentTimerId].time) {
          state.getTime--;
        } else if (state.getTime === - state.fetchTimers[state.currentTimerId].time) {
          clearInterval(state.setTime);
          const sound = state.fetchTimers[state.currentTimerId].sound;
          if(sound === 'flick') {
            const plucky = new Tone.PluckSynth().toDestination();
            plucky.triggerAttack("G4", "+0.2");
            plucky.triggerAttack("E5", "+0.4");
            plucky.triggerAttack("D3", "+0.6");
            plucky.triggerAttack("A2", "+0.8");
            plucky.triggerAttack("G4", "+1.0");
            plucky.triggerAttack("E5", "+1.2");
            plucky.triggerAttack("D3", "+1.4");
            plucky.triggerAttack("A2", "+1.6");
            plucky.triggerAttack("G4", "+1.8");
            plucky.triggerAttack("E5", "+2.0");
            plucky.triggerAttack("D3", "+2.2");
            plucky.triggerAttack("A2", "+2.4");
          }
          if(sound === 'poly') {
            const synth2 = new Tone.PolySynth().toDestination();
            synth2.set({ detune: -800 });
            synth2.triggerAttackRelease(["A5", "D5","E5"], 1);
          }
          if(sound === 'delay') {
            const pingPong = new Tone.PingPongDelay("4n", 0.6).toDestination();
            const synth3 = new Tone.PolySynth().connect(pingPong);
            synth3.set({ detune: -800 });
            synth3.triggerAttackRelease(["A5", "D5","E5"], "40n");
          }
          state.isStop = true;
        }
      }, 10);
    },
    stopTime(state) {
      state.isStop = true;
      clearInterval(state.setTime);
    },
    async addCommunityTimer(state, {name, style, themeColor, accentColor, sound, time}) {
      const q = query(collection(db, 'timers'));
      const timersDoc = await getDocs(q);
      let setid = 0;
      timersDoc.docs.forEach((doc) => { //各ユーザーの現在のタイマー数の中で最も大きいIDを取得
        const getid = doc.data().timerId;
        if (getid > setid) {
          setid = getid;
        }
      })
      console.log("setid:",setid);
      console.log(state.uid);
      state.nextTimerId = setid; //現在のIDを取得
      state.nextTimerId++; //最新のIDに更新
      addDoc(collection(db, 'timers'), {
        createdAt: serverTimestamp(),
        timerId: state.nextTimerId,
        userId: state.uid,
        name: name,
        style: style,
        themeColor: themeColor,
        accentColor: accentColor,
        sound: sound,
        time: time,
        isCom: false,
        useOnly: true
      })
      .then(doc => {
        console.log(`DBへのデータ追加成功 (${doc})`);
      })
      .catch(error => {
        console.log(`DBへのデータ追加失敗 (${error})`);
      })
    },
    receiveItems(state, datas) {
      state.fetchTimers = datas;
    },
    receiveIds(state, ids) {
      state.fetchTimersIds = ids;
    },
    receiveEmpty(state, empty) {
      state.empty = empty;
    },
    receiveUid(state, uid) {
      state.uid = uid;
    },
    receiveCommunityItems(state, datas) {
      state.communityTimers = datas;
      for(let i = 0; i < state.users.length;  i++) {
        state.communityTimers.forEach((e) => {
          if(e.userId === state.users[i].userId ) {
            e.userName = state.users[i].name;
          }
        }) 
      }
    },
    receiveUserName(state, users) {
      state.users = users;
    }
  },
  actions: {
    async fetchUserId({commit}) {
      const auth = await getAuth();
      onAuthStateChanged(auth, (user) => {
        if(user) {
          const uid = user.uid;
          console.log(uid);
          commit('receiveUid', uid);
        } else { 
          console.log("user not exist!");
          const uid = null;
          console.log(uid);
          commit('receiveUid', uid);
        }
      })
    },
    async fetchDatas({commit, state}) { //各ユーザーの部屋に入るタイマーを取得する 
      console.log("userId:",state.uid);
      const getTimers = [];
      const getTimersIds = [];
      const q = query(collection(db, 'timers'),where('userId', '==', state.uid),orderBy('createdAt'));//作成された時間でタイマーを並べる為にorderByを入れる
      const timersDoc = await getDocs(q);
      console.log("userTimers:",timersDoc);
      console.log("empty:", timersDoc.empty);
      const getEmpty = timersDoc.empty;
      timersDoc.forEach((doc) => {
        getTimers.push(doc.data());
      });
      timersDoc.docs.forEach((doc) => {
        getTimersIds.push(doc.id);
      });
      commit('receiveEmpty', await getEmpty);
      commit('receiveItems', await getTimers);
      commit('receiveIds', await getTimersIds);
    },
    async fetchCommunityDatas({commit}) { //コミュニティに入るタイマーを取得する
      const q = await query(collection(db, 'timers'), orderBy('createdAt'));
      const timersDoc = await getDocs(q);
      const getTimers = [];
      timersDoc.forEach((doc) => {
        if(doc.data().isCom === true) {
          getTimers.push(doc.data());
        }
      })
      commit('receiveCommunityItems', await getTimers);
    },
    async fetchUser({commit}) {
      const dqs = await query(collection(db, 'users'));
      const usersDoc = await getDocs(dqs)
      const getUsers = []
      usersDoc.forEach((doc) => {
        getUsers.push(doc.data());
      })
      commit('receiveUserName', await getUsers);
    } 
  }
})
export default store