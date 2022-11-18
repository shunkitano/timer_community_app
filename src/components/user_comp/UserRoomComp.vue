<template>
  <div class="user__room">
    <input type="button" class="logout nico" value="Logout" @touchstart="timersCheck">
    <CommunityButton class="comBtn"></CommunityButton>
    <div class="header">
      <h2 class="nico">{{ userName }}</h2>
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
        <transition name="fade">
          <div class="edit" v-if="isEdit && isId === timer.id">
            <WitchButton text1="private" text2='community'></WitchButton>
            <CutButton></CutButton>
          </div><!--edit-->
        </transition>
        <OpenCloseButton class="open__close" @open-close="openClose" :childEdit="isEdit" :childId="timer.id" :class="{active:isActive === timer.id}"></OpenCloseButton>
      </li>
    </ul><!--timers-->
  </div>
</template>

<script>
import CommunityButton from '@/components/parts_comp/CommunityButton.vue';
import WitchButton from '@/components/parts_comp/WitchButton.vue';
import CutButton from '@/components/parts_comp/CutButton.vue';
import OpenCloseButton from '@/components/parts_comp/OpenCloseButton.vue';

export default {
  
  components: {
    CommunityButton,
    WitchButton,
    CutButton,
    OpenCloseButton
  },
  data() {
    return {
      timers: [],
      userName: 'User',
      isSetting: false,
      isTrue: true,
      isEdit: false,
      isActive: ''
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
      // console.log(id);
      if(!this.isEdit) {
        this.$store.commit('selectTimer',{id});
      this.$router.push('/top');
      } 
    },
    timersCheck() {
      // console.log(this.timers);
    },
    openClose(isOpen, id) {
      this.isEdit = isOpen;
      this.isId = id;
      if(isOpen === false) {
        this.isSlide = false;
      }
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
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
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
.edit {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  margin: auto;
  margin-left: 0.25rem;
  display: flex;
  justify-content: space-between;
  width: 80%;
  height: 90%;
  background-color: rgba(250, 250, 250, 0.5);
  border-radius: 30px;
  backdrop-filter: blur(1px);
  padding: 0.5rem;
}
.fade-enter-active {
  animation: comeOut 0.5s;
}
.fade-leave-active {
  animation: comeOut 0.5s reverse;
}
@keyframes comeOut {
  0% {
    opacity: 0;
    transform: translateX(-100vw);
  }
  100% {
    opacity: 1;
    transform: translateX(0);
  }
}
.open__close {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  margin: auto;
}
</style>