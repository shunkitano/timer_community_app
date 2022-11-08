import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    timers: [], //ここに作成したタイマーが入る
    nextTimerId: 1,
    colors: [
      {id: 1, name: 'skeleton',color: 'rgba(200, 200, 200, 0.3)'},
      {id: 2, name: 'green',color: '#0F0'},
      {id: 3, name: 'blue',color: '#00F'},
      {id: 4, name: 'red',color: '#F00'},
      {id: 5, name: 'dark',color: '#000'}
    ],
    sounds: [
      {id: 1, name: 'single'},
      {id: 2, name: 'poly'},
      {id: 3, name: 'delay'}
    ],
    styles: [
      {id: 1, name: 'Clasic'},
      {id: 2, name: 'Digital'},
      {id: 3, name: 'Circle'}
    ],
    currentColorId: 1,
    currentSoundId: 1,
    currentStyleId: 3


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