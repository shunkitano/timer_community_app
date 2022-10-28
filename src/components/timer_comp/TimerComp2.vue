<template>
  <div class="timer2">
    <div class="header">
      <button @click="toUserPage">{{ userName }}</button>
    </div>
    <div class="watch__circle">
      <div class="needle">
        <p  :style="styleObject"></p>
        <input type="button" value="needle" @click="change">
      </div>
      
    </div>
    <div class="watch__wrapper">
      <p class="text">{{ m }}</p>
      <p class="text">{{ s }}</p>
      <p class="text">{{ ms }}</p>
    </div>
    <div class="btn__circle">
      <button></button>
      <div class="inner__btn">
        <button></button>
        <button></button>
        <button></button>
      </div>
      <button></button>
    </div>
    <TimerSettingComp v-show="isSetting" class="setting"></TimerSettingComp>
  </div><!--timer-->
  
</template>
<script>
import TimerSettingComp from '@/components/timer_comp/TimerSettingComp.vue';
export default {
  components: {
    TimerSettingComp,
  },
  data() {
    return {
      timerName: 'defalt',
      userName: 'Who2',
      time: '',
      outTime: '',
      isCount:false,
      isCountS: false,
      isCountM: false,
      isReset: false,
      styleObject: {
        'transform': ''
      },
      isSetting: false,
      n: -91
    }
  },
  mounted() {
    return this.change();
  },
  computed: {
    m() {
      let m = Math.floor((this.count/6000) % 60);
      return ("0" + m).slice(-2);
    },
    s() {
      let s = Math.floor((this.count/100) % 60);
      return ("0" + s).slice(-2);
    },
    ms() {
      let ms = this.count;
      return ("0" + ms).slice(-2);
    },
  },
  methods: {
    toUserPage() {
      this.$router.push('/user');
    },
    toTimerSetting() {
      this.isSetting = !this.isSetting;
    },
    change() {
      this.n++;
      console.log(this.n);
      this.styleObject['transform'] ='rotateZ('+`${this.n}`+'deg)'; /* transform: rotateZ(90deg); */
    },
  }
}
</script>

<style scoped>
.timer {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0);
}
.header {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: flex-end;
  padding: 0.5rem;
  align-items: center;
  gap: 1rem;
}
.header button {
  width: 20%;
  height: 50px;
  border-radius: 2rem 1rem 1rem 2rem /2rem 1rem 1rem 2rem;
  background-color: rgba(252, 252, 232, 1);
}
.watch__circle {
  width: 400px;
  height: 400px;
  border-radius: 50%;
  background-color: rgba(252, 252, 232, 0.5);
  margin-top: 6rem;
  display: flex;
  align-items: center;
  position: relative;
}
.needle {
  position: relative;
}
.needle p {
  width: 390px;
  height: 2px;
  background-color: darkcyan;
  /* transform: rotateZ(90deg); */
}
.needle p::after {
  content: '';
  position: absolute;
  width: 185px;
  height: 2px;
  background-color: rgba(252, 252, 232, 1);
}
.watch__wrapper {
  
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: rgb(217, 217, 217);
  overflow: hidden;
}
.watch__wrapper .text {
  display: block;
  font-size: 4rem;
  width: 33%;
  margin: 0 auto;
  text-align: center;
  height: 8rem;
  background-color: rgba(0, 0, 0, 0.7);
  border-radius: 1rem;
  margin: 1rem;
  padding-top: 1rem;
  color: rgba(0, 255, 4, 0.9);
}
.watch__wrapper .text:nth-child(2) {
  position: relative;
}
.watch__wrapper .text:nth-child(2)::after {
  content: '';
  width: 60%;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 1rem;
  margin: auto;
  border-width: 0 0 5px;
  border-style: solid;
  border-radius: 2px;
}
.timer .setting {
  display: block;
  width: 80%;
  height: 80%;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  background-color: ghostwhite;
}
.btn__circle {
  position: fixed;
  bottom: 0.5rem;
  left: 0;
  right: 0;
  margin: auto;
  width: 200px;
  height: 200px;
  border-radius: 6rem 6rem 2rem 2rem /6rem 6rem 2rem 2rem;
  background-color: rgba(252, 252, 232, 0.5);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 5px;
}
.btn__circle button {
  width: 65px;
  height: 65px;
  border-radius: 1rem;
}
.btn__circle div {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
}
.inner__btn button {
  width: 70px;
  height: 70px;
  border-radius: 50%;
}
.inner__btn button:first-child {
  width: 55px;
  height: 55px;
}
.inner__btn button:first-child::after {
  content: '';
  width: 2rem;
  position: absolute;
  left: 0.8rem;
  bottom: 2rem;
  margin: auto;
  border-width: 0 0 5px;
  border-style: solid;
  border-radius: 2px;
  color: rgba(0, 255, 4, 0.9);
}
.inner__btn button:last-child {
  width: 55px;
  height: 55px;
  background-color: rgb(255, 93, 93);
}
</style>

