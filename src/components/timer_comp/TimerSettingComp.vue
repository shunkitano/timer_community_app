<template>
  <div>
    <h2>TimerSetting</h2>
    <button @touchstart="mainPage"></button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isfalse: false
    }
  },
  methods: {
    mainPage() {
      this.$emit("my-click", this.isfalse);
    }
  }
}
</script>

<style>
button {
  width: 50px;
  height: 50px;
}
</style>


