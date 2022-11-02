<template>
  <div class="btn">
    <button @touchstart="settingPage"></button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isTrue: true
    }
  },
  methods: {
    settingPage() {
      this.$emit("settingBtn", this.isTrue);
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
  height: 5px;
  border: none;
  margin: auto;
  background-color: rgba(0, 0, 0, 1);
  transition: 1.5s;
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
  height: 5px;
  border: none;
  background-color: rgba(0, 0, 0, 1);
  transition: 1s;
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
  height: 5px;
  border: none;
  background-color: rgba(0, 0, 0, 1);
  transition: 1s;
  border-radius: 2px;
}
button:hover {
  width: 50px;
  height:50px;
  border-radius: 50%;
  border: solid 2px rgba(0, 0, 0, 1);
  background-color: rgba(0, 0, 0, 0);
}
button:hover::before {
  content: '';
  width: 30px;
  transform: rotate(45deg)translate(10px, -5px);
}
button:hover::after {
  content: '';
  width: 30px;
  transform: rotate(-45deg)translate(10px, -22px);
}
</style>