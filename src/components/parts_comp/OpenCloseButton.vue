<template>
  <div class="open__close">
    <button :class="opCl" @touchstart='openClose'>
      <p></p>
    </button>
  </div>
</template>

<script>
export default {
  props: ['childIndex', 'childEdit'],
  data() {
    return {
      opCl:'close',
      isOpen: false
    }
  },
  computed: {
    
  },
  watch: {
    childEdit() {
      if(!this.childEdit) { //タイマーが削除されたときに強制的に"close"クラスをふる
        this.opCl = "close"
      }
    }
  },
  methods: {
    openClose() {
      if(this.opCl === "close" && !this.childEdit) {
        this.opCl = 'open';
        this.isOpen = true;
        this.$emit("open-close", this.isOpen, this.childIndex);
      } else if(this.opCl === "open" && this.childEdit) {
        this.opCl = 'close';
        this.isOpen = false;
        this.$emit("open-close", this.isOpen, this.childIndex);
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
.open__close p {
  position: relative;
  background-color: rgba(0,0,0,0);
  width: 40px;
  height: 40px;
  border-radius: 2px;
}
.close p::before {
  content: '';
  position: absolute;
  bottom: 10px;
  left: -4px;
  background-color: rgb(230, 230, 230);
  width: 30px;
  height: 5px;
  border-radius: 2px;
  transform: rotateZ(45deg);
  animation: push3 0.5s;
}
.close p::after {
  content: '';
  position: absolute;
  bottom: 10px;
  left: 14px;
  background-color: rgb(230, 230, 230);
  width: 30px;
  height: 5px;
  border-radius: 2px;
  transform: rotateZ(-45deg);
  animation: push4 0.5s;
}
.open p::before {
  content: '';
  position: absolute;
  bottom: 10px;
  left: -4px;
  background-color: rgb(230, 230, 230);
  width: 30px;
  height: 5px;
  border-radius: 2px;
  transform: rotateZ(-45deg);
  animation: push1 0.5s;
}
.open p::after {
  content: '';
  position: absolute;
  bottom: 10px;
  left: 14px;
  background-color: rgb(230, 230, 230);
  width: 30px;
  height: 5px;
  border-radius: 2px;
  transform: rotateZ(45deg);
  animation: push2 0.5s;
}
@keyframes push1 {
  0% {
    transform: rotateZ(45deg)translate(6px, 8px);
  }
  100% {
    transform: rotateZ(45deg)translate(0px);
    opacity: 0;
  }
}
@keyframes push2 {
  0% {
    transform: rotateZ(-45deg)translate(-6px, 8px);
  }
  100% {
    transform: rotateZ(-45deg)translate(0px);
    opacity: 0;
  }
}
@keyframes push3 {
  0% {
    transform: rotateZ(-45deg)translate(6px, -8px);
  }
  100% {
    transform: rotateZ(-45deg)translate(0px);
    opacity: 0;
  }
}
@keyframes push4 {
  0% {
    transform: rotateZ(45deg)translate(-6px, -8px);
  }
  100% {
    transform: rotateZ(45deg)translate(0px);
    opacity: 0;
  }
}
</style>