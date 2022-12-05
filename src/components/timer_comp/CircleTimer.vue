<template>
  <div class="wrapper" :style="{'background':styleObject}">
    <div class="text">
      <p class="quick">{{ name }}</p>
      <p class="quick">{{ t }}:{{ m }}:{{ s }}</p>
    </div>
    <div class="circleM">
      <div  :style="{'background': 'conic-gradient('+ accentColor + ' ' + t*6 +'deg,'+ themeColor + ' ' + t +'deg 0deg)' }"></div>
    </div>
    <div class="circleS">
      <div  :style="{'background': 'conic-gradient('+ accentColor + ' ' + m*6 +'deg,'+ themeColor + ' ' + m +'deg 200deg)' }"></div>
    </div>
    <div class="circleL">
      <div  :style="{'background': 'conic-gradient('+ accentColor + ' ' +  s*6 +'deg,'+  themeColor + ' ' + s +'deg 200deg)' }"></div>
    </div>
  </div>   
</template>

<script>
export default { //タイマー自体はstoreから情報を受け取るのみ！
  props: ['isUse','isTms'],//TimerCompから情報をうけとる
  data() {
    return {
      name: '',
      time: null,
      themeColor: '',
      accentColor: '',
      isTempo: false
    }
  },
  mounted() {
    console.log(this.isUse? "ここはメインです": "ここはコミュニティーです");
    if(this.isUse) {
      this.name = this.$store.state.fetchTimers[this.id].name; 
      this.time = this.$store.getters.time; 
      this.themeColor = this.$store.state.fetchTimers[this.id].themeColor;
      this.accentColor = this.$store.state.fetchTimers[this.id].accentColor;
      this.move = this.$store.state.fetchTimers[this.id].move;
      if(this.move === "tempo") {
        this.isTempo = false;
      } else if(this.move === "rubato") {
        this.isTempo = true;
      }
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
    z() {
      return this.isTempo ? Math.floor(Math.random()*(this.t%3 + this.m%3 + this.s)/5) : Math.floor((this.t + this.m + this.s*2)/5);
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
    styleObject() {
      return this.isTempo ? "radial-gradient("+ this.accentColor +(1 - this.z)+"%,"+ this.themeColor +")" : "radial-gradient(circle at 50vw 50vh, " + this.accentColor +" 0% "+ (1 - this.z) + "%,"+ this.themeColor + this.z + "% 100%)";
    }
  },
  methods: {
  }
}
</script>

<style scoped>
.wrapper {
  position: relative;
  width: 100%;
  height: 100vh;
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
  box-shadow: inset 0px -1px 2px;
}
.circleM div {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  width: 300px;
  height: 300px;
  border-radius: 50%;
}
.circleS div {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  width: 250px;
  height: 250px;
  border-radius: 50%;
  box-shadow: inset 0px -1px 2px;
}
.text {
  margin-top: 6rem;
  font-size: 1.4rem;
  text-align: center;
}
.text p:first-child {
  font-size: 2rem;
  margin-bottom: 0.5rem;
}
</style>

