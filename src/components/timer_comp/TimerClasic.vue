<template>
  <div class="circle">
    <div class="needle"></div> 
    <div class="circle__top"></div>      
  </div><!--circle-->
</template>

<script>
export default {
  data() {
    return {
      selectColor:''
    }
  },
  // mounted() {
  //   this.selectColor = this.color;
  //   console.log(this.selectColor);
  // },
  // computed: {
  //   colorId() {
  //     return this.$store.state.currentColor;
  //   },
  //   color() {
  //     return this.$store.state.colors[this.colorId].color;
  //   }
  // },
  methods: {
  }
}
</script>

<style scoped>
.circle {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  width: 250px;
  height: 250px;
  border-radius: 50%;
  background-color: rgba(0, 0, 0, 0.3);
  transform: rotateZ(45deg);
  z-index: 1;
}
.needle {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  margin: auto;
  width: 3px;
  height: 125px;
  background: rgb(250, 50, 50);
}
.circle__top {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: rgba(250, 50, 50, 0.9);
}
</style>

