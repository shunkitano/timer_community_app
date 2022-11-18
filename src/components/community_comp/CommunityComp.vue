<template>
  <div class="community">
    <UserButton class="userBtn"></UserButton>
    <div class="header">
      <h2 class="nico">Community</h2>
    </div>
    <ul id="timers">
      <li v-for="timer in timers" :key="timer.id">
        <div class="nico" @touchstart="selectTimer(timer.id)">
            <div :style="{'background-color': timer.color}" :class="timer.style" class="timer__box">
              <p>{{ ((timer.time - timer.time%3600) / 3600) >= 10 ? (timer.time - timer.time%3600) / 3600 : "0" + ((timer.time - timer.time%3600) / 3600) }}</p>
              <p>:</p>
              <p>{{ ((timer.time%3600 - timer.time%60 ) / 60) >= 10 ? (timer.time%3600 - timer.time%60 ) / 60 : "0" + ((timer.time%3600 - timer.time%60 ) / 60) }}</p>
              <p>:</p>
              <p>{{ timer.time%60 >= 10 ? timer.time%60 : "0" + timer.time%60}}</p>
            </div>
            <p class="timer__name">{{ timer.name }}</p>
          </div>
      </li>
    </ul>
  </div>
</template>

<script>
import UserButton from '@/components/parts_comp/UserButton.vue'

export default {
  components: {
    UserButton
  },
  data() {
    return {
      userName: 'Who',
      timers: [],
      communityTimers: []
    }
  },
  mounted() {
    this.timers = this.$store.state.timers;
    this.timers.forEach((e) => {
      console.log(e.open);
    })
    return this.timers = this.$store.state.timers;
  },
  methods: {
    selectTimer() {

    }
  }
}
</script>

<style scoped>
.community {
  position: relative;
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
/* header */
.header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.header h2 {
  line-height: 60px;
  font-size: 1rem;
  height: 60px;
  text-align: center;
  width: 160px;
  color: rgba(250, 250, 250, 1);
  background-color: rgba(0, 0, 0, 1);
  border: solid 1px rgba(250, 250, 250, 1);
  border-radius: 40px;
}
.community .userBtn {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 100;
}
/* CommunityRoom */
#timers {
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  margin-top: 5rem;
}
#timers li {
  width:80%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  text-align: center;
  list-style: none;
  margin: 1rem auto 0;
  overflow: hidden;
  background-color: rgba(20, 20, 20, 0.1);
  border-radius: 10px;
}
#timers li div {
  display: flex;
  align-items: center;
}
.timer__box {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  width: 80px;
  height: 80px;
  border: solid 0.5px rgba(20, 20, 20, 0.8);
}
.timer__box p {
  font-size: 14px;
  font-weight: bold;
  color: rgba(0, 0, 0, 1);
  -webkit-text-stroke: 0.5px rgba(250, 250, 250, 1);
}
.timer__name {
  padding: 1rem;
  margin-left: 1rem;
  background-color: rgba(250, 250, 250, 0.8);
  border-radius: 20px;
}
.digital {
  border-radius: 10px;
}
.clasic {
  border-radius: 30px;
}
.circle {
  position: relative;
  border-radius: 50%;
  z-index: 1;
}
.circle::before {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  content: '';
  width: 60px;
  height: 60px;
  border-radius: 50%;
  backdrop-filter: brightness(70%);
  z-index: -1;
}
</style>
