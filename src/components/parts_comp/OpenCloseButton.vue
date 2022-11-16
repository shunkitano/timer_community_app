<template>
  <div class="open__close">
    <button :class="opCl" @touchstart='openClose'>
      <p></p>
    </button>
  </div>
</template>

<script>
export default {
  props: ['childId'],
  data() {
    return {
      opCl:'close',
      isOpen: false,
      isSlide: false
    }
  },
  methods: {
    openClose() {
      if(this.opCl === 'close') {
        this.opCl = 'open';
        this.isOpen = true;
        this.$emit("open-close", this.isOpen, this.childId);
      } else {
        this.opCl = 'close';
        this.isOpen = false;
        this.$emit("open-close", this.isOpen, this.childId);
      }
    }
  }
}

</script>

<style scoped>
.open__close button {
  width: 100%;
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
  top: 10px;
  left: 0;
  background-color: rgba(20, 20, 20, 0.8);
  width: 40px;
  height: 5px;
  border-radius: 2px;
}
.close p::after {
  content: '';
  position: absolute;
  bottom: 10px;
  left: 0;
  background-color: rgba(20, 20, 20, 0.8);
  width: 40px;
  height: 5px;
  border-radius: 2px;
}
.open p::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  background-color: rgba(240, 10, 10, 0.8);
  width: 40px;
  height: 5px;
  border-radius: 2px;
  animation: turn 0.5s ease;
  transform: rotateZ(45deg);
}
.open p::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  background-color: rgba(240, 10, 10, 0.8);
  width: 40px;
  height: 5px;
  border-radius: 2px;
  animation: reverseTurn 0.5s ease;
  transform: rotateZ(-45deg);
}
@keyframes turn {
  0% {
    background-color: rgba(20, 20, 20, 0.8);
    transform: rotateZ(0deg);
  }
  100% {
    transform: rotateZ(45deg);
  }
}
@keyframes reverseTurn {
  0% {
    background-color: rgba(20, 20, 20, 0.8);
    transform: rotateZ(0deg);
  }
  100% {
    transform: rotateZ(-45deg);
  }
}
</style>