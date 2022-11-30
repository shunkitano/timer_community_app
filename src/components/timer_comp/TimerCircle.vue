<template>
  <div class="wrapper">
    <div class="circleM">
      <div  :style="{'background-color': color }"></div>
    </div>
    <div class="circleS">
      <div  :style="{'background-color': color }"></div>
    </div>
    <div class="circleL">
      <div  :style="{'background-color': color }"></div>
    </div>
    <div class="text">
      <p>{{ t }}:{{ m }}:{{ s }}</p>
      <p>{{ name }}</p>
    </div>
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
      styleObject: {
        'background-color': ''
      }
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
.text {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  text-align: center;
}
</style>

