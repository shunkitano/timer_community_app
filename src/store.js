import Vue from 'vue'
import Vuex from 'vuex'
import { db } from '@/firebase/firebase'
import { addDoc, updateDoc, collection, getDocs, query, serverTimestamp } from 'firebase/firestore'

Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
    timers: [ 
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
    fetchTimers: [], //ここに作成したタイマーが入る
    communityTimers: [],
    nextTimerId: 1,
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
    currentTimerId: 0, //TimerComp.vueに表示されるタイマーのIDが入る
  },
  mutations: {
    selectTimer(state, {id}) {
      state.currentTimerId = id;
    },
    //firebaseにタイマーを追加する
    makeTimer(state, {text, style, color, sound, time}) {
    addDoc(collection(db, 'timers'), {
      createdAt: serverTimestamp(),
      userId: 1,
      timerId: state.nextTimerId,
      name: text,
      style: style,
      color: color,
      sound: sound,
      time: time,
      isCom: false
      })
      .then(doc => {
        console.log(`DBへのデータ追加成功 (${doc.id})`);
      })
      .catch(error => {
        console.log(`DBへのデータ追加失敗 (${error})`);
      })
      state.nextTimerId++;
    },
    //既存のタイマーのisComを編集する
    async putPrivate({id}) {
      const q = query(collection(db, `timers[${id}]`));
      const updateTimer = await updateDoc(q, {
        isCom: false
      });
      // state.fetchTimers[id].isCom = false;
      console.log(updateTimer);
    },
    putCom(state, {id}) {
      state.fetchTimers[id].isCom = true;
      console.log(state.fetchTimers[id]);
    },
    receiveItems(state, datas) {
      state.fetchTimers = datas;
      state.nextTimerId = state.fetchTimers.at(0).timerId + 1;
      // console.log(state.nextTimerId);
    },
    receiveCommunityItems(state, datas) {
      state.communityTimers = datas;
      // state.nextTimerId = state.communityTimers.at(0).timerId + 1;
      // console.log(state.nextTimerId);
    }
  },
  getters: {
    
  },
  actions: {
    async fetchDatas({commit}) {
      const q = query(collection(db, 'timers'));
      const timersDoc = await getDocs(q);
      console.log(timersDoc);
      const getTimers = [];
      timersDoc.forEach((doc) => {
        getTimers.push(doc.data());
      })
      commit('receiveItems', getTimers);
    },
    async fetchCommunityDatas({commit}) {
      const q = query(collection(db, 'timers'));
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