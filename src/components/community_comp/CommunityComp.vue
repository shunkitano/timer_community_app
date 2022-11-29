<template>
  <div class="community">
    <UserButton class="userBtn"></UserButton>
    <div class="header">
      <h2 class="nico">Community</h2>
    </div>
    <ul id="timers">
      <li v-for="(timer, index) in communityTimers" :key="index">
        <div class="nico" @touchstart="selectTimer(index)">
          <div :style="{'background-color': timer.color}" :class="timer.style" class="timer__box">
            <p>{{ ((timer.time - timer.time%3600) / 3600) >= 10 ? (timer.time - timer.time%3600) / 3600 : "0" + ((timer.time - timer.time%3600) / 3600) }}</p>
            <p>:</p>
            <p>{{ ((timer.time%3600 - timer.time%60 ) / 60) >= 10 ? (timer.time%3600 - timer.time%60 ) / 60 : "0" + ((timer.time%3600 - timer.time%60 ) / 60) }}</p>
            <p>:</p>
            <p>{{ timer.time%60 >= 10 ? timer.time%60 : "0" + timer.time%60}}</p>
          </div>
          <p class="timer__name">{{ timer.name }}</p>
          <p>{{ timer.userName ? timer.userName : "none"}}</p>
        </div>
      </li>
    </ul>
    <transition name="look">
      <div id="select" v-if="isSelect">
        <p class="nico">{{ selectTimerName }}</p>
        <div class="select__timer">
          <TimerDigital v-if="selectStyle === 'digital'" class="sample" :isUse="isUse"></TimerDigital>
          <TimerClasic v-if="selectStyle === 'clasic'" class="sample" :isUse="isUse"></TimerClasic>
          <TimerCircle v-if="selectStyle === 'circle'" class="sample" :isUse="isUse"></TimerCircle>
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
  </div>
</template>

<script>
import UserButton from '@/components/parts_comp/UserButton.vue';
import CloseBtn from '@/components/parts_comp/CloseBtn.vue';
import TimerDigital from '@/components/timer_comp/TimerDigital.vue';
import TimerClasic from '@/components/timer_comp/TimerClasic.vue';
import TimerCircle from '@/components/timer_comp/TimerCircle.vue';

export default {
  components: {
    UserButton,
    CloseBtn,
    TimerDigital,
    TimerClasic,
    TimerCircle
  },
  data() {
    return {
      isSelect: false,
      selectStyle: '', //表示するタイマーの種類を絞り込む
      selectTimerName: '',
      isUse: false,
      index: null
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
        this.$router.push('/');
      } else if(this.$store.state.uid !== null) {
        const name = this.communityTimers[this.index].name;
        const style = this.communityTimers[this.index].style;
        const color = this.communityTimers[this.index].color;
        const sound = this.communityTimers[this.index].sound;
        const time = this.communityTimers[this.index].time;
        this.$store.commit('addCommunityTimer', {name, style, color, sound, time});
        this.closeSelect();
      }
    }
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
  font-size: 1rem;
  height: 60px;
  text-align: center;
  width: 160px;
  color: rgba(250, 250, 250, 1);
  background-color: rgba(0, 0, 0, 0.8);
  border: solid 1px rgba(250, 250, 250, 0.8);
  border-radius: 40px;
  box-shadow: inset rgba(240, 240, 240, 0.8) 0px 2px 4px, inset rgba(240, 240, 240, 0.8) 0px -2px 4px;
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
  margin-top: 5rem;
}
#timers li {
  width:80%;
  position: relative;
  display: flex;
  align-items: center;
  /* justify-content: center; */
  text-align: center;
  list-style: none;
  margin: 1rem auto 0;
  overflow: hidden;
  background-color: rgba(20, 20, 20, 0.1);
  border-radius: 10px;
}
#timers li div {
  /* width: 100%; */
  display: flex;
  align-items: center;
}
.timer__box {
  display: flex;
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
  -webkit-text-stroke: 0.5px rgba(250, 250, 250, 1);
}
.nico>p:last-child {
  padding: 0.5rem;
  margin-left: 0.5rem;
  color: rgba(0, 0, 0, 1);
  background-color: rgba(250, 250, 250, 1);
  border-radius: 20px;
}
.timer__name {
  padding: 1rem;
  margin-left: 1rem;
  color: rgba(250, 250, 250, 1);
  background-color: rgba(0, 0, 0, 1);
  border-radius: 20px;
}
.digital {
  border-radius: 10px;
}
.clasic {
  border-radius: 30px;
}
.circle {
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
  height: 80vh;
  background-color: rgba(250, 250, 250, 0.5);
  backdrop-filter: blur(1px);
}
#select p:first-child {
  position: fixed;
  top: 2rem;
  font-size: 1.4rem;
  margin-bottom: 1rem;
}
.select__box {
  position: fixed;
  bottom: 1rem;
  display: flex;
  width: 80%;
  align-items: center;
  background-color: rgba(50, 50, 50, 0.5);
  border-radius: 30px;
  padding: 0.5rem 1rem;
  z-index: 1;
}
.select__box p {
  width: 80%;
  font-size: 1.6rem;
  color: rgba(250, 250, 250, 1);
}
.select__box svg {
  transform: rotateZ(-90deg);
}
.select__timer {
  width: 100%
}
.look-enter-active {
  animation: appear 0.3s ease;
}
.look-leave-active {
  animation: appear 0.5s reverse;
}
@keyframes appear {
  0% {
    transform: scale(3, 0);
    opacity: 0;
  }
  5% {
    opacity: 0.8;
    transform: scale(2, 0.5);
  }
  10% {
    opacity: 0.8;
    transform: scale(2.5, 0.1);
  }
  50% {
    opacity: 0.8;
    transform: scale(2, 0.5);
  }
  100% {
    scale: 1;
  }
}
</style>
