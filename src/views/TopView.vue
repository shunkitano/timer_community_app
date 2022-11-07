<template>
  <div class="top">
    <transition name="top" mode="out-in">
      <MainComp v-show="isShow"></MainComp>
    </transition>
  </div>
</template>

<script>
import MainComp from '@/components/MainComp.vue';

export default {
  beforeRouteEnter (to, from, next) {
    console.log('top:beforeRouteEnter');
    next();
  },
  beforeRouteLeave (to, from, next) {
    this.isShow = false;
    setTimeout(() => {
      console.log('top:beforeRouteLeave');
      next();
    }, 1500);
  },
  components: {
    MainComp
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
.top nav {
  display: flex;
  justify-content: space-evenly;
}
.top-enter-active {
  animation: comeIn 1s;
}
.top-leave-active {
  animation: comeIn 1s reverse;
}
@keyframes comeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>
