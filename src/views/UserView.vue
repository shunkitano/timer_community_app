<template>
  <div>
      <UserRoomComp></UserRoomComp>
  </div>
</template>

<script>
import UserRoomComp from '@/components/user_comp/UserRoomComp.vue';
export default {
  beforeRouteEnter (to, from, next) {
    console.log('user:beforeRouteEnter');
    next();
  },
  beforeRouteUpdate (to, from, next) {
    console.log('user:beforeRouteUpdate');
    next();
  },
  beforeRouteLeave (to, from, next) {
    setTimeout(() => {
      console.log('user:beforeRouteLeave');
      next();
    }, 2000);
  },
  components: {
    UserRoomComp,
  },
}
</script>

<style scoped>
.slide-enter-active {
  animation: slideIn 2s;
}
.slide-leave-active {
  animation: slideIn 2s reverse;
}
@keyframes slideIn {
  0% {
    transform: translateX(-380px);
  }
  100% {
    transform: translateX(0px);
  }
}
</style>
