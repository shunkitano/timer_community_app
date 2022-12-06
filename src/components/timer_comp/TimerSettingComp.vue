<template>
  <div class="outer">
    <div class="setting">
      <input type="text" placeholder="Timer Name" v-model="text" @touchstart="selectName" class="neon" :class="{nico:selects[0].name === 'digital', merriweather:selects[0].name === 'chronograph', quick:selects[0].name === 'circle'}">
      <input type="button" :value="selects[0].name" @touchstart="selectStyle" class="neon" :class="{nico:selects[0].name === 'digital', merriweather:selects[0].name === 'chronograph', quick:selects[0].name === 'circle'}">
      <StyleChange @styleChange="changeHere" v-show="isActive === '1'"></StyleChange>
      <input type="button" :value="selects[1].name" @touchstart="selectThemeColor" :style="styleObject1" class="neon">
      <ThemeColorChange @colorChange="changeHere" v-show="isActive === '2'"></ThemeColorChange>
      <input type="button" :value="selects[2].name" @touchstart="selectAccentColor" :style="styleObject2" class="neon">
      <AccentColorChange @colorChange="changeHere" v-show="isActive === '3'"></AccentColorChange>
      <input type="button" :value="selects[3].name" @touchstart="selectSound" class="neon">
      <SoundChange @soundChange="changeHere" v-show="isActive === '4'"></SoundChange>
      <input type="button" :value="selects[4].name" @touchstart="selectMove" class="neon">
      <MoveChange @moveChange="changeHere" v-show="isActive === '5'"></MoveChange>
      <div class="number" :class="{active:isActive === '6'}" @touchstart="selectCalc">
        <p class="neon">{{ tt }}:{{ mm }}:{{ ss }}</p>
        <div class="calc__wrapper" v-show="isActive === '6'">
          <div class="calc__tt neon">
            <p class="text">{{ ttPlus > 10 ? null : ttPlus }}</p>
            <input type="number" min="0" max="59" v-model="tt" @touchstart="startCalcT" @touchmove="moveCalcT">
            <p class="text">{{ ttMinus > -1 ? ttMinus : null }}</p>
          </div>
          <div class="calc__mm neon">
            <p class="text">{{ mmPlus > 59 ? null : mmPlus }}</p>
            <input type="number" min="0" max="59" v-model="mm" @touchstart="startCalcM" @touchmove="moveCalcM">
            <p class="text">{{ mmMinus > -1 ? mmMinus : null }}</p>
          </div>
          <div class="calc__ss neon">
            <p class="text">{{ ssPlus > 59 ? null : ssPlus }}</p>
            <input type="number" min="0" max="59" v-model="ss" @touchstart="startCalcS" @touchmove="moveCalcS">
            <p class="text">{{ ssMinus > -1 ? ssMinus : null }}</p>
          </div>
        </div><!--calc__wrapper-->
      </div><!--number-->
    </div>
    <div class="new__timer">
      <input type="button" @touchstart="makeTimer" value="Make!">
      <input type="button" @touchstart="clear" value="Clear?">
    </div>
    <div class="footer">
      <button @touchend="mainPage" class="nico">MEASURE</button>
    </div>
    <transition name="empty">
      <div v-show="isEmpty" class="empty">
        <h2 class="text">Empty!</h2>
        <NormalButton text="Close" @touchBtn="closeEmpty"></NormalButton>
      </div>
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
import ThemeColorChange from '@/components/parts_comp/ThemeColorChange.vue';
import AccentColorChange from '@/components/parts_comp/AccentColorChange.vue';
import SoundChange from '@/components/parts_comp/SoundChange.vue';
import StyleChange from '@/components/parts_comp/StyleChange.vue';
import MoveChange from '@/components/parts_comp/MoveChange.vue';
import NormalButton from '@/components/parts_comp/NormalButton.vue';

