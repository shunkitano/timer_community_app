<template>
  <div class="wrapper">
    <div class="circle__wrapper1">
      <div class="circle__wrapper2">
        <div class="circle1"></div><!--circle1-->
        <div class="needle1" :style="{'background-color': color, transform:'rotateZ('+ rotation1 +'deg)'}"></div> 
          <div class="circle1__top" :style="{'background-color': color}"></div> 
        <div class="circle2">
          <div class="needle2" :style="{'background-color': color, transform:'rotateZ('+ rotation2 +'deg)'}"></div> 
          <div class="circle2__top" :style="{'background-color': color}"></div>    
        </div><!--circle2-->
        <div class="circle3">
          <div class="needle3" :style="{'background-color': color, transform:'rotateZ('+ rotation3 +'deg)'}"></div> 
          <div class="circle3__top" :style="{'background-color': color}"></div>    
        </div><!--circle2-->
          <p class="text">{{ t }}:{{ m }}:{{ s }}</p>
      </div><!--circle__wrapper2-->
    </div><!--circle__wrapper1-->
    <!-- <p>{{ name }}</p> -->
  </div>
</template>

<script>
export default { //タイマー自体はstoreから情報を受け取るのみ！
  props: ['isUse','isTms'],//TimerCompから情報をうけとる
  data() {
    return {
      name: '',
      time:null,
      color: '',
      selectColor:'',
      num: 0,
      x: 0,
      y: 0,
      styleObject: {
        'background-color': ''
      }
    }
  },
  mounted() {
    console.log(this.isUse? "ここはメインです": "ここはコミュニティーです");
    if(this.isUse) {
      this.name = this.$store.state.fetchTimers[this.id].name; 
      this.time = this.$store.getters.time; 
      this.color = this.$store.state.fetchTimers[this.id].color;
    } else if(!this.isUse) {
      this.name = this.$store.state.communityTimers[this.id].name; 
      this.time = this.$store.state.communityTimers[this.id].time; 
      this.color = this.$store.state.communityTimers[this.id].color;
    }
  },
  computed: {
    id() {
      return this.$store.state.currentTimerId;
    },
    t() { //時間
      let t = Math.floor((this.count/3600) % 60);
      return ("0" + t).slice(-2);
    },
    m() { //分
      let m = Math.floor((this.count/60) % 60);
      return ("0" + m).slice(-2);
    },
    s() { //秒
      let s = Math.floor(this.count % 60);
      return ("0" + s).slice(-2);
    },
    ss() { //1/100秒
      let s = Math.floor(this.count % 60);
      return ("0" + s).slice(-2);
    },
    count() {
      let tms = this.time + this.getTime;
      return tms;
    },
    getTime() {
      return this.$store.getters.getTime;
    },
    reset() {
      return this.$store.getters.reset;
    },
    checkStop() {
      return this.$store.state.isStop;
    },
    rotation1() {
      return this.m*6;
    },
    rotation2() {
      return this.t*6;
    },
    rotation3() {
      return this.s*6;
    }
  },
  methods: {
  }
}
</script>

