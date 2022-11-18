<template>
  <div class="controller">
    <div class="t__m__s">
      <button :class="{tt:isTT, mm:isMM}" @touchstart="checkToggle" @touchmove="slideToggle"></button>
    </div>
    <div class="pm">
      <span>
        <svg  @touchstart="startPlus" @touchmove="movePlus" width="58" height="52" viewBox="0 0 58 52" fill="none" xmlns="http://www.w3.org/2000/svg">
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
      </span>
      <span>
        <svg @touchstart="startMinus" @touchmove="moveMinus" width="58" height="52" viewBox="0 0 58 52" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g filter="url(#filter0_i_148_37)">
        <path d="M33.1535 49.5C31.229 52.8333 26.4177 52.8333 24.4932 49.5L0.677502 8.25001C-1.247 4.91668 1.15862 0.750005 5.00762 0.750005L52.639 0.75C56.488 0.75 58.8936 4.91667 56.9691 8.25L33.1535 49.5Z" fill="#F3F3F3" fill-opacity="0.8"/>
        </g>
        <defs>
        <filter id="filter0_i_148_37" x="0" y="-1.25" width="57.6465" height="53.25" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
        <feFlood flood-opacity="0" result="BackgroundImageFix"/>
        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
        <feMorphology radius="2" operator="erode" in="SourceAlpha" result="effect1_innerShadow_148_37"/>
        <feOffset dy="-2"/>
        <feGaussianBlur stdDeviation="2"/>
        <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.5 0"/>
        <feBlend mode="normal" in2="shape" result="effect1_innerShadow_148_37"/>
        </filter>
        </defs>
        </svg>
      </span>
    </div>
    <!-- <button class="pm__set" @touchstart="plusMinus"></button> -->
    <div class="ssr">
      <button @touchend="playSound"></button>
      <button></button>
    </div>
    
  </div>
</template>

<script>
import * as Tone from 'tone';

export default {
  data() {
    return {
      isActive: true,
      num: 0,
      time: '',
      x: 0,
      y: 0,
      isTT: false,
      isMM: true,
      tms: ""
    }
  },
  computed: {
    id() {
      return this.$store.state.currentTimerId;
    },
    sound() { //これを直接メソッドに突っ込む
      return this.$store.state.timers[this.id].sound; 
    }
  },
  methods: {
    startPlus(e) {
      this.num++;
      this.y = e.changedTouches[0].clientY;
    },
    movePlus(e) {
      let yy = e.changedTouches[0].clientY;
      if(this.y > yy+1) {
        this.num++;
      }
      this.y = yy;
    },
    startMinus(e) {
      this.num--;
      this.y = e.changedTouches[0].clientY;
    },
    moveMinus(e) {
      let yy = e.changedTouches[0].clientY;
      if(this.y < yy-1) {
        this.num--;
      }
      this.y = yy;
    },
    // タイマーの設定 //
    plusMinus() {
      this.isActive = !this.isActive;
    },
    playSound() {
      console.log("!");
      // this.$store.commit('selectSound');
      if(this.sound === "single") {
        const synth = new Tone.Synth().toDestination();
        synth.triggerAttackRelease("A4", "8n");
      }
      if(this.sound === "poly") {
        const synth2 = new Tone.PolySynth().toDestination();
        synth2.set({ detune: -800 });
        synth2.triggerAttackRelease(["C5", "E5","G5"], 0.5);
      }
      if(this.sound === 'delay') {
        const pingPong = new Tone.PingPongDelay("4n", 0.6).toDestination();
        const synth3 = new Tone.PolySynth().connect(pingPong);
        synth3.set({ detune: -800 });
        synth3.triggerAttackRelease(["C5", "E5","G5"], "40n");
      }
    },
    // tt:mm::ssの選択 //
    checkToggle(e) {
      this.x = e.changedTouches[0].clientX;
    },
    slideToggle(e) {
      let xx = e.changedTouches[0].clientX;
      if(!this.isTT && !this.isMM) {
        if((this.x - xx) > 10 && (this.x - xx) < 20) {
          this.isMM = true;
        }
        if((this.x - xx) >= 20) {
          this.isTT = !this.isTT;
        }
        this.tms = "3";  
      }
      else if (!this.isTT && this.isMM) {
        if((this.x - xx) > 10) {
          this.isMM = false;
          this.isTT = true;
        }
        if((this.x - xx) < -10) {
          this.isMM = false;
        }  
        this.tms = "2";
      }
      else if(this.isTT && !this.isMM) {
        if((this.x - xx) < -10 && (this.x - xx) > -20) {
          this.isTT = false;
          this.isMM = true;
        }
        if((this.x - xx) <= -20 ) {
          this.isTT = false;
        }
        this.tms = "1";
      }
      this.x = xx;
      this.$emit("select-tms", this.tms);
    }
  }
}
</script>

<style scoped>
.controller {
  position: relative;
  width: 100%;
  display: flex;
  justify-content: flex-end; 
  align-items: flex-end;
  padding-bottom: 1rem; 
  background-color: none;
  z-index: 1;
}
.t__m__s {
  position: absolute;
  bottom: 1rem;
  left: 0;
  right: 0;
  margin: auto;
  display: flex;
  width: 90px;
  height: 42px;
  border: none;
  background-color: rgba(200, 200, 200, 0.8);
  border-radius: 40px;
  box-shadow: rgba(0, 0, 0, 0.8) inset 0px 5px 10px;
}
.t__m__s button {
  width: 40px;
  height: 40px;
  border: none;
  border-radius: 50%;
  margin-left: 50px;
  background-color: rgba(210, 210, 210, 1);
  box-shadow: inset rgba(240, 240, 240, 0.8) 0px 2px 4px, inset 0px -2px 4px, rgba(0, 0, 0, 0.5) 0px 2px 4px;
}
.t__m__s .tt {
  margin-left: 0;
}
.t__m__s .mm {
  margin: 0 auto;
}
.pm {
  position: absolute;
  bottom: 0.5rem;
  right: 23%;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
.ssr {
  display: flex;
  flex-direction: column;
  justify-content: end;
  gap: 1rem;
  align-items: center;
  margin-right: 1rem;
}
.ssr button:first-child {
  background-color: rgba(240, 10, 10, 0.8);
  width: 40px;
  height: 40px;
  border: none;
  border-radius: 50%;
  box-shadow: inset rgba(240, 240, 240, 0.8) 0px 2px 4px, inset 0px -2px 4px;
}
.ssr button:last-child {
  width: 60px;
  height: 60px;
  border: none;
  border-radius: 50%;
  background-color: rgba(210, 210, 210, 0.8);
  box-shadow: inset rgba(240, 240, 240, 0.8) 0px 2px 4px, inset 0px -2px 4px;
}
</style>