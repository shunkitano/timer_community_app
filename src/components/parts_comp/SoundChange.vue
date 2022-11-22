<template>
  <div class="sound">
    <ul>
      <li v-for="(sound, index) in sounds" :key="index">
        <p @touchstart="thisSound(index)">{{ sound.name }}</p>
        <span @touchstart="playSound(index)">
          <svg width="31" height="31" viewBox="0 0 31 31" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M31 15.5C31 24.0604 24.0604 31 15.5 31C6.93959 31 0 24.0604 0 15.5C0 6.93959 6.93959 0 15.5 0C24.0604 0 31 6.93959 31 15.5ZM3.0225 15.5C3.0225 22.3911 8.60887 27.9775 15.5 27.9775C22.3911 27.9775 27.9775 22.3911 27.9775 15.5C27.9775 8.60887 22.3911 3.0225 15.5 3.0225C8.60887 3.0225 3.0225 8.60887 3.0225 15.5Z" fill="#EFEFEF"/>
            <circle cx="15.5" cy="15.5" r="12.5" fill="#D9D9D9"/>
            <circle cx="10.5" cy="5.5" r="0.5" fill="black"/>
            <circle cx="10.5" cy="7.5" r="0.5" fill="black"/>
            <circle cx="8.5" cy="7.5" r="0.5" fill="black"/>
            <circle cx="10.5" cy="9.5" r="0.5" fill="black"/>
            <circle cx="8.5" cy="9.5" r="0.5" fill="black"/>
            <circle cx="6.5" cy="9.5" r="0.5" fill="black"/>
            <circle cx="10.5" cy="11.5" r="0.5" fill="black"/>
            <circle cx="8.5" cy="11.5" r="0.5" fill="black"/>
            <circle cx="6.5" cy="11.5" r="0.5" fill="black"/>
            <circle cx="10.5" cy="13.5" r="0.5" fill="black"/>
            <circle cx="8.5" cy="13.5" r="0.5" fill="black"/>
            <circle cx="6.5" cy="13.5" r="0.5" fill="black"/>
            <circle cx="4.5" cy="13.5" r="0.5" fill="black"/>
            <circle cx="10.5" cy="15.5" r="0.5" fill="black"/>
            <circle cx="8.5" cy="15.5" r="0.5" fill="black"/>
            <circle cx="6.5" cy="15.5" r="0.5" fill="black"/>
            <circle cx="4.5" cy="15.5" r="0.5" fill="black"/>
            <circle cx="10.5" cy="17.5" r="0.5" fill="black"/>
            <circle cx="8.5" cy="17.5" r="0.5" fill="black"/>
            <circle cx="6.5" cy="17.5" r="0.5" fill="black"/>
            <circle cx="4.5" cy="17.5" r="0.5" fill="black"/>
            <circle cx="10.5" cy="19.5" r="0.5" fill="black"/>
            <circle cx="8.5" cy="19.5" r="0.5" fill="black"/>
            <circle cx="6.5" cy="19.5" r="0.5" fill="black"/>
            <circle cx="10.5" cy="21.5" r="0.5" fill="black"/>
            <circle cx="8.5" cy="21.5" r="0.5" fill="black"/>
            <circle cx="6.5" cy="21.5" r="0.5" fill="black"/>
            <circle cx="10.5" cy="23.5" r="0.5" fill="black"/>
            <circle cx="8.5" cy="23.5" r="0.5" fill="black"/>
            <circle cx="10.5" cy="25.5" r="0.5" fill="black"/>
            <circle cx="12.5" cy="5.5" r="0.5" fill="black"/>
            <circle cx="12.5" cy="7.5" r="0.5" fill="black"/>
            <circle cx="12.5" cy="9.5" r="0.5" fill="black"/>
            <circle cx="12.5" cy="11.5" r="0.5" fill="black"/>
            <circle cx="12.5" cy="13.5" r="0.5" fill="black"/>
            <circle cx="12.5" cy="15.5" r="0.5" fill="black"/>
            <circle cx="12.5" cy="17.5" r="0.5" fill="black"/>
            <circle cx="12.5" cy="19.5" r="0.5" fill="black"/>
            <circle cx="12.5" cy="21.5" r="0.5" fill="black"/>
            <circle cx="12.5" cy="23.5" r="0.5" fill="black"/>
            <circle cx="12.5" cy="25.5" r="0.5" fill="black"/>
            <circle cx="11.5" cy="6.5" r="0.5" fill="black"/>
            <circle cx="9.5" cy="6.5" r="0.5" fill="black"/>
            <circle cx="11.5" cy="8.5" r="0.5" fill="black"/>
            <circle cx="9.5" cy="8.5" r="0.5" fill="black"/>
            <circle cx="7.5" cy="8.5" r="0.5" fill="black"/>
            <circle cx="11.5" cy="10.5" r="0.5" fill="black"/>
            <circle cx="9.5" cy="10.5" r="0.5" fill="black"/>
            <circle cx="7.5" cy="10.5" r="0.5" fill="black"/>
            <circle cx="5.5" cy="10.5" r="0.5" fill="black"/>
            <circle cx="11.5" cy="12.5" r="0.5" fill="black"/>
            <circle cx="9.5" cy="12.5" r="0.5" fill="black"/>
            <circle cx="7.5" cy="12.5" r="0.5" fill="black"/>
            <circle cx="5.5" cy="12.5" r="0.5" fill="black"/>
            <circle cx="11.5" cy="14.5" r="0.5" fill="black"/>
            <circle cx="9.5" cy="14.5" r="0.5" fill="black"/>
            <circle cx="7.5" cy="14.5" r="0.5" fill="black"/>
            <circle cx="5.5" cy="14.5" r="0.5" fill="black"/>
            <circle cx="11.5" cy="16.5" r="0.5" fill="black"/>
            <circle cx="9.5" cy="16.5" r="0.5" fill="black"/>
            <circle cx="7.5" cy="16.5" r="0.5" fill="black"/>
            <circle cx="5.5" cy="16.5" r="0.5" fill="black"/>
            <circle cx="11.5" cy="18.5" r="0.5" fill="black"/>
            <circle cx="9.5" cy="18.5" r="0.5" fill="black"/>
            <circle cx="7.5" cy="18.5" r="0.5" fill="black"/>
            <circle cx="5.5" cy="18.5" r="0.5" fill="black"/>
            <circle cx="11.5" cy="20.5" r="0.5" fill="black"/>
            <circle cx="9.5" cy="20.5" r="0.5" fill="black"/>
            <circle cx="7.5" cy="20.5" r="0.5" fill="black"/>
            <circle cx="5.5" cy="20.5" r="0.5" fill="black"/>
            <circle cx="11.5" cy="22.5" r="0.5" fill="black"/>
            <circle cx="9.5" cy="22.5" r="0.5" fill="black"/>
            <circle cx="7.5" cy="22.5" r="0.5" fill="black"/>
            <circle cx="11.5" cy="24.5" r="0.5" fill="black"/>
            <circle cx="9.5" cy="24.5" r="0.5" fill="black"/>
            <circle cx="14.5" cy="5.5" r="0.5" fill="black"/>
            <circle cx="14.5" cy="7.5" r="0.5" fill="black"/>
            <circle cx="14.5" cy="9.5" r="0.5" fill="black"/>
            <circle cx="14.5" cy="11.5" r="0.5" fill="black"/>
            <circle cx="14.5" cy="13.5" r="0.5" fill="black"/>
            <circle cx="14.5" cy="15.5" r="0.5" fill="black"/>
            <circle cx="14.5" cy="17.5" r="0.5" fill="black"/>
            <circle cx="14.5" cy="19.5" r="0.5" fill="black"/>
            <circle cx="14.5" cy="21.5" r="0.5" fill="black"/>
            <circle cx="14.5" cy="23.5" r="0.5" fill="black"/>
            <circle cx="14.5" cy="25.5" r="0.5" fill="black"/>
            <circle cx="13.5" cy="4.5" r="0.5" fill="black"/>
            <circle cx="13.5" cy="6.5" r="0.5" fill="black"/>
            <circle cx="13.5" cy="8.5" r="0.5" fill="black"/>
            <circle cx="13.5" cy="10.5" r="0.5" fill="black"/>
            <circle cx="13.5" cy="12.5" r="0.5" fill="black"/>
            <circle cx="13.5" cy="14.5" r="0.5" fill="black"/>
            <circle cx="13.5" cy="16.5" r="0.5" fill="black"/>
            <circle cx="13.5" cy="18.5" r="0.5" fill="black"/>
            <circle cx="13.5" cy="20.5" r="0.5" fill="black"/>
            <circle cx="13.5" cy="22.5" r="0.5" fill="black"/>
            <circle cx="13.5" cy="24.5" r="0.5" fill="black"/>
            <circle cx="13.5" cy="26.5" r="0.5" fill="black"/>
            <circle cx="16.5" cy="5.5" r="0.5" fill="black"/>
            <circle cx="16.5" cy="7.5" r="0.5" fill="black"/>
            <circle cx="16.5" cy="9.5" r="0.5" fill="black"/>
            <circle cx="16.5" cy="11.5" r="0.5" fill="black"/>
            <circle cx="16.5" cy="13.5" r="0.5" fill="black"/>
            <circle cx="16.5" cy="15.5" r="0.5" fill="black"/>
            <circle cx="16.5" cy="17.5" r="0.5" fill="black"/>
            <circle cx="16.5" cy="19.5" r="0.5" fill="black"/>
            <circle cx="16.5" cy="21.5" r="0.5" fill="black"/>
            <circle cx="16.5" cy="23.5" r="0.5" fill="black"/>
            <circle cx="16.5" cy="25.5" r="0.5" fill="black"/>
            <circle cx="15.5" cy="4.5" r="0.5" fill="black"/>
            <circle cx="15.5" cy="6.5" r="0.5" fill="black"/>
            <circle cx="15.5" cy="8.5" r="0.5" fill="black"/>
            <circle cx="15.5" cy="10.5" r="0.5" fill="black"/>
            <circle cx="15.5" cy="12.5" r="0.5" fill="black"/>
            <circle cx="15.5" cy="14.5" r="0.5" fill="black"/>
            <circle cx="15.5" cy="16.5" r="0.5" fill="black"/>
            <circle cx="15.5" cy="18.5" r="0.5" fill="black"/>
            <circle cx="15.5" cy="20.5" r="0.5" fill="black"/>
            <circle cx="15.5" cy="22.5" r="0.5" fill="black"/>
            <circle cx="15.5" cy="24.5" r="0.5" fill="black"/>
            <circle cx="15.5" cy="26.5" r="0.5" fill="black"/>
            <circle cx="18.5" cy="5.5" r="0.5" fill="black"/>
            <circle cx="18.5" cy="7.5" r="0.5" fill="black"/>
            <circle cx="18.5" cy="9.5" r="0.5" fill="black"/>
            <circle cx="18.5" cy="11.5" r="0.5" fill="black"/>
            <circle cx="18.5" cy="13.5" r="0.5" fill="black"/>
            <circle cx="18.5" cy="15.5" r="0.5" fill="black"/>
            <circle cx="18.5" cy="17.5" r="0.5" fill="black"/>
            <circle cx="18.5" cy="19.5" r="0.5" fill="black"/>
            <circle cx="18.5" cy="21.5" r="0.5" fill="black"/>
            <circle cx="18.5" cy="23.5" r="0.5" fill="black"/>
            <circle cx="18.5" cy="25.5" r="0.5" fill="black"/>
            <circle cx="17.5" cy="4.5" r="0.5" fill="black"/>
            <circle cx="17.5" cy="6.5" r="0.5" fill="black"/>
            <circle cx="17.5" cy="8.5" r="0.5" fill="black"/>
            <circle cx="17.5" cy="10.5" r="0.5" fill="black"/>
            <circle cx="17.5" cy="12.5" r="0.5" fill="black"/>
            <circle cx="17.5" cy="14.5" r="0.5" fill="black"/>
            <circle cx="17.5" cy="16.5" r="0.5" fill="black"/>
            <circle cx="17.5" cy="18.5" r="0.5" fill="black"/>
            <circle cx="17.5" cy="20.5" r="0.5" fill="black"/>
            <circle cx="17.5" cy="22.5" r="0.5" fill="black"/>
            <circle cx="17.5" cy="24.5" r="0.5" fill="black"/>
            <circle cx="17.5" cy="26.5" r="0.5" fill="black"/>
            <circle cx="20.5" cy="5.5" r="0.5" fill="black"/>
            <circle cx="20.5" cy="7.5" r="0.5" fill="black"/>
            <circle cx="22.5" cy="7.5" r="0.5" fill="black"/>
            <circle cx="20.5" cy="9.5" r="0.5" fill="black"/>
            <circle cx="22.5" cy="9.5" r="0.5" fill="black"/>
            <circle cx="24.5" cy="9.5" r="0.5" fill="black"/>
            <circle cx="20.5" cy="11.5" r="0.5" fill="black"/>
            <circle cx="22.5" cy="11.5" r="0.5" fill="black"/>
            <circle cx="24.5" cy="11.5" r="0.5" fill="black"/>
            <circle cx="20.5" cy="13.5" r="0.5" fill="black"/>
            <circle cx="22.5" cy="13.5" r="0.5" fill="black"/>
            <circle cx="24.5" cy="13.5" r="0.5" fill="black"/>
            <circle cx="26.5" cy="13.5" r="0.5" fill="black"/>
            <circle cx="20.5" cy="15.5" r="0.5" fill="black"/>
            <circle cx="22.5" cy="15.5" r="0.5" fill="black"/>
            <circle cx="24.5" cy="15.5" r="0.5" fill="black"/>
            <circle cx="26.5" cy="15.5" r="0.5" fill="black"/>
            <circle cx="20.5" cy="17.5" r="0.5" fill="black"/>
            <circle cx="22.5" cy="17.5" r="0.5" fill="black"/>
            <circle cx="24.5" cy="17.5" r="0.5" fill="black"/>
            <circle cx="26.5" cy="17.5" r="0.5" fill="black"/>
            <circle cx="20.5" cy="19.5" r="0.5" fill="black"/>
            <circle cx="22.5" cy="19.5" r="0.5" fill="black"/>
            <circle cx="24.5" cy="19.5" r="0.5" fill="black"/>
            <circle cx="20.5" cy="21.5" r="0.5" fill="black"/>
            <circle cx="22.5" cy="21.5" r="0.5" fill="black"/>
            <circle cx="24.5" cy="21.5" r="0.5" fill="black"/>
            <circle cx="20.5" cy="23.5" r="0.5" fill="black"/>
            <circle cx="22.5" cy="23.5" r="0.5" fill="black"/>
            <circle cx="20.5" cy="25.5" r="0.5" fill="black"/>
            <circle cx="19.5" cy="6.5" r="0.5" fill="black"/>
            <circle cx="21.5" cy="6.5" r="0.5" fill="black"/>
            <circle cx="19.5" cy="8.5" r="0.5" fill="black"/>
            <circle cx="21.5" cy="8.5" r="0.5" fill="black"/>
            <circle cx="23.5" cy="8.5" r="0.5" fill="black"/>
            <circle cx="19.5" cy="10.5" r="0.5" fill="black"/>
            <circle cx="21.5" cy="10.5" r="0.5" fill="black"/>
            <circle cx="23.5" cy="10.5" r="0.5" fill="black"/>
            <circle cx="25.5" cy="10.5" r="0.5" fill="black"/>
            <circle cx="19.5" cy="12.5" r="0.5" fill="black"/>
            <circle cx="21.5" cy="12.5" r="0.5" fill="black"/>
            <circle cx="23.5" cy="12.5" r="0.5" fill="black"/>
            <circle cx="25.5" cy="12.5" r="0.5" fill="black"/>
            <circle cx="19.5" cy="14.5" r="0.5" fill="black"/>
            <circle cx="21.5" cy="14.5" r="0.5" fill="black"/>
            <circle cx="23.5" cy="14.5" r="0.5" fill="black"/>
            <circle cx="25.5" cy="14.5" r="0.5" fill="black"/>
            <circle cx="19.5" cy="16.5" r="0.5" fill="black"/>
            <circle cx="21.5" cy="16.5" r="0.5" fill="black"/>
            <circle cx="23.5" cy="16.5" r="0.5" fill="black"/>
            <circle cx="25.5" cy="16.5" r="0.5" fill="black"/>
            <circle cx="19.5" cy="18.5" r="0.5" fill="black"/>
            <circle cx="21.5" cy="18.5" r="0.5" fill="black"/>
            <circle cx="23.5" cy="18.5" r="0.5" fill="black"/>
            <circle cx="25.5" cy="18.5" r="0.5" fill="black"/>
            <circle cx="19.5" cy="20.5" r="0.5" fill="black"/>
            <circle cx="21.5" cy="20.5" r="0.5" fill="black"/>
            <circle cx="23.5" cy="20.5" r="0.5" fill="black"/>
            <circle cx="25.5" cy="20.5" r="0.5" fill="black"/>
            <circle cx="19.5" cy="22.5" r="0.5" fill="black"/>
            <circle cx="21.5" cy="22.5" r="0.5" fill="black"/>
            <circle cx="23.5" cy="22.5" r="0.5" fill="black"/>
            <circle cx="19.5" cy="24.5" r="0.5" fill="black"/>
            <circle cx="21.5" cy="24.5" r="0.5" fill="black"/>
          </svg>
        </span>      
      </li>
    </ul>
  </div>
