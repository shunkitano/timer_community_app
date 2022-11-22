<template>
  <div class="user__room">
    <div class="header">
      <input type="button" class="logout nico" value="Logout" @touchstart="timersTest">
      <h2 class="nico">{{ userName }}</h2>
      <CommunityButton class="comBtn"></CommunityButton>
    </div>
    <ul id="timers">
      <li v-for="timer in lineUpTimers" :key="timer.timerId">
        <div class="timer nico">
          <div :style="{'background-color': timer.color}" :class="timer.style" class="timer__time"  @touchstart="selectTimer(timer.timerId)">
            <p>{{ ((timer.time - timer.time%3600) / 3600) >= 10 ? (timer.time - timer.time%3600) / 3600 : "0" + ((timer.time - timer.time%3600) / 3600) }}</p>
            <p>:</p>
            <p>{{ ((timer.time%3600 - timer.time%60 ) / 60) >= 10 ? (timer.time%3600 - timer.time%60 ) / 60 : "0" + ((timer.time%3600 - timer.time%60 ) / 60) }}</p>
            <p>:</p>
            <p>{{ timer.time%60 >= 10 ? timer.time%60 : "0" + timer.time%60}}</p>
          </div>
          <p class="timer__name">{{ timer.name }}</p>
          <OpenCloseButton class="open__close" @open-close="openClose" :childEdit="isEdit" :childId="timer.timerId"></OpenCloseButton>
        </div>

        <transition name="fade">
          <div class="edit" v-if="isEdit && isId === timer.timerId">
            <WitchButton text1="private" text2='community' @is-left="putPrivate" @is-right="putCom" :childId="timer.timerId"></WitchButton>
            <CutButton></CutButton>
          </div><!--edit-->
        </transition>
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
      isEdit: false
    }
  },
  mounted() {
    this.$store.dispatch('fetchDatas');
  },
  computed: {
    lineUpTimers() {
      return this.$store.state.fetchTimers;
    }
  },
  methods: {
    // createTimerRoom() {
    //   this.timers = this.$store.state.fetchTimers;
    // },
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
    timersTest() {
      console.log(this.lineUpTimers.at(0).timerId);
    },
    openClose(isOpen, id) {
      this.isEdit = isOpen;
      this.isId = id;
      if(isOpen === false) {
        this.isSlide = false;
      }
    },
    putPrivate(childId) { //プライベイトにする
      console.log(childId);
      this.$store.commit('putPrivate', {
        id: childId,
      })
    },
    putCom(childId) { //コミュニティに公開する
      console.log(childId);
      this.$store.commit('putCom', {
        id: childId,
      })
    },
    fetchDatas() {
      this.$store.dispatch('fetchDatas');
    }
  }
}
</script>

<style scoped>
.user__room {
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: rgb(230, 230, 230);
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
  margin-left: 1rem;
  z-index: 100;
  color: rgba(250, 250, 250, 1);
  background-color: rgba(0, 0, 0, 0.5);
  border: solid 1px rgba(250, 250, 250, 1);
  border-radius: 40px;
  box-shadow: rgba(0, 0, 0, 1) 0px 2px 4px, rgba(240, 240, 240, 0.8) 0px -2px 4px;
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
  z-index: 1;
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
  box-shadow: inset rgba(20, 20, 20, 0.8) 0px 2px 4px, inset rgba(20, 20, 20, 0.8) 0px -2px 4px;
}
/* Timers */
#timers {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  padding-top: 5rem;
  padding-bottom: 2rem;
}
#timers li {
  list-style: none;
  width: 80%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  text-align: center;
  margin: 1.5rem auto 0;
}
.timer {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: rgba(20, 20, 20, 0.1);
  border-radius: 10px;
}
.timer__time {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 80px;
  height: 80px;
  margin-right: 0.5rem;
  border: solid 0.5px rgba(20, 20, 20, 0.8);
}
.timer__time p {
  font-size: 14px;
  font-weight: bold;
  color: rgba(0, 0, 0, 1);
  -webkit-text-stroke: 0.5px rgba(250, 250, 250, 1);
}
.timer__name {
  padding: 1rem;
  background-color: rgba(250, 250, 250, 0.8);
  border-radius: 20px;
  width: 100%;
  overflow: scroll;
}
.open__close {
  margin-left: 0.5rem;
  margin-right: 0.5rem;
  padding-top: 20px;
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
  display: flex;
  align-items: center;
  width: 100%;
  padding: 0.5rem;
}
.fade-enter-active {
  animation: comeOut 0.5s ease;
}
.fade-leave-active {
  animation: comeOut 0.5s ease reverse;
}
@keyframes comeOut {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>