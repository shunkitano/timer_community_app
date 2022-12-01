<template>
  <div class="wrapper">
    <p class="text merriweather">{{ name }}</p>
    <div class="circle__wrapper1">
      <div class="circle__wrapper2" :style="{'background-color': themeColor}">
        <div class="circle1 sepia"></div><!--circle1-->
        <div class="needle1" :style="{'background-color': accentColor, transform:'rotateZ('+ rotation1 +'deg)'}"></div> 
          <div class="circle1__top" :style="{'background-color': accentColor}"></div> 
        <div class="circle2 sepia">
          <div class="needle2" :style="{'background-color': accentColor, transform:'rotateZ('+ rotation2 +'deg)'}"></div> 
          <div class="circle2__top" :style="{'background-color': accentColor}"></div>    
        </div><!--circle2-->
        <div class="circle3 sepia">
          <div class="needle3" :style="{'background-color': accentColor, transform:'rotateZ('+ rotation3 +'deg)'}"></div> 
          <div class="circle3__top" :style="{'background-color': accentColor}"></div>    
        </div><!--circle3-->
        <p class="text1 sepia">{{ t }} {{ m }} {{ s }}</p>
        <p class="text2 sepia">{{ ss }}</p>  
        <div class="circle4 sepia">
          <div class="needle4" :style="{'background-color': accentColor, transform:'rotateZ('+ rotation4 +'deg)'}"></div> 
        <div class="circle4__top" :style="{'background-color': accentColor}"></div>
        </div><!--circle3-->
      </div><!--circle__wrapper2-->
    </div><!--circle__wrapper1-->
  </div>
</template>

<script>
export default { //タイマー自体はstoreから情報を受け取るのみ！
  props: ['isUse','isTms'],//TimerCompから情報をうけとる
  data() {
    return {
      name: '',
      time:null,
      themeColor: '',
      accentColor: '',
      num: 0,
      x: 0,
      y: 0
    }
  },
  mounted() {
    console.log(this.isUse? "ここはメインです": "ここはコミュニティーです");
    if(this.isUse) {
      this.name = this.$store.state.fetchTimers[this.id].name; 
      this.time = this.$store.getters.time; 
      this.themeColor = this.$store.state.fetchTimers[this.id].themeColor;
      this.accentColor = this.$store.state.fetchTimers[this.id].accentColor;
    } else if(!this.isUse) {
      this.name = this.$store.state.communityTimers[this.id].name; 
      this.time = this.$store.state.communityTimers[this.id].time; 
      this.themeColor = this.$store.state.communityTimers[this.id].themeColor;
      this.accentColor = this.$store.state.communityTimers[this.id].accentColor;
    }
  },
  computed: {
    id() {
      return this.$store.state.currentTimerId;
    },
    t() { //時間
      let t = Math.floor((this.count/360000) % 60);
      return ("0" + t).slice(-2);
    },
    m() { //分
      let m = Math.floor((this.count/6000) % 60);
      return ("0" + m).slice(-2);
    },
    s() { //秒
      let s = Math.floor(this.count/100 % 60);
      return ("0" + s).slice(-2);
    },
    ss() { //1/100秒
      let s = Math.floor(this.count);
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
    },
    rotation4() {
      return this.ss*3.6;
    }
  },
  methods: {
  }
}
</script>

