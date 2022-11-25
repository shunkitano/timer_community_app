import Vue from 'vue'
import Vuex from 'vuex'
import { db } from '@/firebase/firebase'
import { addDoc, collection, serverTimestamp, updateDoc, getDocs, query,  orderBy , doc, deleteDoc, where} from 'firebase/firestore'
import { getAuth, onAuthStateChanged } from 'firebase/auth';

Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
    timers: [ //作業用なのであとで消す
      {
        color: 'rgba(20, 20, 20, 0.8)',
        id: 0,
        name: "Sample1",
        sound: 'single',
        style: 'digital',
        time: 3600,
        isCom: true
      },
      {
        color: 'rgba(200, 200, 200, 0.3)',
        id: 1,
        name: "Sample2",
        sound: 'delay',
        style: 'digital',
        time: 3661,
        isCom: false
      }
    ],
    fetchTimers: [], //ここにユーザールームのタイマーが入る
    fetchTimersIds: [],
    communityTimers: [], //ここにコミュニティのタイマーが入る
    nextTimerId: 0, //ユーザーが作成するたびに振られるタイマーのID
    uid: '',
    colors: [
      {id: 1, name: 'grey', color: 'rgba(200, 200, 200, 0.3)'},
      {id: 2, name: 'green', color: 'rgba(50, 180, 100, 0.8)'},
      {id: 3, name: 'blue', color: 'rgba(50, 70, 200, 0.8)'},
      {id: 4, name: 'red', color: 'rgba(240, 10, 10, 0.8)'},
      {id: 5, name: 'dark', color: 'rgba(20, 20, 20, 0.8)'}
    ],
    sounds: [
      {id: 1, name: 'single'},
      {id: 2, name: 'poly'},
      {id: 3, name: 'delay'}
    ],
    styles: [
      {id: 1, name: 'digital'},
      {id: 2, name: 'clasic'},
      {id: 3, name: 'circle'}
    ],
    currentTimerId: 0, //TimerComp.vueに表示されるタイマーのIDが入る（ユーザーが使用するタイマー）
  },
  mutations: {
    async makeTimer(state, {text, style, color, sound, time}) { //firebaseにタイマーを追加する
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
        color: color,
        sound: sound,
        time: time,
        isCom: false
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
    async putPrivate() { //タイマーをプライベイトに設定する
      const q = query(collection(db, 'timers'));
      const updateTimer = await updateDoc(q, {
        isCom: false
      }); // state.fetchTimers[id].isCom = false;
      console.log(updateTimer);
    },
    putCom(state, {id}) { //タイマーをコミュニティに公開する
      state.fetchTimers[id].isCom = true;
      console.log(state.fetchTimers[id]);
    },
    async deleteTimer(state,{id}) { //タイマーを削除するasync 
      console.log(state.fetchTimersIds[id]);
      const docId = state.fetchTimersIds[id];
      await deleteDoc(doc(db, 'timers', `${docId}` ));
    },
    receiveItems(state, datas) {
      state.fetchTimers = datas;
      // console.log(state.fetchTimers);
    },
    receiveIds(state, ids) {
      state.fetchTimersIds = ids;
      // console.log(state.fetchTimersIds);
    },
    receiveUid(state, uid) {
      state.uid = uid;
    },
    receiveCommunityItems(state, datas) {
      state.communityTimers = datas;
    }
  },
  getters: {
    
  },
  actions: {
    async fetchDatas({commit}) { //各ユーザーの部屋に入るタイマーを取得する
      const auth = getAuth();
      onAuthStateChanged(auth, (user) => {
        if(user) {
          const uid = user.uid ;
          commit('receiveUid', uid);
        } else {
          console.log("user not exist!");
        }
      })
      const q = query(collection(db, 'timers'),where('userId', '==', `"`+`${uid}`+`"`),orderBy('createdAt'));//作成された時間でタイマーを並べる為にorderByを入れる
      const timersDoc = await getDocs(q);
      const getTimers = [];
      const getTimersIds = [];
      console.log(timersDoc);
      timersDoc.forEach((doc) => {
        getTimers.push(doc.data());
      });
      timersDoc.docs.forEach((doc) => {
        getTimersIds.push(doc.id);
      });
      commit('receiveItems', getTimers);
      commit('receiveIds', getTimersIds);
    },
    async fetchCommunityDatas({commit}) { //コミュニティに入るタイマーを取得する
      const q = query(collection(db, 'timers'), orderBy('createdAt'));
      const timersDoc = await getDocs(q);
      console.log(timersDoc);
      const getTimers = [];
      timersDoc.forEach((doc) => {
        if(doc.data().isCom === true) {
          getTimers.push(doc.data());
        }
      })
      commit('receiveCommunityItems', getTimers);
    }
  }
})
export default store