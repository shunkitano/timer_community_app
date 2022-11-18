<template>
  <div class="wrapper">
    <div class="circleM">
      <div :style="styleObjectM"></div>
    </div>
    <div class="circleS">
      <div :style="styleObjectS"></div>
    </div>
    <div class="circleL">
      <div :style="styleObjectL"></div>
    </div>
  </div>   
</template>

<script>
export default {
  components: {
  },
  data() {
    return {
      styleObjectL: {
        'background': ''
      },
      styleObjectM: {
        'background': ''
      },
      styleObjectS: {
        'background': ''
      },
      time: '',
      count: 60,
      n:1800,
    }
  },
  methods: {
    start() {
      this.time = setInterval(() => {
        this.countDown3(),this.change()
      }, 1000);
    },
    countDown3() {
      if(this.count > 0) {
        this.count--;
        
        console.log(this.count);
      } else if(this.count===0) {
        clearInterval(this.time2);
      }
    },
    change() {
      this.n--;
      this.styleObjectL['background'] = "conic-gradient( rgba(100, 105, 200, 0.9) 0deg "+ 1/10*`${this.n%3600}`+ "deg, rgba(100, 105, 150, 0.8) " + 1/10*`${this.n%3600}` + "deg 0deg)";
      //10分
      this.styleObjectM['background'] = "conic-gradient( rgba(0, 255, 4, 0.9) 0deg "+ 6*`${this.n%60}`+ "deg, rgba(200, 255, 150, 0.9) " + 6*`${this.n%60}` + "deg 0deg)";
      //60秒 
      this.styleObjectS['background'] = "conic-gradient( rgba(0, 0, 0, 0.7) 0deg "+ 6/10*`${this.n%600}`+ "deg, rgba(100, 100, 100, 0.7) "+ 6/10*`${this.n%600}` + "deg 0deg)";
    }
  }
}
</script>

<style scoped>
.wrapper {
  position: relative;
}
.circleL div {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  width: 150px;
  height: 150px;
  border-radius: 50%;
  background: rgba(250, 100, 50, 0.5);
  backdrop-filter: blur(2px);
  /* box-shadow: inset rgba(240, 240, 240, 0.8) 0px 2px 4px, inset 0px -2px 4px; */
}
.circleM div {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 10%;
  margin: auto;
  width: 300px;
  height: 300px;
  border-radius: 50%;
  background: rgba(250, 100, 50, 0.5);
  backdrop-filter: blur(2px);
  /* box-shadow: inset rgba(240, 240, 240, 0.8) 0px 2px 4px, inset 0px -2px 4px; */
}
.circleM div::before {
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
  /* mix-blend-mode: multiply; */
}
.circleS div {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 10%;
  margin: auto;
  width: 250px;
  height: 250px;
  border-radius: 50%;
  background: rgba(250, 100, 50, 0.5);
  backdrop-filter: blur(2px);
  /* mix-blend-mode: multiply; */
  /* box-shadow: inset rgba(240, 240, 240, 0.8) 0px 2px 4px, inset 0px -2px 4px; */
}

</style>

