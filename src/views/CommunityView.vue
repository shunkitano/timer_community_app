<template>
  <div>
    <CommunityComp></CommunityComp>
  </div>
</template>

<script>
import CommunityComp from '@/components/community_comp/CommunityComp.vue'
export default {
  beforeRouteEnter (to, from, next) {
    console.log('community:beforeRouteEnter');
    next();
  },
  beforeRouteUpdate (to, from, next) {
    console.log('community:beforeRouteUpdate');
    next();
  },
  beforeRouteLeave (to, from, next) {
    setTimeout(() => {
      console.log('community:beforeRouteLeave');
      next();
    }, 2000);
  },
  components: {
    CommunityComp,
  }
}
</script>
