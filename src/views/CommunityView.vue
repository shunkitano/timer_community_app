<template>
  <div>
    <CommunityComp></CommunityComp>
  </div>
</template>

<script>
import CommunityComp from '@/components/community_comp/CommunityComp.vue'

export default {
  beforeRouteLeave (to, from, next) {
    setTimeout(() => {
      console.log('community:beforeRouteLeave');
      next();
    }, 1000);
  },
  components: {
    CommunityComp,
  },
  data() {
    return {
      
    }
  },
  
}
</script>

<style scoped>
/* .right-enter-active {
  animation: rightIn 1s;
}
.right-leave-active {
  animation: rightIn 1s reverse;
}
@keyframes rightIn {
  0% {
    opacity: 0;
    transform: translateX(380px);
  }
  100% {
    opacity: 1;
    transform: translateX(0px);
  }
} */
</style>
