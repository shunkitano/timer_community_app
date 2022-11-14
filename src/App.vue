<template>
  <div id="app">
    <router-view/>
  </div>
</template>
<script>

export default {
  beforeRouteEnter (to, from, next) {
    setTimeout(() => {
      console.log('top:beforeRouteEnter');
      next();
    }, 1000);
  },
  beforeRouteLeave (to, from, next) {
    setTimeout(() => {
      console.log('top:beforeRouteLeave');
      next();
    }, 1000);
  },
}
</script>

<style>

</style>
