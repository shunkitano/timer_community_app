<template>
  <div class="outer">
    <div class="setting">
      <input type="text" placeholder="Timer Name" v-model="text" @touchstart="selectName">
      <input type="button" :value="selects[0].name" @touchstart="selectStyle">
      <StyleChange @styleChange="changeHere" v-show="isActive === '1'"></StyleChange>
      <input type="button" :value="selects[1].name" @touchstart="selectColor" :style="styleObject">
      <ColorChange @colorChange="changeHere" v-show="isActive === '2'"></ColorChange>
      <input type="button" :value="selects[2].name" @touchstart="selectSound">
      <SoundChange @soundChange="changeHere" v-show="isActive === '3'"></SoundChange>
      <div class="number" :class="{active:isActive === '4'}" @touchstart="selectCalc">
        <p>{{ tt }}:{{ mm }}:{{ ss }}</p>
        <div class="calc" v-show="isActive === '4'">
          <input type="number" min="0" max="59" v-model="t" @touchstart="startCalcT" @touchmove="moveCalcT">
          <input type="number" min="0" max="59" v-model="m" @touchstart="startCalcM" @touchmove="moveCalcM">
          <input type="number" min="0" max="59" v-model="s" @touchstart="startCalcS" @touchmove="moveCalcS">
        </div>
      </div>
    </div>
    <div class="new__timer">
      <input type="button" @touchstart="makeTimer" value="Make!">
      <input type="button" @touchstart="clear" value="Clear?">
    </div>
    <div class="footer">
      <button @touchend="mainPage">Main</button>
    </div>
  </div>
</template>

<script>
import ColorChange from '@/components/parts_comp/ColorChange.vue';
import SoundChange from '@/components/parts_comp/SoundChange.vue';
import StyleChange from '@/components/parts_comp/StyleChange.vue';

export default {
  components: {
    ColorChange,
    SoundChange,
    StyleChange
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
        {name: "Color"},
        {name: "Sound"}
      ],
      styleObject: {
        'background-color': ''
      }
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
    }
  },
  methods: {
    checkNum() {
      return this.isActive = this.text;
    },
    mainPage() { //メインページへ飛ぶ
      this.$emit("my-click", this.isFalse);
    },
    selectName() {
      this.isActive = "";
    },
    selectStyle() {
      this.isActive = "1";
    },
    selectColor() {
      this.isActive = "2";
    },
    selectSound() {
      this.isActive = "3";
    },
    selectCalc() {
      this.isActive = "4";
    },
    changeHere(reset ,item, style) {
      if(this.isActive === "2") {
        this.styleObject['background-color'] = style;
        console.log(style);
      }
      if(this.isActive === "3") {
        console.log(reset, item, style);
        this.$store.commit('selectSound', {
          i : style
        });
        console.log(this.$store.state.currentSound);
      }
      const i = this.isActive;
      this.isActive = reset;
      this.selects[i -1].name = item;
    },
    startCalcT(e) {
      this.y = e.changedTouches[0].clientY;
    },
    moveCalcT(e) {
      let yy = e.changedTouches[0].clientY;
      if(this.t >= 0 && this.t <= 60) {
        if(this.y > yy) {
          this.t++;
        } else if(this.y < yy) {
          this.t--;
        }
      } else if(this.t === 61) {
        this.t = 0;
      }else if(this.t === -1) {
        this.t = 60;
      }
      this.y = yy;
    },
    startCalcM(e) {
      this.y = e.changedTouches[0].clientY;
    },
    moveCalcM(e) {
      let yy = e.changedTouches[0].clientY;
      if(this.m >= 0 && this.m <= 60) {
        if(this.y > yy) {
          this.m++;
        } else if(this.y < yy) {
          this.m--;
        }
      } else if(this.m === 61) {
        this.m = 0;
      }else if(this.m === -1) {
        this.m = 60;
      }
      this.y = yy;
    },
    startCalcS(e) {
      this.y = e.changedTouches[0].clientY;
    },
    moveCalcS(e) {
      let yy = e.changedTouches[0].clientY;
      if(this.s >= 0 && this.s <= 60) {
        if(this.y > yy +2) {
          this.s++;
        } else if(this.y < yy) {
          this.s--;
        }
      } else if(this.s === 61) {
        this.s = 0;
      }else if(this.s === -1) {
        this.s = 60;
      }
      this.y = yy;
    },
    makeTimer() {
      this.$store.commit('makeTimer', {
        name: this.text,
        time: this.t*3600 + this.m*60 + this.s,
        style: this.selects[0].name,
        color: this.selects[1].name,
        sound: this.selects[2].name,
      })
      this.clear();
      this.$router.push('/user');
    },
    clear() {
      this.text = '';
      this.time = '';
      this.selects[0].name = "Style";
      this.selects[1].name = "Color";
      this.selects[2].name = "Sound";
      this.styleObject['background-color'] = '';
      this.t = 0;
      this.m = 0;
      this.s = 0;
      this.isActive = '';
      this.isCalc = false;
    },
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
  height: 100vh;
}
.setting {
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  width: 60%;
}
.setting input {
  font-size: 1.2rem;
  height: 50px;
  margin-top: 1.5rem;
  border-radius: 40px;
  color: rgba(0, 0, 0, 1);
  text-shadow: 1px 0px 2px white;
  background-color: rgba(0, 0, 0, 0);
  border: solid 1px rgba(0, 0, 0, 1);
}
.setting>input:first-child {
  text-align: center;
}
.setting input:focus {
  animation: neonline 1s ease;
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
.new__timer {
  position: absolute;
  bottom: 8rem;
  left: 0;
  right: 0;
  margin: auto;
  display: flex;
  justify-content: center;
  gap: 5%;
}
.new__timer input:first-child {
  width: 35%;
  color: rgba(250, 250, 250, 1);
  text-shadow: 1px 0px 2px rgba(0, 0, 0, 1);
  background-color: rgb(240, 120, 100);
}
.new__timer input:last-child {
  width: 20%;
  background-color: rgb(220, 220, 220);
}
/* Number */
.number {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.number p {
  font-size: 1.2rem;
  width: 100%;
  height: 50px;
  margin-top: 2rem;
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
.calc input {
  border: solid 1px rgba(0, 0, 0, 1);
  text-align: center;
  margin-top: 5px;
  width: 32%;
  height: 60px;
}
.calc input:first-child {
  border-radius: 0 0 0 20px;
  margin-right: 2%;
}
.calc input:nth-child(2) {
  border-radius: 0;
}
.calc input:last-child {
  border-radius: 0 0 20px 0;
  margin-left: 2%;
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
  width: 20%;
  height: 30px;
  border-radius: 40px 40px 0 0;
}
</style>


