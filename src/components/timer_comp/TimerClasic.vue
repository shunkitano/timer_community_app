<template>
  <div class="wrapper">
    <div class="circle__wrapper">
      <div class="circle">
        <div class="needle" :style="{'background-color': color, rotation}"></div> 
        <div class="circle__top" :style="{'background-color': color}"></div>    
      </div><!--circle-->
      <div class="text">
      <p>{{ t }}:{{ m }}:{{ s }}</p>
      <p>{{ name }}</p>
    </div>
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
      selectColor:'',
      num: 0,
      x: 0,
      y: 0,
      styleObject: {
        'background-color': ''
      },
      rotateNeedle: {
        'transform': ''
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
    rotation() {
      return this.rotateNeedle['trasform'] = 'rotateZ(45deg)';
    }
    /* transform: rotateZ(45deg); */
  },
  methods: {
    // startCircle(e) {
    //   this.x = e.changedTouches[0].clientX;
    //   this.y = e.changedTouches[0].clientY;
    //   console.log(this.y);
    //   console.log(this.x);
    // },
    // moveCircle(e) {
    //   let xx = e.changedTouches[0].clientX;
    //   let yy = e.changedTouches[0].clientY;
    //   if(this.num <= 30 ) {
    //     if(this.y < yy) {
    //       this.num++;
    //     }
    //     else if(this.y > yy) {
    //     this.num--;
    //     }
    //   }else if(30 < this.num) {
    //     if(this.y < yy) {
    //       this.num--;
    //     }
    //     else if(this.y > yy) {
    //       this.num++;
    //     }
    //   }
    //   this.y = yy;
    //   this.x = xx;
    // }
  }
}
</script>

<style scoped>
.wrapper {
  position: relative;
}
.circle__wrapper {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
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
.text {
  position: absolute;
  top: -100px;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  text-align: center;
}
</style>

