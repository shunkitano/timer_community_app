<template>
  <div class="main">
    <TimerComp></TimerComp>
    <!-- <TimerComp2 v-show="isTimer2"></TimerComp2> -->
    <div v-show="!isClose" class="box">
      <transition name="slide" mode="out-in">
        <LoginComp v-if="isSignUp"  @my-click='isSignUp = $event' @my-click2='isClose = $event'></LoginComp>
        <SignUpComp v-else @my-click='isSignUp = $event'  @my-click2='isClose = $event'></SignUpComp>
      </transition>
    </div>
  </div>
</template>

<script>
import TimerComp from '@/components/timer_comp/TimerComp.vue';
// import TimerComp2 from '@/components/timer_comp/TimerComp2.vue';
import LoginComp from '@/components/LoginComp.vue';
import SignUpComp from '@/components/SignUpComp.vue';

export default {
  components: {
    TimerComp,
    // TimerComp2,
    LoginComp,
    SignUpComp
  },
  data() {
    return {
      isSignUp: false,
      isClose: false
    }
  }
}
</script>

<style scoped>
.main {
  position: relative;
}

.box {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
.slide-enter-active {
  animation: slideIn 0.5s;
}
.slide-leave-active {
  animation: slideIn 0.5s reverse;
}

@keyframes slideIn {
  0% {
    opacity: 0;
    transform: rotateY(90deg);
    scale: 0.7;
  }
  100% {
    opacity: 1;
    transform: rotateY(0deg);
  }
}
</style>
