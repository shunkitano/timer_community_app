<template>
  <div class="community">
    <UserButton class="userBtn"></UserButton>
    <div class="header" :class="{to__use:toUse}">
      <h2 class="nico" @touchstart="useTimer" @touchend="toTop">{{!toUse? "COMMUNITY" : "MEASURE"}}</h2>
    </div>
    <ul id="timers">
      <li v-for="(timer, index) in communityTimers" :key="index">
        <div :class="{nico:timer.style === 'digital', merriweather:timer.style === 'chronograph', quick:timer.style === 'circle'}" @touchstart="selectTimer(index)">
          <div :style="{'background-color': timer.themeColor}" class="timer__box">
            <p :style="{'color': timer.accentColor}">{{ ((timer.time - timer.time%360000) / 360000) >= 10 ? (timer.time - timer.time%360000) / 360000 : "0" + ((timer.time - timer.time%360000) / 360000) }}</p>
            <p :style="{'color': timer.accentColor}">:</p>
            <p :style="{'color': timer.accentColor}">{{ ((timer.time%360000 - timer.time%6000 ) / 6000) >= 10 ? (timer.time%360000 - timer.time%6000 ) / 6000 : "0" + ((timer.time%360000 - timer.time%6000 ) / 6000) }}</p>
            <p :style="{'color': timer.accentColor}">:</p>
            <p :style="{'color': timer.accentColor}">{{ timer.time%6000 /100  >= 10 ? timer.time%6000 /100  : "0" + timer.time%6000 /100 }}</p>
          </div>
          <div class="timer__name">
            <p>{{ timer.name }}</p>
            <p>{{ timer.userName ? timer.userName : "none"}}</p>
          </div>
          
        </div>
      </li>
    </ul>
    <transition name="look">
      <div id="select" v-if="isSelect">
        <div class="select__timer">
          <DigitalTimer v-if="selectStyle === 'digital'" class="sample" :isUse="isUse"></DigitalTimer>
          <ChronographTimer v-if="selectStyle === 'chronograph'" class="sample" :isUse="isUse"></ChronographTimer>
          <CircleTimer v-if="selectStyle === 'circle'" class="sample" :isUse="isUse"></CircleTimer>
        </div>
        <div class="select__box">
          <svg @touchend="addCommunityTimer" width="58" height="52" viewBox="0 0 58 52" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g filter="url(#filter0_i_148_36)">
              <path d="M24.493 2.5C26.4175 -0.833332 31.2288 -0.833335 33.1533 2.5L56.969 43.75C58.8935 47.0833 56.4879 51.25 52.6389 51.25H5.00746C1.15846 51.25 -1.24717 47.0833 0.677332 43.75L24.493 2.5Z" fill="#F3F3F3" fill-opacity="0.8"/>
            </g>
            <defs>
              <filter id="filter0_i_148_36" x="0" y="-2" width="57.6465" height="53.25" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                <feMorphology radius="2" operator="erode" in="SourceAlpha" result="effect1_innerShadow_148_36"/>
                <feOffset dy="-2"/>
                <feGaussianBlur stdDeviation="2"/>
                <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.5 0"/>
                <feBlend mode="normal" in2="shape" result="effect1_innerShadow_148_36"/>
              </filter>
            </defs>
          </svg>
          <p class="nico">Use it?</p>
          <CloseBtn @close-btn="closeSelect"></CloseBtn>
        </div><!--select__box-->
      </div><!--#select-->
    </transition>
    <transition name="gest">
      <div v-show="isGest" class="gest">
        <h2 class="text">Please</h2>
        <p class="text">login or sign up!</p>
        <NormalButton text="Close" @touchBtn="closeGest"></NormalButton>
      </div>
    </transition>
  </div>
</template>

<script>
import UserButton from '@/components/parts_comp/UserButton.vue';
import CloseBtn from '@/components/parts_comp/CloseBtn.vue';
import DigitalTimer from '@/components/timer_comp/DigitalTimer.vue';
import ChronographTimer from '@/components/timer_comp/ChronographTimer.vue';
import CircleTimer from '@/components/timer_comp/CircleTimer.vue';
import NormalButton from '@/components/parts_comp/NormalButton.vue';

export default {
  components: {
    UserButton,
    CloseBtn,
    DigitalTimer,
    ChronographTimer,
    CircleTimer,
    NormalButton
  },
  data() {
    return {
      isSelect: false,
      selectStyle: '', //表示するタイマーの種類を絞り込む
      selectTimerName: '',
      isUse: false,
      index: null,
      toUse: false,
      isGest: false
    }
  },
  async mounted() {
    await this.$store.dispatch('fetchCommunityDatas');
    await this.$store.dispatch('fetchUser');
  },
  computed: {
    communityTimers() {
      return this.$store.state.communityTimers;
    },
    user() {
      return this.userName();
    }
  },
  methods: {
    useTimer() {
      this.toUse = true;
    },
    toTop() {
      this.$router.push('/top');
    },
    selectTimer(index) {
      console.log(index);
      this.index = index;
      console.log(this.$store.state.communityTimers[index].name);
      console.log(this.$store.state.communityTimers[index].userId);
      this.selectTimerName = this.$store.state.communityTimers[index].name;
      this.selectStyle = this.$store.state.communityTimers[index].style;
      if(!this.isSelect) {
        this.$store.commit('selectTimer',{index});
      } 
      this.isSelect = true;
    },
    closeSelect(isClose) {
      this.isSelect = isClose;
    },
    addCommunityTimer() {
      if(this.$store.state.uid === null) {
        this.closeSelect();
        this.isGest = true;
      } else if(this.$store.state.uid !== null) {
        const name = this.communityTimers[this.index].name;
        const style = this.communityTimers[this.index].style;
        const themeColor = this.communityTimers[this.index].themeColor;
        const accentColor = this.communityTimers[this.index].accentColor;
        const sound = this.communityTimers[this.index].sound;
        const time = this.communityTimers[this.index].time;
        this.$store.commit('addCommunityTimer', {name, style, themeColor, accentColor, sound, time});
        this.closeSelect();
      }
    },
    closeGest(isFalse) {
      this.isGest = isFalse;
    },
  }
}
</script>

