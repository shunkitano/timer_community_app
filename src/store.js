import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
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
        name: 'A',
        sound: '#FFF'
      },
      {
        name: 'B',
        sound: '#F00'
      },
      {
        name: 'C',
        sound: '#000'
      }
    ],
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
  }
})