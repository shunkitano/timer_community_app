import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    timers: [ //ここに作成したタイマーが入る
      {
        color: 'rgba(20, 20, 20, 0.8)',
        id: 0,
        name: "Sample",
        sound: 'delay',
        style: 'digital',
        time: 3600,
        open: true
      },
      {
        color: 'rgba(200, 200, 200, 0.3)',
        id: 1,
        name: "Sample1",
        sound: 'delay',
        style: 'digital',
        time: 3905,
        open: false
      }
    ], 
    nextTimerId: 2,
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
    //新しいtimerを作る
    makeTimer(state, {name, time, color, sound, style}) {
      state.timers.push({
        id: state.nextTimerId,
        name,
        time,
        color,
        sound,
        style,
        open: false
      })
    state.nextTimerId++;
    console.log(state.timers);
    }
  }
})
export default store