<template>
  <div>
    <transition :name="slide">
      <UserRoomComp v-show="isShow"></UserRoomComp>
    </transition>
  </div>
</template>

<script>
import UserRoomComp from '@/components/user_comp/UserRoomComp.vue';
export default {
  // beforeRouteEnter (to, from, next) {
  //   console.log('top:beforeRouteEnter');
  //   next(vm =>{
  //     console.log(vm);
  //   });
  // },
  beforeRouteLeave (to, from, next) {
    // if(to.name === 'community') {
    //   this.slide = "right";
    //   console.log("right");
    // }
    this.isShow = false;
    setTimeout(() => {
      console.log('user:beforeRouteLeave');
      next();
    }, 1000);
  },
  components: {
    UserRoomComp,
  },
  data() {
    return {
      isShow: false,
      slide:'left'
    }
  },
  mounted() {
    this.isShow = true;
  }
}
</script>

<style scoped>
.left-enter-active {
  animation: leftIn 1s;
}
.left-leave-active {
  animation: leftIn 1s reverse;
}
@keyframes leftIn {
  0% {
    opacity: 0;
    transform: translateX(-380px);
  }
  100% {
    opacity: 1;
    transform: translateX(0px);
  }
}
/* .right-enter-active {
  animation: rightIn 1s;
}
.right-leave-active {
  animation: rightIn 1s reverse;
} */
@keyframes rightIn {
  0% {
    opacity: 0;
    transform: translateX(380px);
  }
  100% {
    opacity: 1;
    transform: translateX(0px);
  }
}
</style>