export default {
  components: {
    ThemeColorChange,
    AccentColorChange,
    SoundChange,
    StyleChange,
    MoveChange,
    NormalButton
  },
  data() {
    return {
      isFalse: false,
      isActive: '',
      isCalc: false,
      text: '',
      t: 0,
      m: 0,
      s: 0,
      x: 0,
      y: 0,
      // number: '',
      selects: [
        {name: "Style"},
        {name: "ThemeColor"},
        {name: "AccentColor"},
        {name: "Sound"},
        {name: "Move"}
      ],
      styleObject1: {
        'background-color': ''
      },
      styleObject2: {
        'background-color': ''
      },
      isEmpty: false,
      isGest: false
    }
  },
  computed: {
    check() {
      return this.checkNum();
    },
    tt() {
      return ("0" + (this.t %60)).slice(-2);
    },    
    mm() {
      return ("0" + (this.m %60)).slice(-2);
    },
    ss() {
      return ("0" + (this.s %60)).slice(-2);
    },
    ttPlus() {
      return ("0" + (this.t +1 %60)).slice(-2);
    },
    ttMinus() {
      return ("0" + (this.t -1 %60)).slice(-2);
    },
    mmPlus() {
      return ("0" + (this.m +1 %60)).slice(-2);
    },
    mmMinus() {
      return ("0" + (this.m -1 %60)).slice(-2);
    },
    ssPlus() {
      return ("0" + (this.s +1 %60)).slice(-2);
    },
    ssMinus() {
      return ("0" + (this.s -1 %60)).slice(-2);
    }
  },
  methods: {
    checkNum() {
      return this.isActive = this.text;
    },
    selectName() {
      this.isActive = "";
    },
    selectStyle() {
      this.isActive = "1";
    },
    selectThemeColor() {
      this.isActive = "2";
    },
    selectAccentColor() {
      this.isActive = "3";
    },
    selectSound() {
      this.isActive = "4";
    },
    selectMove() {
      this.isActive = "5";
    },
    selectCalc() {
      this.isActive = "6";
    },
    changeHere(reset ,item, style) {
      if(this.isActive === "2") {
        this.styleObject1['background-color'] = style;
      }
      if(this.isActive === "3") {
        this.styleObject2['background-color'] = style;
      }
      const i = this.isActive;
      this.isActive = reset;
      this.selects[i -1].name = item;
    },
    startCalcT(e) {
      this.isCalc = true;
      this.y = e.changedTouches[0].clientY;
    },
    moveCalcT(e) {
      let yy = e.changedTouches[0].clientY;
      if(this.t >= 0 && this.t < 10 && this.y < yy) {
        this.t++;
      } else if(this.t > 0 && this.t <= 10 && this.y > yy) {
        this.t--;
      }
      this.y = yy;
    },
    startCalcM(e) {
      this.isCalc = true;
      this.y = e.changedTouches[0].clientY;
    },
    moveCalcM(e) {
      let yy = e.changedTouches[0].clientY;
      if(this.m >= 0 && this.m < 59 && this.y < yy) {
        this.m++;
      } else if(this.m > 0 && this.m <= 59 && this.y > yy) {
        this.m--;
      }
      this.y = yy;
    },
    startCalcS(e) {
      this.isCalc = true;
      this.y = e.changedTouches[0].clientY;
    },
    moveCalcS(e) {
      let yy = e.changedTouches[0].clientY;
      if(this.s >= 0 && this.s < 59 && this.y < yy) {
        this.s++;
      } else if(this.s > 0 && this.s <= 59 && this.y > yy) {
        this.s--;
      }
      this.y = yy;
    },
    makeTimer() {
      if(this.text === '' || this.selects[0].name === "Style" || this.selects[1].name === "ThemeColor" || this.selects[2].name === "AccentColor" || this.selects[3].name === "Sound" || this.selects[4].name === "Move" || !this.isCalc) {
        this.isEmpty = true;
      } else {
        if(this.$store.state.uid !== null) {
          const text = this.text;
          const style = this.selects[0].name;//style
          const themeColor = this.styleObject1['background-color'];//themeColor
          const accentColor = this.styleObject2['background-color'];//themeColor
          const sound = this.selects[3].name;//sound
          const move = this.selects[4].name;//move
          const time = this.t*360000 + this.m*6000 + this.s*100;//時間
          this.$store.commit('makeTimer', {text, style, themeColor, accentColor, sound, move, time})
          this.clear();
          this.$router.push('/user');
        } else if (this.$store.state.uid === null) {
          this.clear();
          this.isGest = true;
        }
      }
    },
    clear() {
      this.text = '';
      this.time = '';
      this.selects[0].name = "Style";
      this.selects[1].name = "ThemeColor";
      this.selects[2].name = "AccentColor";
      this.selects[3].name = "Sound";
      this.selects[4].name = "Move";
      this.styleObject1['background-color'] = '';
      this.styleObject2['background-color'] = '';
      this.t = 0;
      this.m = 0;
      this.s = 0;
      this.isActive = '';
      this.isCalc = false;
    },
    closeEmpty(isFalse) {
      this.isEmpty = isFalse;
    },
    closeGest(isFalse) {
      this.isGest = isFalse;
    },
    mainPage() { //メインページへ飛ぶ
      if(!this.$store.state.empty) {
        this.$emit("my-click", this.isFalse);
      }
    }
  }
}
</script>

<style>
/* inputのデフォルトcssを解除 */
input[type="text"],[type="number"] { 
	margin: 0;
	padding: 0;
	background: none;
	border: none;
	border-radius: 0;
	outline: none;
	-webkit-appearance: none;
	-moz-appearance: none;
	appearance: none;
}
/* inputのデフォルトcssを解除 */

