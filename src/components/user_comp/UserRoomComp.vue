<template>
  <div>
    <div class="user__room">
      <input type="button" class="logout nico" value="Logout" @touchstart="timersCheck">
      <CommunityButton class="comBtn"></CommunityButton>
      <div class="header">
        <h2 class="nico">{{ userName }}</h2>
      </div>
      <ul id="timers">
        <li v-for="timer in timers" :key="timer.id">
          <div class="nico" @touchstart="selectTimer(timer.id)">
            <div v-if="timer.time >= 3600" :style="{'background-color': timer.color}" :class="timer.style">
            <p>{{ (timer.time - timer.time%3600) /3600 + "t"}}</p>
            <p>{{ timer.time%3600 >= 60 ? timer.time%3600/100 +"m" : timer.time%3600 + "s"}}</p>
          </div>
          <div v-else-if="timer.time >= 60" :style="{'background-color': timer.color}" :class="timer.style">
            <p>{{ (timer.time - timer.time%60) /60 + "m"}}</p>
            <p>{{timer.time%60 + "s"}}</p>
          </div>
          <div v-else>
            <p :style="{'background-color': timer.color}" :class="timer.style">{{ timer.time + "s"}}</p>
          </div>
          <p>{{ timer.name }}</p>
          </div>
          <WitchButton class="witch"></WitchButton>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import CommunityButton from '@/components/parts_comp/CommunityButton.vue';
import WitchButton from '@/components/parts_comp/WitchButton.vue';

export default {
  
  components: {
    CommunityButton,
    WitchButton
  },
  data() {
    return {
      timers: [],
      userName: 'User',
      isSetting: false,
      isTrue: true
    }
  },
  mounted() {
    return this.timers = this.$store.state.timers;
  },
  methods: {
    toUserSetting() {
      this.isSetting = !this.isSetting;
    },
    selectTimer(id) {
      console.log(id);
      this.$store.commit('selectTimer',{id});
      this.$router.push('/top');
    },
    timersCheck() {
      console.log(this.timers);
      console.log(this.timertTime);
    }
    
  }
}
</script>

<style scoped>
.user__room {
  position: relative;
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.user__room .comBtn {
  position: absolute;
  top: 0;
  right: 0;
  z-index: 100;
}
.user__room .logout {
  position: absolute;
  top: 0;
  left: 0;
  width: 80px;
  height: 60px;
  border: solid 1px rgba(0, 0, 0, 1);
  border-radius: 40px;
  background-color: rgb(220, 220, 220);
  margin-left: 1rem;
  z-index: 100;
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
  font-size: 1rem;
  height: 60px;
  line-height: 60px;
  text-align: center;
  width: 160px;
  background-color: rgba(240, 240, 240, 1);
  border: solid 1px rgba(0, 0, 0, 1);
  border-radius: 40px;
}
/* Timers */
#timers {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-top: 100px;
}
#timers li div {
  position: relative;
  width: 80%;
  height: 80px;
  display: flex;
  align-items: center;
  text-align: center;
  list-style: none;
  margin: 1rem auto 0;
}
li div {
  width: 80px;
  height: 80px;
}
li p {
  line-height: 40px;
  font-size: 20px;
  font-weight: bold;
  margin-top: 5px;
  color: rgba(0, 0, 0, 1);
  -webkit-text-stroke: 0.5px rgba(250, 250, 250, 1);
}
li p:last-child {
  margin-left: 20px;
  line-height: 10px;
  font-size: 14px;
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
.witch {
  position: absolute;
  top: 200px;
  left: 0;
}
</style>