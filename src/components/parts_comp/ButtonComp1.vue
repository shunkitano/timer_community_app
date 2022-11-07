<template>
  <div class="btn">
    <button @touchstart="settingPage"></button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isTouch: false
    }
  },
  methods: {
    settingPage() {
      this.$emit("settingBtn");
      this.isTouch = !this.isTouch;
    }
  }
}

</script>

<style scoped>
.btn {
  position: relative;
  display: flex;
  justify-content: center;
  width: 50px;
  height: 50px;
  text-align: center;
  text-align: center;
}
button {
  width: 50px;
  height: 7px;
  border: none;
  margin: auto;
  background-color: rgba(0, 0, 0, 1);
  border-radius: 2px;
}
button::before {
  content: '';
  position: absolute;
  top: 10px;
  left: 0;
  right: 0;
  margin: auto;
  width: 50px;
  height: 7px;
  border: none;
  background-color: rgba(0, 0, 0, 1);
  border-radius: 2px;
}
button::after {
  content: '';
  position: absolute;
  bottom: 10px;
  left: 0;
  right: 0;
  margin: auto;
  width: 50px;
  height: 7px;
  border: none;
  background-color: rgba(0, 0, 0, 1);
  border-radius: 2px;
}
</style>