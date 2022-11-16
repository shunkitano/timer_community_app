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
            <div v-if="timer.time >= 3600" :style="{'background-color': timer.color}" :class="timer.style" class="timer__box">
              <p>{{ (timer.time - timer.time%3600) /3600 + "t"}}</p>
              <p>{{ timer.time%3600 >= 60 ? timer.time%3600/100 +"m" : timer.time%3600 + "s"}}</p>
            </div>
            <div v-else-if="timer.time >= 60" :style="{'background-color': timer.color}" :class="timer.style" class="timer__box">
              <p>{{ (timer.time - timer.time%60) /60 + "m"}}</p>
              <p>{{timer.time%60 + "s"}}</p>
            </div>
            <div v-else :style="{'background-color': timer.color}" :class="timer.style" class="timer__box">
              <p>{{ timer.time + "s"}}</p>
            </div>
            <p class="timer__name">{{ timer.name }}</p>
          </div>
          <div class="edit" v-if="isEdit && isId === timer.id">
            <WitchButton></WitchButton>
            <CutButton></CutButton>
          </div><!--edit-->
          <OpenCloseButton class="open__close" @open-close="openClose" :childId="timer.id" :class="{active:isActive === timer.id}"></OpenCloseButton>
        </li>
      </ul><!--timers-->
    </div>
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
      this.$store.commit('selectTimer',{id});
      this.$router.push('/top');
    },
    timersCheck() {
      // console.log(this.timers);
    },
    btnSlide() {
      if(!this.isSlide) {
        console.log("slide!");
        this.isSlide = true;
      }
    },
    openClose(isOpen, id) {
      this.isEdit = isOpen;
      console.log(isOpen);
      console.log(id);
      this.isId = id;
      this.isId2 = id;
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
  /* width: 100%; */
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-top: 100px;
}
#timers li {
  width: 80%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  text-align: center;
  list-style: none;
  margin: 1rem auto 0;
  overflow: hidden;
}
#timers li div {
  display: flex;
  align-items: center;
  justify-content: flex-start;
}
.timer__box {
  display: flex;
  flex-direction: column;
  width: 80px;
  height: 80px;
}
.timer__box p {
  line-height: 40px;
  font-size: 20px;
  font-weight: bold;
  margin-top: 5px;
  color: rgba(0, 0, 0, 1);
  -webkit-text-stroke: 0.5px rgba(250, 250, 250, 1);
}
.timer__box p:last-child {
  margin-left: 20px;
  line-height: 10px;
  font-size: 14px;
}
.timer__name {
  padding-left: 1rem;
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
  display: flex;
  justify-content: space-between;
  width: 85%;
  height: 90%;
  background-color: rgba(0, 0, 0, 0.3);
  border-radius: 30px;
  backdrop-filter: blur(1px);
  padding: 0.5rem;
}
.open__close {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  margin: auto;
}
</style>