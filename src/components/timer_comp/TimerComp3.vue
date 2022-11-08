<template>
  <div class="outer">
    <transition :name='anim' @close='anim = $event'>
      <TimerSettingComp  v-if="isSetting" class="setting" @my-click='closeSetting'></TimerSettingComp>
      <div class="timer" :class="{isActive:isSetting}" v-else>
        <div class="header">
          <transition name="slide" mode="out-in">
            <div v-if="isAtherPage" class="info">
              <UserButton></UserButton>
              <button @touchend="settingPage">Make</button>
              <CommunityButton></CommunityButton>
              <button @touchstart="mainPage"></button><!--headerを閉じる-->
            </div>
            <ButtonComp1 @settingBtn="atherPage" v-else></ButtonComp1><!--headerを開ける-->
          </transition>   
        </div><!--header-->
        <div class="circle">
          <div class="needle" :style="styleObject"></div> 
          <div class="circle__top"></div>      
        </div><!--circle-->
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
          <button class="pm__set" @touchstart="plusMinus"></button>
          <div class="ssr">
            <button @touchstart="start"></button>
            <button></button>
          </div>
        </div><!--controller-->
      </div><!--timer-->
    </transition>
  </div><!--outer-->
</template>

<script>
import TimerSettingComp from '@/components/timer_comp/TimerSettingComp.vue';
import ButtonComp1 from '@/components/parts_comp/ButtonComp1.vue';
import UserButton from '@/components/parts_comp/UserButton.vue';
import CommunityButton from '@/components/parts_comp/CommunityButton.vue';
import * as Tone from 'tone';

export default {
  components: {
    TimerSettingComp,
    ButtonComp1,
    UserButton,
    CommunityButton
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
      isSetting: false,
      anim: '',
      isAtherPage: false,
      isActive: true,
      soundNum: '',
      styleObjectL: {
        'background': ''
      },
      styleObjectM: {
        'background': ''
      },
      styleObjectS: {
        'background': ''
      },
      time2: '',
      count2: 60,
      n:1800,
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
    },
    sound() { //これを直接メソッドに突っ込む。x
      return this.$store.state.currentSound; 
    }
  },
  methods: {
    toUserPage() {
      this.$router.push('/user');
    },
    settingPage(isTrue) {
      this.anim = "set"
      this.isSetting = isTrue;
      this.isAtherPage = !this.isAtherPage;
    },
    closeSetting(isFalse) {
      this.anim = "main";
      this.isSetting = isFalse;   
    },
    atherPage() {
      this.isAtherPage = !this.isAtherPage;
    },
    mainPage() {
      this.isAtherPage = !this.isAtherPage;
    },
    // タイマーの設定
    plusMinus() {
      this.isActive = !this.isActive;
    },


    playSound() {
      // this.$store.commit('selectSound');
      if(this.sound === "1") {
        const synth = new Tone.Synth().toDestination();
        synth.triggerAttackRelease("A4", "8n");
      }
      if(this.sound === "2") {
        const synth2 = new Tone.PolySynth().toDestination();
        synth2.set({ detune: -800 });
        synth2.triggerAttackRelease(["C5", "E5","G5"], 0.5);
      }
      if(this.sound === "3") {
        const pingPong = new Tone.PingPongDelay("4n", 0.6).toDestination();
        const synth3 = new Tone.PolySynth().connect(pingPong);
        synth3.set({ detune: -800 });
        synth3.triggerAttackRelease(["C5", "E5","G5"], "40n");
      }
    },
    start() {
      this.time2 = setInterval(() => {
        this.countDown3(),this.change()
      }, 1000);
    },
    countDown3() {
      if(this.count2 > 0) {
        this.count2--;
        
        console.log(this.count2);
      } else if(this.count2===0) {
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
.outer {
  position: relative;
}
.setting {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
} 
.set-enter-active {
  animation: up 1.5s;
}
.set-leave-active {
  animation: down 1.5s;
}
.main-enter-active {
  animation: down 1.5s reverse; 
}
.main-leave-active {
  animation: up 1.5s reverse;
}
@keyframes up {
  0% {
    opacity: 0.5;
    transform: translateY(-100vh);
  }
  100% {
    opacity: 1;
    transform: translateY(0px);
  }
}
@keyframes down {
  0% {
    opacity: 1;
    transform: translateY(0px);
  }
  100% {
    opacity: 0.5;
    transform: translateY(100vh);
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
.header {
  position: fixed;
  top: 0;
  right: 0;
  width: 100%;
  display: flex;
  justify-content: flex-end;
}
.info {
  position: relative;
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 100vh;
  /* background-color: rgba(0, 0, 0, 0.7); */
}
.info button {
  width: 30%;
  border-radius: 40px;
  height: 60px;
  transition: 1s ease;
  font-size: 1.2rem;
  color: rgba(250, 250, 250, 1);
  background-color: rgba(0, 0, 0, 0.5);
  border: solid 1px rgba(250, 250, 250, 1);
}
.info button:active {
  width: 40%;
  height: 30px;
  border-radius: 0 0 40px 40px;
}
.info UserButton {
  z-index: 100;
}
.info CommunityButton {
  z-index: 100;
}
.info button:nth-child(2) {
  z-index: 100;
}
.info button:last-child {
  position: absolute;
  top: 60px;
  left: 0;
  width: 100%;
  height: 90vh;
  border: none;
  background-color: rgba(0, 0, 0, 0);
  z-index: 0;
}
.slide-enter-active {
  animation: slideIn 0.5s reverse ease-in; 
}
.slide-leave-active {
  animation: slideIn 0.5s ease-out;
}
@keyframes slideIn {
  0% {
    opacity: 1;
    transform: translateY(0px);
  }
  100% {
    opacity: 0.5;
    transform: translateY(-100px);
  }
}
.controller {
  position: fixed;
  bottom: 0;
  right: 0;
  display: flex;
  justify-content: flex-end; 
  align-items: center; 
}
.pm {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 0.5rem;
  margin-right: 0.5rem;
}
.pm__set {
  position: relative;
  margin-right: 1rem;
}
.pm__set::after {
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
  color: rgba(0, 255, 4, 0.9);
}
.ssr {
  display: flex;
  flex-direction: column;
  justify-content: end;
  gap: 1rem;
  align-items: center;
  margin-bottom: 1rem;
  margin-right: 1rem;
}
.ssr button:first-child {
  width: 60px;
  height: 60px;
}
.ssr button:last-child {
  background-color: red;
  width: 40px;
  height: 40px;
}
.controller button {
  width: 40px;
  height: 40px;
  border: solid 1px grey;
  border-radius: 50%;
}
.circle {
  position: relative;
  width: 250px;
  height: 250px;
  border-radius: 50%;
  background-color: rgba(0, 0, 0, 0.3);
  transform: rotateZ(45deg);
  margin: 0 auto;
  overflow: hidden;
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
  background: rgba(250, 50, 50, 0.5);
}
</style>

