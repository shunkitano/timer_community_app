<template>
  <div class="top">
    <MainComp></MainComp>
  </div>
</template>

<script>
import MainComp from '@/components/MainComp.vue';

export default {
  beforeRouteLeave (to, from, next) {
    setTimeout(() => {
      this.$store.state.getTime = 0;
      console.log(this.$store.state.getTime)
      console.log('user:beforeRouteLeave');
      next();
    }, 500);
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