<style scoped>
.community {
  position: relative;
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
/* header */
.header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.header h2 {
  line-height: 60px;
  font-size: 1.2rem;
  height: 60px;
  text-align: center;
  width: 160px;
  color: rgba(250, 250, 250, 1);
  border: solid 1px rgba(250, 250, 250, 0.8);
  background-color: rgba(0, 0, 0, 0.8);
  border-radius: 40px;
  box-shadow: rgba(0, 0, 0, 1) 0px 2px 4px, rgba(240, 240, 240, 0.8) 0px -2px 4px;
}
.to__use h2 {
  animation: vanish1 0.5s ease;
}
@keyframes vanish1 {
  0% {
    scale: 1;
  }
  100% {
    font-size: 0.6rem;
    scale: 0.5;
  }
}
.community .userBtn {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 100;
}
/* CommunityRoom */
#timers {
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding-top: 5rem;
}
#timers li {
  width:80%;
  position: relative;
  display: flex;
  align-items: center;
  text-align: center;
  list-style: none;
  margin: 1rem auto 0;
  overflow: hidden;
  background-color: rgba(20, 20, 20, 0.1);
  border-radius: 10px;
}
#timers li div {
  display: flex;
  align-items: center;
}
.timer__box {
  display: block;
  justify-content: center;
  align-items: center;
  text-align: center;
  width: 80px;
  height: 80px;
  border: solid 0.5px rgba(20, 20, 20, 0.8);
}
.timer__box p {
  font-size: 14px;
  font-weight: bold;
  color: rgba(0, 0, 0, 1);
  -webkit-text-stroke: 0.1px rgba(250, 250, 250, 1);
  text-shadow:rgba(0, 0, 0, 0.8) 1px 2px 3px;
}
.timer__name {
  padding: 0.5rem;
  margin-left: 1rem;
  color: rgba(250, 250, 250, 1);
  background-color: rgba(0, 0, 0, 1);
  border-radius: 20px;
}
.timer__name p:last-child {
  padding: 0.5rem;
  margin-left: 0.5rem;
  color: rgba(0, 0, 0, 1);
  background-color: rgba(250, 250, 250, 1);
  border-radius: 20px;
}
.nico .timer__box {
  border-radius: 10px;
}
.merriweather .timer__box {
  border-radius: 30px;
}
.quick .timer__box {
  position: relative;
  border-radius: 50%;
  z-index: 1;
}
.circle::before {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  content: '';
  width: 60px;
  height: 60px;
  border-radius: 50%;
  backdrop-filter: brightness(70%);
  z-index: -1;
}
/*Select*/
#select {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  z-index: 100;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  width: 100%;
  height: 100vh;
}
#select p:first-child {
  position: fixed;
  top: 2rem;
  font-size: 1.4rem;
}
.select__box {
  position: fixed;
  bottom: 0;
  display: flex;
  width: 80%;
  align-items: center;
  background-color: rgba(50, 50, 50, 0.5);
  border-radius: 30px 30px 0 0;
  padding: 0.5rem 1rem;
  z-index: 1;
}
.select__box p {
  width: 80%;
  font-size: 1.6rem;
  color: rgba(250, 250, 250, 0.8);
}
.select__box svg {
  transform: rotateZ(-90deg);
}
.select__timer {
  width: 100%
}
.look-enter-active {
  animation: upIn 0.8s ease;
}
.look-leave-active {
  animation: upIn 0.5s ease reverse;
}
@keyframes upIn {
  0% {
    transform: translateY(100vh);
  }
  100% {
    transform: translateY(0);
  }
}
.gest {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  text-align: center;
  width: 80%;
  height: 30%;
  background-color: rgba(250, 250, 250, 0.7);
  backdrop-filter: blur(2px);
  border-radius: 40px;
  color: rgba(240, 10, 10, 0.8);
  font-size: 1.4rem;
}
.gest p {
  margin-bottom: 1rem;
}
.gest-enter-active {
  animation: downIn 0.8s ease;
}
.gest-leave-active {
  animation: downIn 0.5s ease reverse;
}
@keyframes downIn {
  0% {
    transform: translateY(-100vh);
  }
  100% {
    transform: translateY(0);
  }
}
</style>
