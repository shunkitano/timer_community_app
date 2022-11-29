<template>
  <div class="outer">
    <transition :name='anim' @close='anim = $event'>
      <TimerSettingComp  v-if="isMakeTimer" class="setting" @my-click='closeSetting'></TimerSettingComp>
      <div class="timer" v-else>
        <TimerHeader @makeTimer="makeTimer" class="header"></TimerHeader>
        <TimerDigital v-if="style === 'digital'" :isTms="isTms" class="timer__comp" :isUse="isUse"></TimerDigital>
        <TimerClasic v-if="style === 'clasic'" :isTms="isTms" class="timer__comp" :isUse="isUse"></TimerClasic>
        <TimerCircle v-if="style === 'circle'" :isTms="isTms" class="timer__comp" :isUse="isUse"></TimerCircle>
        <TimerController class="controller" @select-tms="selectTms"></TimerController>
      </div><!--timer-->
    </transition>
  </div>
</template>

<script>
import TimerSettingComp from '@/components/timer_comp/TimerSettingComp.vue';
import TimerHeader from '@/components/timer_comp/TimerHeader.vue';
import TimerClasic from '@/components/timer_comp/TimerClasic.vue';
import TimerDigital from '@/components/timer_comp/TimerDigital.vue';
import TimerCircle from '@/components/timer_comp/TimerCircle.vue';
import TimerController from '@/components/timer_comp/TimerController.vue';
import * as Tone from 'tone';

export default {
  components: {
    TimerSettingComp,
    TimerHeader,
    TimerClasic,
    TimerDigital,
    TimerCircle,
    TimerController
  },
  data() {
    return {
      isMakeTimer: false, //タイマー作成ページに飛ぶ
      anim: '',
      isTms: '2',
      reset: false,
      id: null,
      style: '',
      count: 2,
      isUse: true //各タイマーにfetchTimersとcommunityTimersの判別をさせる
    }
  },
  beforeCreate() {
    this.isMakeTimer = this.$store.state.empty;
    console.log(this.isMakeTimer)
  },
  mounted() {
    if(!this.isMakeTimer) {
      this.id = this.$store.state.currentTimerId;
      this.style = this.$store.state.fetchTimers[this.id].style;
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
    },
    playSound() {
      if(this.sound === "single") {
        const synth = new Tone.Synth().toDestination();
        synth.triggerAttackRelease("A4", "8n");
      }
      if(this.sound === "poly") {
        const synth2 = new Tone.PolySynth().toDestination();
        synth2.set({ detune: -800 });
        synth2.triggerAttackRelease(["C5", "E5","G5"], 0.5);
      }
      if(this.sound === 'delay') {
        const pingPong = new Tone.PingPongDelay("4n", 0.6).toDestination();
        const synth3 = new Tone.PolySynth().connect(pingPong);
        synth3.set({ detune: -800 });
        synth3.triggerAttackRelease(["C5", "E5","G5"], "40n");
      }
    },
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
  height: 100vh;
  overflow: hidden;
  /* background-color: rgb(217, 217, 217); */
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