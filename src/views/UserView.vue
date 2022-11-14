<template>
  <div>
    <UserRoomComp></UserRoomComp>
  </div>
</template>

<script>
import UserRoomComp from '@/components/user_comp/UserRoomComp.vue';
export default {
  beforeRouteLeave (to, from, next) {
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

    }
  },
  
}
</script>

<style scoped>

</style>