</template>

<script>
import * as Tone from 'tone'; // ここで読み込む。

export default {
  props: ["isSelect"],
  data() {
    return {
      sounds: [],
      sound: "sound",
      text: "sound"
    }
  },
  mounted() {
    return this.sounds = this.$store.state.sounds;
  },
  methods: {
    thisSound(index) {
      const reset = "";
      this.sound = this.sounds[index].name;
      this.$emit("soundChange", reset, this.sound);
    },
    playSound(index) {
      if(index === 0) {
        // const synth = new Tone.Synth().toDestination();
        // synth.triggerAttackRelease("A4", "8n");
        const freeverb = new Tone.Freeverb().toDestination();
        freeverb.dampening = 3000;
        const plucky = new Tone.PluckSynth().connect(freeverb);
        plucky.triggerAttack("G4", "+0.2");
        plucky.triggerAttack("E5", "+0.4");
        plucky.triggerAttack("D3", "+0.6");
        plucky.triggerAttack("A2", "+0.8");
      }
      if(index === 1) {
        const synth2 = new Tone.PolySynth().toDestination();
        synth2.set({ detune: -800 });
        synth2.triggerAttackRelease(["C5", "E5","G5"], 0.5);
      }
      if(index === 2) {
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
.sound {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.sound input {
  width: 60%;
  height: 40px;
  margin: 0 auto;
  border-radius: 5px;
  color: #FFF;
  text-shadow: 1px 1px 2px #000;
}
.sound ul {
  display: flex;
  justify-content: center;
  text-align: center;
  gap: 0.5rem;
}
.sound li {
  display: flex;
  align-items: center;
  text-align: center;
  list-style: none;
  animation: look 1.5s;
  margin-top: 0.5rem;
}
@keyframes look {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
.sound p {
  background-color: rgb(200, 200, 200);
  border-radius: 1rem;
  font-size: 0.8rem;
  padding: 0.2rem;
}
.sound svg {
  transition: 0.3s;
}
.sound svg:active {
  scale: 1.2;
}
</style>