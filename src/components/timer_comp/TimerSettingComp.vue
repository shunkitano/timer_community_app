<template>
  <div class="outer">
    <div class="setting">
      <input type="text" placeholder="Timer Name" v-model="text">
      <div class="number">
        <input type="number" placeholder="minutes" min="0" max="59">
        <input type="number" placeholder="seconds" min="0" max="59" v-model="time">
      </div>
      <input type="button" :value="selects[0].name" @touchstart="selectColor" :style="styleObject">
      <ColorChange @colorChange="changeHere" v-show="isActive === '1'"></ColorChange>
      <input type="button" :value="selects[1].name" @touchstart="selectSound">
      <SoundChange @soundChange="changeHere" v-show="isActive === '2'"></SoundChange>
      <input type="button" :value="selects[2].name" @touchstart="selectStyle">
      <StyleChange @styleChange="changeHere" v-show="isActive === '3'"></StyleChange>
    </div>
    <div class="new__timer">
      <input type="button" @touchstart="makeTimer" value="Make!">
      <input type="button" @touchstart="clear" value="Clear">
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
      text: '',
      time: '',
      selects: [
        {name: "Color"},
        {name: "Sound"},
        {name: "Style"}
      ],
      styleObject: {
        'background-color': ''
      }
    }
  },
  computed: {
    check() {
      return this.checkNum();
    }
  },
  methods: {
    checkNum() {
      return this.isActive = this.text;
    },
    mainPage() { //メインページへ飛ぶ
      
      this.$emit("my-click", this.isFalse);
    },
    selectColor() {
      this.isActive = "1";
    },
    selectSound() {
      this.isActive = "2";
    },
    selectStyle() {
      this.isActive = "3";
    },
    changeHere(reset ,item, style) {
      if(this.isActive === "1") {
        this.styleObject['background-color'] = style;
        console.log(style);
      }
      if(this.isActive === "2") {
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
    makeTimer() {
      this.$store.commit('makeTimer', {
        name: this.text,
        time: this.time,
        color: this.selects[0].name,
        sound: this.selects[1].name,
        style: this.selects[2].name,
      })
    },
    clear() {
      this.text = '';
      this.time = '';
      this.selects[0].name = "Color";
      this.selects[1].name = "Sound";
      this.selects[2].name = "Style";
      this.styleObject['background-color'] = '';
      this.isActive = '';
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
  height: 100vh;
}
.setting {
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  width: 60%;
}
.setting input {
  height: 50px;
  margin-top: 2rem;
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
  bottom: 6rem;
  left: 0;
  right: 0;
  margin: auto;
  display: flex;
  justify-content: center;
  gap: 5%;
}
.new__timer input:first-child {
  width: 35%;
  background-color: rgb(240, 120, 100);
}
.new__timer input:last-child {
  width: 20%;
  background-color: rgb(220, 220, 220);
}
.number {
  display: flex;
  justify-content: center;
  gap: 10%;
}
.number input {
  border: solid 1px rgba(0, 0, 0, 1);
  text-align: center;
  width: 45%;
}
.footer {
  width: 100%;
  position: absolute;
  display: flex;
  justify-content: center;
  bottom: 0;
}
.footer button {
  width: 30%;
  border-radius: 40px;
  height: 60px;
  transition: 1s ease;
  font-size: 1.2rem;
  color: rgba(250, 250, 250, 1);
  background-color: rgba(0, 0, 0, 0.5);
  border: solid 1px rgba(250, 250, 250, 1);
}
.footer button:hover {
  width: 40%;
  height: 30px;
  border-radius: 40px 40px 0 0;
}
</style>


