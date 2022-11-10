<template>
  <div class="outer">
    <transition :name='anim' @close='anim = $event'>
      <TimerSettingComp  v-if="isMakeTimer" class="setting" @my-click='closeSetting'></TimerSettingComp>
      <div class="timer" v-else>
        <TimerHeader @makeTimer="makeTimer"></TimerHeader>
        <TimerClasic v-if="style === 1"></TimerClasic>
        <TimerDigital v-if="style === 2"></TimerDigital>
        <TimerCircle v-if="style === 3"></TimerCircle>
        <TimerController class="controller"></TimerController>
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
      isClasic: true,
      isDigital: false,
      isCircle: false,
      isMakeTimer: false,
      anim: '',
    }
  },
  mounted() {
    
  },
  computed: {
    style() {
      return  this.$store.state.currentStyleId; 
    },
    color() {
      return this.$store.state.currentColorId;
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
  background-color: rgba(240, 240, 240, 1);
  z-index: 100;
} 
.set-enter-active {
  animation: up 1.5s;
}
.set-leave-active {
  animation: down 1.5s;
}
.main-enter-active {
  animation: down 1.5s reverse; 
}
.main-leave-active {
  animation: up 1.5s reverse;
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
  background-color: rgba(0, 0, 0, 0.1);
}
.controller {
  position: fixed;
  bottom: 0;
  right: 0;
}
</style>