<style scoped>
.wrapper {
  display: flex;
}
.circle__wrapper1 {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: auto;
  width: 300px;
  height: 300px;
  border-radius: 50%;
  background-color: rgba(0, 0, 0, 0.3);
  box-shadow: inset rgba(240, 240, 240, 0.8) 0px 2px 4px, inset 0px -2px 4px;
}
/* .circle__wrapper1::before {
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
} */
.circle__wrapper2 {
  position: relative;
  width: 290px;
  height: 290px;
  border-radius: 50%;
  background-color: rgba(180, 180, 180, 1);
  box-shadow: inset rgba(0, 0, 0, 0.3) 0px 2px 4px, inset 0px -2px 4px;
}
.circle1 {
  position: absolute;
  top: 10px;
  left: 0;
  right: 0;
  margin: auto;
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background-color: rgba(230, 230, 230, 1);
  z-index: 1;
}
.circle1::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  margin: auto;
  width: 4px;
  height: 10px;
  background-color: rgba(180, 180, 180, 1);
}
.circle1::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  width: 4px;
  height: 10px;
  background-color: rgba(180, 180, 180, 1);
}
.needle1 {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  margin: 40px auto 0;
  width: 2px;
  height: 70px;
  transform-origin: 1px 70px;
  z-index: 3;
}
.circle1__top {
  position: absolute;
  top: 100px;
  left: 0;
  right: 0;
  margin: auto;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  z-index: 3;
}
.circle1__top::before {
  content: '';
  position: absolute;
  top: 0;
  bottom: 0;
  left: 100px;
  margin: auto;
  width: 10px;
  height: 4px;
  background-color: rgba(180, 180, 180, 1);
}
.circle1__top::after {
  content: '';
  position: absolute;
  top: 0;
  bottom: 0;
  right: 100px;
  margin: auto;
  width: 10px;
  height: 4px;
  background-color: rgba(180, 180, 180, 1);
}
.circle2 {
  position: absolute;
  left: 20px;
  bottom: 50px;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background-color: rgba(230, 230, 230, 1);
  box-shadow: inset rgba(0, 0, 0, 0.3) 0px 2px 4px, inset 0px -2px 4px;
  z-index: 1;
}
.circle2::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  margin: auto;
  width: 2px;
  height: 5px;
  background-color: rgba(180, 180, 180, 1);
  box-shadow: rgba(0, 0, 0, 0.8) 0px 2px 3px;
}
.circle2::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  width: 2px;
  height: 5px;
  background-color: rgba(180, 180, 180, 1);
  box-shadow: rgba(0, 0, 0, 0.8) 0px -2px 3px;
}
.needle2 {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  margin: 15px auto 0;
  width: 2px;
  height: 35px;
  transform-origin: 1px 35px;
}
.circle2__top {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  width: 20px;
  height: 20px;
  border-radius: 50%;
}
.circle2__top::before {
  content: '';
  position: absolute;
  top: 0;
  bottom: 0;
  left: 55px;
  margin: auto;
  width: 5px;
  height: 2px;
  background-color: rgba(180, 180, 180, 1);
  box-shadow: rgba(0, 0, 0, 0.8) -2px 0px 3px;
}
.circle2__top::after {
  content: '';
  position: absolute;
  top: 0;
  bottom: 0;
  right: 55px;
  margin: auto;
  width: 5px;
  height: 2px;
  background-color: rgba(180, 180, 180, 1);
  box-shadow: rgba(0, 0, 0, 0.8) 2px 0px 3px;
}
.circle3 {
  position: absolute;
  right: 20px;
  bottom: 50px;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background-color: rgba(230, 230, 230, 1);
  box-shadow: inset rgba(0, 0, 0, 0.3) 0px 2px 4px, inset 0px -2px 4px;
  z-index: 1;
}
.circle3::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  margin: auto;
  width: 2px;
  height: 5px;
  background-color: rgba(180, 180, 180, 1);
  box-shadow: rgba(0, 0, 0, 0.8) 0px 2px 3px;
}
.circle3::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  width: 2px;
  height: 5px;
  background-color: rgba(180, 180, 180, 1);
  box-shadow: rgba(0, 0, 0, 0.8) 0px -2px 3px;
}
.needle3 {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  margin: 15px auto 0;
  width: 2px;
  height: 35px;
  transform-origin: 1px 35px;
}
.circle3__top {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  width: 20px;
  height: 20px;
  border-radius: 50%;
}
.circle3__top::before {
  content: '';
  position: absolute;
  top: 0;
  bottom: 0;
  left: 55px;
  margin: auto;
  width: 5px;
  height: 2px;
  background-color: rgba(180, 180, 180, 1);
  box-shadow: rgba(0, 0, 0, 0.8) -2px 0px 3px;
}
.circle3__top::after {
  content: '';
  position: absolute;
  top: 0;
  bottom: 0;
  right: 55px;
  margin: auto;
  width: 5px;
  height: 2px;
  background-color: rgba(180, 180, 180, 1);
  box-shadow: rgba(0, 0, 0, 0.8) 2px 0px 3px;
}
.circle__wrapper2 .text {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 25px;
  margin: auto;
  width: 100px;
  font-size: 1.2rem;
  text-align: center;
  color: rgba(230, 230, 230, 1);
  background-color: rgba(0, 0, 0, 0.8);
  border-radius: 5px;
}
</style>

