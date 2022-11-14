import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    timers: [ //ここに作成したタイマーが入る
      {
        color: 'rgba(20, 20, 20, 0.8)',
        id: 0,
        name: "Sample timer",
        sound: 'delay',
        style: 'Digital',
        time: 3600
      }
    ], 
    nextTimerId: 1,
    colors: [
      {id: 1, name: 'grey',color: 'rgba(200, 200, 200, 0.3)'},
      {id: 2, name: 'green',color: 'rgba(50, 180, 100, 0.8)'},
      {id: 3, name: 'blue',color: 'rgba(50, 70, 200, 0.8)'},
      {id: 4, name: 'red',color: 'rgba(240, 10, 10, 0.8)'},
      {id: 5, name: 'dark',color
      : 'rgba(20, 20, 20, 0.8)'}
    ],
    sounds: [
      {id: 1, name: 'single'},
      {id: 2, name: 'poly'},
      {id: 3, name: 'delay'}
    ],
    styles: [
      {id: 1, name: 'Digital'},
      {id: 2, name: 'Clasic'},
      {id: 3, name: 'Circle'}
    ],
    currentTimerId: 0, //TimerComp.vueに表示されるタイマーのIDが入る
  },
  mutations: {
    selectTimer(state, {id}) {
      state.currentTimerId = id;
    },
    //新しいtimerを作る
    makeTimer(state, {name, time, color, sound, style}) {
      state.timers.push({
        id: state.nextTimerId,
        name,
        time,
        color,
        sound,
        style,
      })
    state.nextTimerId++
    }
  }
})
export default store