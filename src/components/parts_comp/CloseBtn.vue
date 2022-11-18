<template>
  <div>
    <button class="close" @touchstart='closeBtn'>
      <p></p>
    </button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isClose: true
    }
  },
  methods: {
    closeBtn() {
      if(this.isClose) {
        this.isClose = !this.isClose;
        this.$emit("close-btn", this.isClose);
      } 
    }
  }
}
</script>

<style scoped>
.close {
  width: 40px;
  height: 40px;
  border: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: rgba(0,0,0,0);
}
p {
  position: relative;
  background-color: rgba(0,0,0,0);
  width: 40px;
  height: 40px;
  border-radius: 2px;
}
.close p::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  background-color: rgba(240, 10, 10, 1);
  width: 40px;
  height: 4px;
  border-radius: 2px;
  animation: turn 0.5s ease;
  transform: rotateZ(45deg);
}
.close p::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  background-color: rgba(240, 10, 10, 1);
  width: 40px;
  height: 4px;
  border-radius: 2px;
  animation: reverseTurn 0.5s ease;
  transform: rotateZ(-45deg);
}
</style>