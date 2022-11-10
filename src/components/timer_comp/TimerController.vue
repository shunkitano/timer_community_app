<template>
  <div class="controller">
    <div class="pm">
      <span>
        <svg  @touchstart="startPlus" @touchmove="movePlus" width="58" height="52" viewBox="0 0 58 52" fill="none" xmlns="http://www.w3.org/2000/svg">
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
        <svg  @touchstart="startMinus" @touchmove="moveMinus" width="58" height="52" viewBox="0 0 58 52" fill="none" xmlns="http://www.w3.org/2000/svg">
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
      y: 0
    }
  },
  computed: {
    sound() { //これを直接メソッドに突っ込む。x
      return this.$store.state.currentSoundId; 
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
    // タイマーの設定
    plusMinus() {
      this.isActive = !this.isActive;
    },
    playSound() {
      console.log("!");
      // this.$store.commit('selectSound');
      if(this.sound === 1) {
        const synth = new Tone.Synth().toDestination();
        synth.triggerAttackRelease("A4", "8n");
      }
      if(this.sound === 2) {
        const synth2 = new Tone.PolySynth().toDestination();
        synth2.set({ detune: -800 });
        synth2.triggerAttackRelease(["C5", "E5","G5"], 0.5);
      }
      if(this.sound === 3) {
        const pingPong = new Tone.PingPongDelay("4n", 0.6).toDestination();
        const synth3 = new Tone.PolySynth().connect(pingPong);
        synth3.set({ detune: -800 });
        synth3.triggerAttackRelease(["C5", "E5","G5"], "40n");
      }
    }
  }
}
</script>

<style scoped>
.controller {
  display: flex;
  justify-content: center; 
  align-items: center; 
  z-index: 1;
}
.pm {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 0.5rem;
  margin-right: 1rem;
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
  background-color: red;
  width: 40px;
  height: 40px;
  margin: 0 1rem;
  border: none;
  border-radius: 50%;
  box-shadow: inset rgba(240, 240, 240, 0.8) 0px 2px 4px, inset 0px -2px 4px;
}
.ssr button:last-child {
  width: 60px;
  height: 60px;
  border: none;
  border-radius: 50%;
  box-shadow: inset rgba(240, 240, 240, 0.8) 0px 2px 4px, inset 0px -2px 4px;
}
</style>