import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    timers: [],
    //timers: [
      // {
      //   id: 1,
      //   name: "タイマー１",
      //   time: '',
      //   color: '',
      //   sound: '',
      //   style: ''
      // },
      // {
      //   id: 2,
      //   name: "タイマー２",
      //   time: '',
      //   color: '',
      //   sound: '',
      //   style: ''
      // },
      // {
      //   id: 3,
      //   name: "タイマー３",
      //   time: '',
      //   color: '',
      //   sound: '',
      //   style: ''
      // },
      // {
      //   id: 4,
      //   name: "タイマー４",
      //   time: '',
      //   color: '',
      //   sound: '',
      //   style: ''
      // }
    //],
    nextTimerId: 1,
    times: [
      {
        name: 'time1',
        time: ''
      },
      {
        name: 'time2',
        time: ''
      },
      {
        name: 'time3',
        time: ''
      }
    ],
    colors: [
      {
        name: 'skeleton',
        color: 'rgba(0, 0, 0, 0.3)'
      },
      {
        name: 'red',
        color: '#F00'
      },
      {
        name: 'dark',
        color: '#000'
      },
      {
        name: 'grey',
        color: '#999'
      }
    ],
    sounds: [
      {
        name: 'sigle',
        sound: '1'
      },
      {
        name: 'poly',
        sound: '2'
      },
      {
        name: 'delay',
        sound: '3'
      }
    ],
    currentSound:'1',
    styles: [
      {
        name: 'styleA',
        style: '#FFF'
      },
      {
        name: 'styleB',
        style: '#F00'
      },
      {
        name: 'styleC',
        style: '#000'
      }
    ]
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