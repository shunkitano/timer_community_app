<template>
  <div class="outer">
    <transition :name='anim' @close='anim = $event'>
      <TimerSettingComp  v-if="isMakeTimer" class="setting" @my-click='closeSetting'></TimerSettingComp>
      <div class="timer" v-else>
        <TimerHeader @makeTimer="makeTimer"></TimerHeader>
        <TimerDigital v-if="style === 'Digital'" :isTms="isTms"></TimerDigital>
        <TimerClasic v-if="style === 'Clasic'"></TimerClasic>
        <TimerCircle v-if="style === 'Circle'"></TimerCircle>
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
      isTms: '2'
    }
  },
  computed: {
    id() {
      return this.$store.state.currentTimerId;
    },
    style() {
      return this.$store.state.timers[this.id].style; 
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
  height: 100%;
  /* background-color: rgb(217, 217, 217); */
  z-index: 100;
} 
.set-enter-active {
  animation: up 1s;
}
.set-leave-active {
  animation: down 1s;
}
.main-enter-active {
  animation: down 1s reverse; 
}
.main-leave-active {
  animation: up 1s reverse;
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
.controller {
  position: fixed;
  bottom: 0;
  right: 0;
}
</style>