<template>
  <div class="top">
    <MainComp></MainComp>
  </div>
</template>

<script>
import MainComp from '@/components/MainComp.vue';

export default {
  beforeRouteLeave (to, from, next) {
    this.isShow = false;
    setTimeout(() => {
      console.log('top:beforeRouteLeave');
      next();
    }, 1000);
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
