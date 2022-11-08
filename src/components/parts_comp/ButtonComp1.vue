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
  width: 50px;
  height: 50px;
  text-align: center;
  text-align: center;
}
button {
  width: 50px;
  height: 8px;
  border: none;
  margin: auto;
  background-color: rgba(100, 100, 100, 0.8);
  border-radius: 5px;
  animation: jump 0.8s ease;
}
button::before {
  content: '';
  position: absolute;
  top: 10px;
  left: 0;
  right: 0;
  margin: auto;
  width: 50px;
  height: 8px;
  border: none;
  background-color: rgba(100, 100, 100, 0.8);
  border-radius: 5px;
}
button::after {
  content: '';
  position: absolute;
  bottom: 10px;
  left: 0;
  right: 0;
  margin: auto;
  width: 50px;
  height: 8px;
  border: none;
  background-color: rgba(100, 100, 100, 0.8);
  border-radius: 5px;
}
button:active {
  animation: jump 1s;
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