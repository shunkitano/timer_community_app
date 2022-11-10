<template>
  <div class="circle__wrapper">
    <div class="circle" @touchstart="startCircle" @touchmove="moveCircle">
    <div class="needle"></div> 
    <div class="circle__top"></div>    
  </div><!--circle-->
  </div>
  
</template>

<script>
export default {
  data() {
    return {
      selectColor:'',
      num: 0,
      x: 0,
      y: 0
    }
  },
  methods: {
    startCircle(e) {
      this.x = e.changedTouches[0].clientX;
      this.y = e.changedTouches[0].clientY;
      console.log(this.y);
      console.log(this.x);
    },
    moveCircle(e) {
      let xx = e.changedTouches[0].clientX;
      let yy = e.changedTouches[0].clientY;
      if(this.num <= 30 ) {
        if(this.y < yy) {
          this.num++;
        }
        else if(this.y > yy) {
        this.num--;
        }
      }else if(30 < this.num) {
        if(this.y < yy) {
          this.num--;
        }
        else if(this.y > yy) {
          this.num++;
        }
      }
      this.y = yy;
      this.x = xx;
    }
  }
}
</script>

<style scoped>
.circle__wrapper {
  position: relative;
  margin: auto;
  margin-top: 40%;
  width: 300px;
  height: 300px;
  border-radius: 50%;
  background-color: rgba(0, 0, 0, 0.3);
  box-shadow: inset rgba(240, 240, 240, 0.8) 0px 2px 4px, inset 0px -2px 4px;
}
.circle__wrapper::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  width: 300px;
  height: 300px;
  border-radius: 50%;
  box-shadow: 0px 30px 90px, rgba(240, 240, 240, 0.8) 0px -30px 90px;
}
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
  box-shadow: inset 0px 2px 4px, inset rgba(240, 240, 240, 0.8) 0px -2px 4px;
  /* transform: rotateZ(45deg); */
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
  box-shadow: rgba(0, 0, 0, 0.3) 2px 2px 4px;
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
  box-shadow: rgba(0, 0, 0, 0.3) 2px 2px 4px;
}
</style>