<style scoped>
.wrapper {
  display: flex;
  flex-direction: column;
}
.wrapper .text {
  text-align: center;
  margin: 0 auto 1rem;
  font-size: 1.6rem;
  background: linear-gradient(90deg,rgba(100, 100, 100, 0.8), rgba(150, 150, 150, 0.8)60%, rgba(250, 250, 250, 0.8)70%, rgba(0, 0, 0, 0.4)75%, rgba(100, 100, 100, 0.8));
  background-clip: text;
  -webkit-text-fill-color: transparent;
}
.sepia {
  filter: sepia(15%);
}
.circle__wrapper1 {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: auto;
  width: 300px;
  height: 300px;
  border-radius: 50%;
  background: linear-gradient(90deg,rgba(100, 100, 100, 0.8), rgba(150, 150, 150, 0.8)60%, rgba(250, 250, 250, 0.8)70%, rgba(0, 0, 0, 0.4)75%, rgba(150, 150, 150, 0.8));
}
.circle__wrapper2 {
  position: relative;
  width: 290px;
  height: 290px;
  border-radius: 50%;
  /* background-color: rgba(150, 150, 150, 1); */
  box-shadow: inset rgba(0, 0, 0, 0.3) 0px 2px 4px, inset rgba(100, 100, 100, 0.3) 0px -2px 4px;
}
.circle1 {
  position: absolute;
  top: 5px;
  left: 0;
  right: 0;
  margin: auto;
  width: 150px;
  height: 150px;
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
  width: 3px;
  height: 10px;
  background-color: rgba(180, 180, 180, 1);
  box-shadow: rgba(0, 0, 0, 0.8) 0px 0px 3px;
}
.circle1::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  width: 3px;
  height: 10px;
  background-color: rgba(180, 180, 180, 1);
  box-shadow: rgba(0, 0, 0, 0.8) 0px 0px 3px;
}
.needle1 {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  margin: 25px auto 0;
  width: 2px;
  height: 55px;
  background-color: rgba(240, 10, 10, 0.8);
  transform-origin: 1px 55px;
  z-index: 3;
}
.circle1__top {
  position: absolute;
  top: 75px;
  left: 0;
  right: 0;
  margin: auto;
  width: 10px;
  height: 10px;
  background-color: rgba(240, 10, 10, 0.8);
  border-radius: 50%;
  z-index: 3;
}
.circle1__top::before {
  content: '';
  position: absolute;
  top: 0;
  bottom: 0;
  left: 70px;
  margin: auto;
  width: 10px;
  height: 3px;
  background-color: rgba(180, 180, 180, 1);
  box-shadow: rgba(0, 0, 0, 0.8) 0px 0px 3px; 
}
.circle1__top::after {
  content: '';
  position: absolute;
  top: 0;
  bottom: 0;
  right: 70px;
  margin: auto;
  width: 10px;
  height: 3px;
  background-color: rgba(180, 180, 180, 1);
  box-shadow: rgba(0, 0, 0, 0.8) 0px 0px 3px;
}
.circle2 {
  position: absolute;
  top: 0;
  left: 5px;
  bottom: 0;
  margin: auto;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background-color: rgba(230, 230, 230, 1);
  box-shadow: inset rgba(0, 0, 0, 0.3) 0px 2px 4px, inset rgba(0, 0, 0, 0.8) 0px -2px 4px;
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
  background-color: rgba(240, 10, 10, 0.8);
}
.circle2__top {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  width: 10px;
  height: 10px;
  background-color: rgba(240, 10, 10, 0.8);
  border-radius: 50%;
}
.circle2__top::before {
  content: '';
  position: absolute;
  top: 0;
  bottom: 0;
  left: 50px;
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
  right: 50px;
  margin: auto;
  width: 5px;
  height: 2px;
  background-color: rgba(180, 180, 180, 1);
  box-shadow: rgba(0, 0, 0, 0.8) 2px 0px 3px;
}
.circle3 {
  position: absolute;
  top: 0;
  bottom: 0;
  right: 5px;
  margin: auto;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background-color: rgba(230, 230, 230, 1);
  box-shadow: inset rgba(0, 0, 0, 0.3) 0px 2px 4px, inset rgba(0, 0, 0, 0.8) 0px -2px 4px;
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
  background-color: rgba(240, 10, 10, 0.8);
}
.circle3__top {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  width: 10px;
  height: 10px;
  background-color: rgba(240, 10, 10, 0.8);
  border-radius: 50%;
}
.circle3__top::before {
  content: '';
  position: absolute;
  top: 0;
  bottom: 0;
  left: 50px;
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
  right: 50px;
  margin: auto;
  width: 5px;
  height: 2px;
  background-color: rgba(180, 180, 180, 1);
  box-shadow: rgba(0, 0, 0, 0.8) 2px 0px 3px;
}
.circle__wrapper2 .text1 {
  position: absolute;
  top: 50px;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  width: 70px;
  height: 15px;
  font-size: 12px;
  line-height: 15px;
  text-align: center;
  color: rgba(0, 0, 0, 0.8);
  background-color: rgba(230, 230, 230, 1);
  border-radius: 5px;
}
.circle__wrapper2 .text2 {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: -95px;
  margin: auto;
  width: 30px;
  height: 15px;
  font-size: 12px;
  line-height: 15px;
  text-align: center;
  color: rgba(0, 0, 0, 0.8);
  background-color: rgba(230, 230, 230, 1);
  border-radius: 5px;
}
.circle4 {
  position: absolute;
  bottom: 5px;
  right: 0;
  left: 0;
  margin: auto;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background-color: rgba(230, 230, 230, 1);
  box-shadow: inset rgba(0, 0, 0, 0.3) 0px 2px 4px, inset rgba(0, 0, 0, 0.8) 0px -2px 4px;
  z-index: 1;
}
.circle4::before {
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
.circle4::after {
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
.needle4 {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  margin: 10px auto 0;
  width: 2px;
  height: 30px;
  transform-origin: 1px 30px;
  background-color: rgba(240, 10, 10, 0.8);
}
.circle4__top {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  width: 10px;
  height: 10px;
  background-color: rgba(240, 10, 10, 0.8);
  border-radius: 50%;
}
.circle4__top::before {
  content: '';
  position: absolute;
  top: 0;
  bottom: 0;
  left: 40px;
  margin: auto;
  width: 5px;
  height: 2px;
  background-color: rgba(180, 180, 180, 1);
  box-shadow: rgba(0, 0, 0, 0.8) -2px 0px 3px;
}
.circle4__top::after {
  content: '';
  position: absolute;
  top: 0;
  bottom: 0;
  right: 40px;
  margin: auto;
  width: 5px;
  height: 2px;
  background-color: rgba(180, 180, 180, 1);
  box-shadow: rgba(0, 0, 0, 0.8) 2px 0px 3px;
}
</style>

