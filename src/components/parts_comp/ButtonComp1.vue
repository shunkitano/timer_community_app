<template>
  <div class="btn">
    <button @touchend="settingPage"></button>
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
  width: 100px;
  height: 50px;
  text-align: center;
  text-align: center;
}
button {
  /* position: absolute; */
  margin: auto;
  width: 50px;
  height: 50px;
  border: solid 1px rgba(240, 240, 240, 1);
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 40px;
}
button::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 75px;
  height: 50px;
  border: solid 1px rgba(0, 0, 0, 1);
  background-color: rgba(240, 240, 240, 1);
  border-radius: 40px;
  z-index: -1;
  box-shadow: 0px 2px 4px, rgba(240, 240, 240, 0.8) 0px -2px 4px;
}
button::after {
  content: '';
  position: absolute;
  top: 0;
  right: 0;
  width: 100px;
  height: 50px;
  border: solid 1px rgba(240, 240, 240, 1);
  background-color: rgba(0, 0, 0, 1);
  border-radius: 40px;
  z-index: -2;
  box-shadow: 0px 2px 4px, rgba(240, 240, 240, 0.8) 0px -2px 4px;
}
button:active {
  width: 30px;
  height: 60px;
  transition: 0.3s ease;
}
button:active::after {
  width: 30px;
  height: 60px;
  transition: 0.8s ease;
}
button:active::before {
  width: 30px;
  height: 60px;
  transition: 0.5s ease;
}
@keyframes jump {
  0% {
    transform: translateY(30px);
  }
  25% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(20px);
  }
  75% {
    transform: translateY(0px);
  }
  90% {
    transform: translateY(10px);
  }
  100% {
    transform: translateY(0px);
  }
}
</style>