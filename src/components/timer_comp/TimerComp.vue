<template>
  <div class="timer">
    <div class="header">
      <button @click="toTimerSetting">設定</button>
      <h2>{{ timerName }}</h2>
      <button @click="toUserPage">{{ userName }}</button>
    </div>
    <div class="watch__wrapper">
      <p class="text" :class="{count__now:isCount && m > 0}">{{ m }}</p>
      <p class="text" :class="{count__now:isCount && (s > 0 || m > 0)}">{{ s }}</p>
      <p class="text" :class="{count__now:isCount}">{{ ms }}</p>
    </div>
    <!-- <div class="plus__minus__m">
      <span @click="countMplus" :class="{litening:!isCountM}">
        <svg width="50" height="50" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_101_2)">
        <path d="M45.6699 7.5C47.5944 4.16667 52.4056 4.16667 54.3301 7.5L88.9711 67.5C90.8956 70.8333 88.49 75 84.641 75H15.359C11.51 75 9.10436 70.8333 11.0289 67.5L45.6699 7.5Z" fill="#DEDEDE"/>
        <path  d="M47.7301 61.4375V38H51.7074V61.4375H47.7301ZM38 51.7074V47.7301H61.4375V51.7074H38Z" fill="#EEF0F0"/></g><defs><clipPath id="clip0_101_2"><rect width="100" height="100" fill="white"/></clipPath></defs>
        </svg>
      </span>
      <span @click="countMminus" :class="{litening:!isCountM && countM > 0}">
        <svg width="50" height="50" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_101_6)">
        <path d="M54.3301 92.5C52.4056 95.8333 47.5944 95.8333 45.6699 92.5L11.0289 32.5C9.10436 29.1667 11.51 25 15.359 25L84.641 25C88.49 25 90.8956 29.1667 88.9711 32.5L54.3301 92.5Z" fill="#DEDEDE"/>
        <path d="M61.7273 48V51.9773H39V48H61.7273Z" fill="#EEF0F0"/></g><defs><clipPath id="clip0_101_6"><rect width="100" height="100" fill="white" transform="translate(100 100) rotate(-180)"/></clipPath></defs>
        </svg>
      </span>
    </div>
    <div class="plus__minus__s">
      <span @click="countSplus" :class="{litening:!isCountS}">
        <svg width="50" height="50" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_101_2)">
        <path d="M45.6699 7.5C47.5944 4.16667 52.4056 4.16667 54.3301 7.5L88.9711 67.5C90.8956 70.8333 88.49 75 84.641 75H15.359C11.51 75 9.10436 70.8333 11.0289 67.5L45.6699 7.5Z" fill="#DEDEDE"/>
        <path  d="M47.7301 61.4375V38H51.7074V61.4375H47.7301ZM38 51.7074V47.7301H61.4375V51.7074H38Z" fill="#EEF0F0"/></g><defs><clipPath id="clip0_101_2"><rect width="100" height="100" fill="white"/></clipPath></defs>
        </svg>
      </span>
      <span @click="countSminus" :class="{litening:!isCountS && countS > 0}">
        <svg width="50" height="50" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_101_6)">
        <path d="M54.3301 92.5C52.4056 95.8333 47.5944 95.8333 45.6699 92.5L11.0289 32.5C9.10436 29.1667 11.51 25 15.359 25L84.641 25C88.49 25 90.8956 29.1667 88.9711 32.5L54.3301 92.5Z" fill="#DEDEDE"/>
        <path d="M61.7273 48V51.9773H39V48H61.7273Z" fill="#EEF0F0"/></g><defs><clipPath id="clip0_101_6"><rect width="100" height="100" fill="white" transform="translate(100 100) rotate(-180)"/></clipPath></defs>
        </svg>
      </span>
    </div> -->
    <div class="btn__wrapper">
      <button class="btn" :class="{btOn:!isCount && count > 0}" @click="countStart()">Start</button>
      <button class="btn" :class="{btOn:isCount}" @click="countStop()">Stop</button>
      <button class="btn" :class="{btOn:isReset}" @click="countReset()">Reset</button>
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
      userName: 'Who',
      count:0, // 10ms秒単位で増やす
      countS:0,
      countM:0,
      time: '',
      outTime: '',
      isCount:false,
      isCountS: false,
      isCountM: false,
      isReset: false,
      styleObject: {
        'box-shadow': ''
      },
      isSetting: false
    }
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
    }
  },
  methods: {
    toUserPage() {
      this.$router.push('/user');
    },
    toTimerSetting() {
      this.isSetting = !this.isSetting;
    }
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
}
.header {
  display: flex;
  justify-content: space-between;
  padding: 1rem;
  align-items: center;
  gap: 1rem;
}
.header h2 {
  font-size: 1.8rem;
  height: 50px;
  text-align: center;
  width: 80%;
  background-color: ghostwhite;
  border: solid 1px gray;
  border-radius: 2rem;
}
.header button {
  width: 20%;
  height: 50px;
  border-radius: 2rem;
  border: solid 1px gray;
  background-color: ghostwhite;
}
.watch__wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80vh;
}
.watch__wrapper .text {
  display: block;
  font-size: 3rem;
  width: 33%;
  margin: 0 auto;
  text-align: center;
}
.btn__wrapper {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: center;
  padding-bottom: 1rem;
}
.btn__wrapper .btn {
  font-size: 1rem;
  width: 30%;
  height: 3rem;
  margin: 0 auto;
  text-align: center;
  border: solid 1px gray;
  border-radius: 2rem;
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
</style>