<template>
  <div>
    <ul class="timers">
      <li v-for="timer in timers" :key="timer.id" :style="{color:timer.color}" v-show="timer.isCom === true && timer.uid === 1">
        {{timer.name}}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      users: [
        {
          id: 1,
          name:"mimi"
        },
        {
          id: 2,
          name:"nic"
        },
        {
          id: 1,
          name:"ken"
        },
        {
          id: 2,
          name:"tomoto"
        }  
      ],
      timers: [
        {
          id: 1,
          uid:1,
          name: "timer1",
          color: "pink",
          isCom: true
        },
        {
          id: 2,
          uid:1,
          name: "timer2",
          color: "red",
          isCom: true
        },
        {
          id: 3,
          uid:1,
          name: "timer3",
          color: "green",
          isCom: false
        },
        {
          id: 4,
          uid:1,
          name: "timer4",
          color: "red",
          isCom: true
        },
        {
          id: 5,
          uid: 2,
          name: "timer1",
          color: "tomato",
          isCom: true
        },
        {
          id: 6,
          uid: 2,
          name: "timer2",
          color: "black",
          isCom: false
        },
        {
          id: 7,
          uid: 2,
          name: "timer3",
          color: "black",
          isCom: true
        },
        {
          id: 8,
          uid: 2,
          name: "timer4",
          color: "black",
          isCom: true
        }
      ]
    }
  }
}
</script>
