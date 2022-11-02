<template>
  <div class="outer">
    <TimerSettingComp v-show="isSetting" class="setting"></TimerSettingComp>
    <div class="timer" :class="{isActive:isSetting}">
      <div class="watch__wrapper">
        <p class="text" :class="{count__now:isCount && m > 0}">{{ m }}</p>
        <p class="text" :class="{count__now:isCount && (s > 0 || m > 0)}">{{ s }}</p>
        <p class="text" :class="{count__now:isCount}">{{ ms }}</p>
      </div>
      <div class="controller">
        <div class="pm">
          <span>
            <svg width="58" height="52" viewBox="0 0 58 52" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g filter="url(#filter0_i_60_49)">
            <path d="M24.493 2.5C26.4175 -0.833332 31.2288 -0.833335 33.1533 2.5L56.969 43.75C58.8935 47.0833 56.4879 51.25 52.6389 51.25H5.00746C1.15846 51.25 -1.24717 47.0833 0.677332 43.75L24.493 2.5Z" fill="#EAEAEA" fill-opacity="0.5"/>
            </g>
            <defs>
            <filter id="filter0_i_60_49" x="0" y="0" width="57.6465" height="51.25" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
            <feFlood flood-opacity="0" result="BackgroundImageFix"/>
            <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
            <feOffset/>
            <feGaussianBlur stdDeviation="2.5"/>
            <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
            <feBlend mode="normal" in2="shape" result="effect1_innerShadow_60_49"/>
            </filter>
            </defs>
            </svg>
          </span>
          <span>
            <svg width="58" height="52" viewBox="0 0 58 52" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g filter="url(#filter0_i_60_50)">
            <path d="M33.1535 48.75C31.229 52.0833 26.4177 52.0833 24.4932 48.75L0.677502 7.50001C-1.247 4.16668 1.15862 4.93833e-06 5.00762 4.60184e-06L52.639 4.37766e-07C56.488 1.01276e-07 58.8936 4.16667 56.9691 7.5L33.1535 48.75Z" fill="#EAEAEA" fill-opacity="0.5"/>
            </g>
            <defs>
            <filter id="filter0_i_60_50" x="0" y="0" width="57.6465" height="51.25" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
            <feFlood flood-opacity="0" result="BackgroundImageFix"/>
            <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
            <feOffset/>
            <feGaussianBlur stdDeviation="2.5"/>
            <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
            <feBlend mode="normal" in2="shape" result="effect1_innerShadow_60_50"/>
            </filter>
            </defs>
            </svg>
          </span>
        </div>
        <button class="pm__set"></button>
        <div class="ssr">
          <button></button>
          <button></button>
        </div>
      </div>
      <div class="footer">
        <button @touchstart="userPage"></button>
      </div>
    </div><!--timer-->
  </div>
</template>

<script>
import TimerSettingComp from '@/components/timer_comp/TimerSettingComp.vue';

export default {
  components: {
    TimerSettingComp,
  },
  data() {
    return {
      count:0,
      timerName: 'defalt',
      userName: 'Who',
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
    },
    userPage() {
      console.log("touch");
      this.isSetting = true;
    }
  }
}
</script>

<style scoped>
.outer {
  position: relative;
}
.setting {
  display: block;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  background-color: ghostwhite;
  z-index: 100;
  animation: downIn 2s;
}
@keyframes downIn {
  0% {
    opacity: 0.5;
    transform: translateY(-670px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}
.isActive {
  animation: downOut 2s;
}
@keyframes downOut {
  0% {
    opacity: 1;
    transform: translateY(0);
  }
  100% {
    opacity: 0.5;
    transform: translateY(670px);
  }
}
.timer {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0);
}
.footer {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: flex-start;
  padding: 0.2rem;
  align-items: center;
  gap: 1rem;
}
.footer button {
  width: 50px;
  height: 5px;
  border: none;
  margin-bottom: 15px;
  /* border-radius: 1rem 2rem 2rem 1rem /1rem 2rem 2rem 1rem; */
  background-color: rgba(0, 0, 0, 1);
  transition: 1s;
  border-radius: 2px;
}
.footer button::before {
  content: '';
  position: absolute;
  top: -10px;
  left: 0.2rem;
  width: 50px;
  height: 5px;
  border: none;
  background-color: rgba(0, 0, 0, 1);
  transition: 1s;
  border-radius: 2px;
}
.footer button::after {
  content: '';
  position: absolute;
  top: 15px;
  left: 0.2rem;
  width: 50px;
  height: 5px;
  border: none;
  background-color: rgba(0, 0, 0, 1);
  transition: 1s;
  border-radius: 2px;
}
.footer button:hover {
  width: 50px;
  height:50px;
  border-radius: 50%;
  border: solid 1px rgba(0, 0, 0, 1);
  background-color: rgba(0, 0, 0, 0);
}
.footer button:hover::before {
  content: '';
  width: 30px;
  transform: rotate(45deg)translate(30px, 30px);
}
.footer button:hover::after {
  content: '';
  width: 30px;
  transform: rotate(-45deg)translate(0px, 25px);
}
.watch__wrapper { 
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: rgb(217, 217, 217);
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
.controller {
  position: fixed;
  bottom: 0.2rem;
  right: 0.2rem;
  width: 200px;
  height: 200px;
  border-radius: 6rem 6rem 2rem 2rem /6rem 6rem 2rem 2rem;
  background-color: rgba(252, 252, 232, 0.5);
  display: flex;
  justify-content: space-evenly; 
  align-items: center; 
}
.pm {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 0.5rem;
}
.pm__set {
  margin-top: 2.5rem;
}
.ssr {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: end;
  gap: 2rem;
  align-items: center;
  margin-bottom: 2rem;
}
.ssr button:last-child {
  background-color: red;
  width: 30px;
  height: 30px;
}
.controller button {
  width: 40px;
  height: 40px;
  border: solid 1px grey;
  border-radius: 50%;
}


</style>