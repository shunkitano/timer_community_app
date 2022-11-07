<template>
  <div class="outer">
    <div class="setting">
      <input type="text">
      <input type="button" :value="selects[0].name" @touchstart="selectTime">
      <TimeChange @timeChange="changeHere" v-show="isActive === '1'"></TimeChange>
      <input type="button" :value="selects[1].name" @touchstart="selectColor" :style="styleObject">
      <ColorChange @colorChange="changeHere" v-show="isActive === '2'"></ColorChange>
      <input type="button" :value="selects[2].name" @touchstart="selectSound">
      <SoundChange @soundChange="changeHere" v-show="isActive === '3'"></SoundChange>
      <input type="button" :value="selects[3].name" @touchstart="selectStyle">
      <StyleChange @styleChange="changeHere" v-show="isActive === '4'"></StyleChange>
    </div>
    <div class="new__timer">
      <input type="button" @touchstart="setting" value="newTimer">
      <input type="button" @touchstart="setting" value="clear">
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
import TimeChange from '@/components/parts_comp/TimeChange.vue';

export default {
  components: {
    ColorChange,
    SoundChange,
    StyleChange,
    TimeChange
  },
  data() {
    return {
      isFalse: false,
      isActive: '',
      selects: [
        {name: "Time"},
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
    selectTime() {
      this.isActive = "1";
    },
    selectColor() {
      this.isActive = "2";
    },
    selectSound() {
      this.isActive = "3";
    },
    selectStyle() {
      this.isActive = "4";
    },
    setting() {

    },
    changeHere(reset ,item, style) {
      if(this.isActive === "2") {
        this.styleObject['background-color'] = style;
        console.log(style);
      }
      console.log(reset, item);
      const i = this.isActive;
      this.isActive = reset;
      this.selects[i -1].name = item;
    }
  }
}
</script>

<style>
input[type="text"] {
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
.setting input:focus:first-child {
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
  gap: 10%;
}
.new__timer input {
  width: 25%;
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


