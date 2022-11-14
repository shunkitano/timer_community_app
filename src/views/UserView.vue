<template>
  <div>
    <transition name="anim">
      <UserRoomComp v-show="isShow"></UserRoomComp>
    </transition>
    
  </div>
</template>

<script>
import UserRoomComp from '@/components/user_comp/UserRoomComp.vue';
export default {
  beforeRouteLeave (to, from, next) {
    setTimeout(() => {
      this.isShow = false;
      console.log('user:beforeRouteLeave');
      next();
    }, );
  },
  components: {
    UserRoomComp,
  },
  data() {
    return {
      isShow: false
    }
  },
  mounted() {
    this.isShow = true;
  }
  
}
</script>

<style scoped>
.anim-enter-active {
  animation: slideIn .4s ease-in;
}
.anim-leave-active {
  animation: slideIn .4s ease-out reverse;
}
@keyframes slideIn {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(0);
  }
}
</style>
