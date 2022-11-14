<template>
  <div>
    <transition name="anim">
      <CommunityComp v-show="isShow"></CommunityComp>
    </transition>
  </div>
</template>

<script>
import CommunityComp from '@/components/community_comp/CommunityComp.vue'

export default {
  beforeRouteLeave (to, from, next) {
    setTimeout(() => {
      this.isShow = false;
      console.log('community:beforeRouteLeave');
      next();
    }, );
  },
  components: {
    CommunityComp,
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
    transform: translateX(100%);
  }
  100% {
    transform: translateX(0);
  }
}
</style>
