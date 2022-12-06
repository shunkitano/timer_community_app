<template>
  <div class="outer">
    <transition :name='anim' @close='anim = $event'>
      <TimerSettingComp  v-if="isMakeTimer" class="setting" @my-click='closeSetting'></TimerSettingComp>
      <div class="timer" v-else>
        <TimerHeader @makeTimer="makeTimer" class="header"></TimerHeader>
        <DigitalTimer v-if="style === 'digital'" :isTms="isTms" class="timer__comp" :isUse="isUse"></DigitalTimer>
        <ChronographTimer v-if="style === 'chronograph'" :isTms="isTms" class="timer__comp" :isUse="isUse"></ChronographTimer>
        <CircleTimer v-if="style === 'circle'" :isTms="isTms" class="timer__comp" :isUse="isUse"></CircleTimer>
        <TimerController class="controller" @select-tms="selectTms"></TimerController>
      </div><!--timer-->
    </transition>
  </div>
</template>

<script>
import TimerSettingComp from '@/components/timer_comp/TimerSettingComp.vue';
import TimerHeader from '@/components/timer_comp/TimerHeader.vue';
import ChronographTimer from '@/components/timer_comp/ChronographTimer.vue';
import DigitalTimer from '@/components/timer_comp/DigitalTimer.vue';
import CircleTimer from '@/components/timer_comp/CircleTimer.vue';
import TimerController from '@/components/timer_comp/TimerController.vue';

export default {
  components: {
    TimerSettingComp,
    TimerHeader,
    ChronographTimer,
    DigitalTimer,
    CircleTimer,
    TimerController
  },
  data() {
    return {
      isMakeTimer: false, //タイマー作成ページに飛ぶ
      isNoTimer:'',
      anim: '',
      isTms: '2', //初期はm（分）に配置
      reset: false,
      id: null,
      style: '',
      count: 2,
      isUse: true //各タイマーにfetchTimersとcommunityTimersの判別をさせる
    }
  },
  beforeCreate() {
    this.isMakeTimer = this.$store.state.empty;
    console.log(this.isMakeTimer);
  },
  async created() {
    await this.$store.dispatch('fetchUserId');
    await this.$store.dispatch('fetchDatas');
    if(!this.isMakeTimer) {
      this.id = this.$store.state.currentTimerId;
      this.isNoTimer = this.$store.state.fetchTimers[this.id];
      console.log(this.isNoTimer);
      if(this.isNoTimer === undefined) {
        console.log("isNoTimer");
        this.isMakeTimer = true;
      } else {
        this.style = this.$store.state.fetchTimers[this.id].style;
      }
    }
  },
  methods: {
    makeTimer(anim, isMakeTimer) {
      this.anim = anim;
      this.isMakeTimer = isMakeTimer;
    },
    closeSetting(isFalse) {
      this.anim = "main";
      this.isMakeTimer = isFalse;   
    },
    // コントローラーからtmsを受け取る //
    selectTms(tms) {
      this.isTms = tms;
    }
  }
}
</script>

<style scoped>
.outer {
  position: relative;
}
.setting {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100lvh;
  overflow: hidden;
  z-index: 100;
} 
.set-enter-active {
  animation: up 0.7s;
}
.set-leave-active {
  animation: down 0.7s;
}
.main-enter-active {
  animation: down 0.7s reverse; 
}
.main-leave-active {
  animation: up 0.7s reverse;
}
@keyframes up {
  0% {
    opacity: 0.5;
    transform: translateY(-100vh);
  }
  100% {
    opacity: 1;
    transform: translateY(0px);
  }
}
@keyframes down {
  0% {
    opacity: 1;
    transform: translateY(0px);
  }
  100% {
    opacity: 0.5;
    transform: translateY(100vh);
  }
}
.timer {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.header {
  z-index: 1;
}
.timer__comp {
  z-index: 0;
}
.controller {
  position: fixed;
  bottom: 0;
  right: 0;
  z-index: 0;
}
</style>