.outer {
  position: relative;
  width: 100%;
  height: 100%;
}
.setting {
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  padding-top: 0.5rem;
  width: 60%;
}
.setting input {
  font-size: 1.2rem;
  height: 40px;
  margin: 0.5rem 0 0;
  border-radius: 40px;
  color: rgba(0, 0, 0, 1);
  text-shadow: 1px 0px 2px rgba(250, 250, 250, 1);
  background-color: rgba(0, 0, 0, 0);
  border: none;
  box-shadow: inset rgba(240, 240, 240, 0.8) 0px 2px 4px, inset rgba(0, 0, 0, 1) 0px -2px 4px;
}
.setting>input:first-child {
  border: solid 1px rgba(0, 0, 0, 1);
  text-align: center;
  box-shadow: none;
}
.setting .neon:active {
  animation: neonline 0.3s ease;
}
@keyframes neonline {
  25% {
    border-top: solid 1px rgb(250, 100, 100);
  }
  50% {
    border-left: solid 1px rgb(250, 100, 100);
  }
  75% {
    border-bottom: solid 1px rgb(250, 100, 100);
  }
  100% {
    border-right: solid 1px rgb(250, 100, 100);
  }
}
/* Number */
.number {
  margin: 0.5rem 0 0;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.number>p {
  font-size: 1.2rem;
  width: 100%;
  height: 50px;
  border-radius: 40px;
  color: rgba(250, 250, 250, 1);
  background-color: rgba(0, 0, 0, 0.7);
  border: solid 1px rgba(0, 0, 0, 1);
  text-align: center;
  line-height: 50px;
}
.active p {
  height: 30px;
  border-radius: 40px 40px 0 0;
  line-height: 30px;
}
.calc {
  width: 100%;
  animation: look 1.5s;
}
@keyframes look {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
.calc__wrapper {
  display: flex;
  flex-direction: row;
  text-align: center;
  font-size: 1rem;
}
.calc__wrapper input {
  text-align: center;
  margin: 0;
  border: none;
  box-shadow: none;
  font-size: 1.4rem;
}
.calc__wrapper .text {
  line-height: 20px;
  width: 100%;
  height: 20px;
  border: none;
  background-color: none;
  color: rgba(50, 50, 50, 0.8);
}
.calc__tt {
  width: 30%;
  display: flex;
  flex-direction: column;
  margin-top: 0.5rem;
  padding-bottom: 0.5rem;
  border-radius: 0 0 0 40px;
  color: rgba(0, 0, 0, 1);
  background-color: rgba(0, 0, 0, 0);
  border: none;
  box-shadow: inset rgba(240, 240, 240, 0.8) 0px 2px 4px, inset rgba(0, 0, 0, 1) 0px -2px 4px;
}
.calc__mm {
  display: flex;
  flex-direction: column;
  width: 30%;
  margin: 0.5rem 5% 0;
  padding-bottom: 0.5rem;
  color: rgba(0, 0, 0, 1);
  background-color: rgba(0, 0, 0, 0);
  border: none;
  box-shadow: inset rgba(240, 240, 240, 0.8) 0px 2px 4px, inset rgba(0, 0, 0, 1) 0px -2px 4px;
}
.calc__ss {
  width: 30%;
  display: flex;
  flex-direction: column;
  margin-top: 0.5rem;
  padding-bottom: 0.5rem;
  border-radius: 0 0 40px 0;
  color: rgba(0, 0, 0, 1);
  background-color: rgba(0, 0, 0, 0);
  border: none;
  box-shadow: inset rgba(240, 240, 240, 0.8) 0px 2px 4px, inset rgba(0, 0, 0, 1) 0px -2px 4px;
}
.new__timer {
  width: 60%;
  position: absolute;
  bottom: 5rem;
  left: 0;
  right: 0;
  margin: auto;
  display: flex;
  justify-content: center;
  /* gap: 5%; */
}
.new__timer input:first-child {
  width: 65%;
  color: rgba(250, 250, 250, 1);
  text-shadow: 1px 0px 2px rgba(0, 0, 0, 1);
  background-color: rgba(240, 10, 10, 0.8);
}
.new__timer input:last-child {
  width: 30%;
  margin-left: 5%;
  background-color: rgb(220, 220, 220);
}
.footer {
  width: 100%;
  position: absolute;
  display: flex;
  justify-content: center;
  bottom: 0;
}
.footer button {
  width: 40%;
  border-radius: 40px;
  height: 60px;
  transition: 0.5s ease;
  font-size: 1.2rem;
  color: rgba(250, 250, 250, 1);
  background-color: rgba(0, 0, 0, 0.5);
  border: solid 1px rgba(250, 250, 250, 1);
  box-shadow: rgba(0, 0, 0, 1) 0px 2px 4px, rgba(240, 240, 240, 0.8) 0px -2px 4px;
}
.footer button:active {
  font-size: 0.6rem;
  width: 20%;
  height: 30px;
  border-radius: 40px 40px 0 0;
}
.empty {
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
.empty-enter-active {
  animation: emptyAlert 0.2s;
}
.empty-leave-active {
  animation: emptyAlertClose 0.5s;
}
@keyframes emptyAlert {
  0% {
    scale: 1.1;
  }
  50% {
    scale: 1;
  }
  100% {
    scale: 1.1;
  }
}
@keyframes emptyAlertClose {
  0% {
    scale: 1;
  }
  50% {
    opacity: 0.8;
    transform: scale(1.2, 0.7);
  }
  100% {
    transform: scale(2, 0);
    opacity: 0;
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


