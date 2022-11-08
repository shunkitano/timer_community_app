import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    timers: [], //ここに作成したタイマーが入る
    nextTimerId: 1,
    colors: [
      {name: 'skeleton',color: 'rgba(200, 200, 200, 0.3)', id: 1},
      {name: 'green',color: '#0F0', id: 2},
      {name: 'blue',color: '#00F', id: 3},
      {name: 'red',color: '#F00', id: 4},
      {name: 'dark',color: '#000', id: 5}
    ],
    sounds: [
      {name: 'single', id: 1},
      {name: 'poly', id: 2},
      {name: 'delay', id: 3}
    ],
    styles: [
      {name: 'Clasic', id: 1},
      {name: 'Digital', id: 2},
      {name: 'Circle', id: 3}
    ],
    currentColor: 1,
    currentSound: 1,
    currentStyle: 1
  },
  mutations: {
    selectSound(state, {i}) {
      console.log(state.currentSound);
      state.currentSound = i;
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