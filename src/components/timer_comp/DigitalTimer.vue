<template>
  <div class="wrapper">
    <div class="digital" :style="{'background-color': themeColor}">
      <p class="nico">{{name}}</p>
        <div class="watch">
          <p class="text" :style="{'color': accentColor}">{{ t }}</p>
          <p class="text" :style="{'color': accentColor}">{{ m }}</p>
          <p class="text" :style="{'color': accentColor}">{{ s }}</p>
          <div class="light__wrapper">
            <p :class="{light:isTms === '1'}"></p>
            <p :class="{light:isTms === '2'}"></p>
            <p :class="{light:isTms === '3'}"></p>
          </div>
        </div>
      <p :style="{'color': accentColor}">{{ message }}</p>
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
      accentColor: ''
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
    message() {
      return this.returnMessage();
    },
    checkStop() {
      return this.$store.state.isStop;
    }
  },
  methods: {
    returnMessage() {
      let message;
      if(this.checkStop === true) {
        if(this.t + this.m + this.s !== "000000") {
          message = "Push 'S' or 'R'";
        } else if(this.t + this.m + this.s === "000000") {
          message = "Please add 'time'";
        }
      } else if(this.checkStop === false) {
        message = "Now countDown";
      }
      return message;
    }
  }
}
</script>

<style scoped>
.wrapper {
  position: relative;
}
.digital {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  width: 100%;
  height: 45vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  border-radius: 55px;
  box-shadow: inset rgba(250, 250, 250, 0.8) 0px 4px 8px, inset rgba(0, 0, 0, 0.7) 0px -4px 8px, rgba(0, 0, 0, 0.5) 0px 30px 90px, rgba(0, 0, 0, 0.5) 0px 30px 90px;
  z-index: 2;
}
/* タイトル */
.digital>p:first-child {
  position: absolute;
  top: 1rem;
  font-size: 2.2rem;
  color: rgba(0, 0, 0, 0.9);
  display: inline;
  /* text-shadow: 1px 1px 1px rgba(240, 240, 240, 0.8), -1px -1px 1px rgba(0, 0, 0, 0.7); */
}
/* メッセージ */
.digital>p:last-child {
  position: absolute;
  bottom: 2rem;
  width: 240px;
  font-size: 1.2rem;
  /* color: rgba(0, 255, 4, 0.9); */
  display: inline;
  background-color: rgba(20, 20, 20, 0.9);
  border-radius: 15px;
  box-shadow: inset rgba(0, 0, 0, 0.8) 0px 1px 2px, inset rgba(240, 240, 240, 0.8) 0px -1px 2px;
}
.watch {
  position: relative;
  display: flex;
  gap: 0.5rem;
}
.watch .text {
  display: block;
  font-size: 3rem;
  margin: 0 auto;
  height: 5rem;
  padding: 1rem;
  line-height: 3rem;
  background-color: rgba(20, 20, 20, 0.9);
  border-radius: 1rem;
  box-shadow: inset rgba(0, 0, 0, 0.8) 0px 2px 4px, inset rgba(240, 240, 240, 0.8) 0px -2px 4px;
}
.light__wrapper {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  margin: auto;
  display: flex;
  justify-content: center;
  text-align: center;
}
.light__wrapper {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  width: 85%;
  margin: auto;
  display: flex;
  justify-content: space-between;
  text-align: center;
}
.light__wrapper .light {
  border-radius: 2px;
  width: 50px;
  height: 4px;
  background-color: rgba(0, 255, 4, 0.9);
  margin-bottom: 0.5rem;
}
</style>