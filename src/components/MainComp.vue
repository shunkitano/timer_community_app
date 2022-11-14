<template>
  <div class="main">
    <transition name="timer" mode="out-in">
    <TimerComp v-if="isTimer"></TimerComp>
    <UserView v-if="isUser"></UserView>
    <CommunityComp v-if="isCom"></CommunityComp>
    </transition>
  </div>
</template>

<script>
import TimerComp from '@/components/timer_comp/TimerComp.vue';
import UserView from '@/views/UserView.vue';
import CommunityComp from '@/views/CommunityView.vue';

export default {
  components: {
    TimerComp,
    UserView,
    CommunityComp
  },
  data() {
    return {
      top: 'timer',
      isTimer: false,
      isUser: false,
      isCom: false,
    }
  },
  mounted() {
    this.isTimer = true;
  },
  methods: {
    jumpCom(isCom) {
      console.log(isCom);
      this.isTimer = !this.isTimer;
      this.isCom = isCom;
    }
  } 
}
</script>

<style scoped>
.main {
  position: relative;
}
.timer-enter-active {
  animation: fade 2s;
}
.timer-leave-active {
  animation: fade 2s reverse;
}
@keyframes fade {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>
