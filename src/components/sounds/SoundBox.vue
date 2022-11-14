<template>
  <div>
    <input type="button" @touchstart="sound1">
    <input type="button" @touchstart="sound2">
    <input type="button" @touchstart="sound3">
    <input type="button" @touchstart="play">
  </div>
</template>

<script>
import * as Tone from 'tone'; // ここで読み込む。

export  default {
  data() {
    return {
      time: '',
      count: 4,
    }
  },
  methods: {
    sound1() {
      const synth = new Tone.Synth().toDestination();
      synth.triggerAttackRelease("A4", "8n");
    },
    sound2() {
      const synth = new Tone.PolySynth().toDestination();
      synth.set({ detune: -1200 });
      synth.triggerAttackRelease(["C5", "D5","G5"], 1);
    },
    sound3() {
      const synth = new Tone.Synth().toDestination();
      synth.triggerAttackRelease("E4", "8n");
    },
    sound4() {
      const plucky = new Tone.PluckSynth({
        attackNoise: 10,
        resonance: 0.1,
      }).toDestination();
      plucky.triggerAttack("C1", "+0");
      plucky.triggerAttack("C2", "+0.2");
      plucky.triggerAttack("C4", "+0.4");
      plucky.triggerAttack("C3", "+0.6");
      plucky.triggerAttack("G3", "+0.7");

    },
    countDown() {
      if(this.count > 0) {
        this.sound4();
        this.sound3();
        this.sound2();
        this.count--;
      }
      else if(this.count===0) {
        clearInterval(this.time);
      }
    },
    play() {
      this.time = setInterval(() => {this.countDown()}, 1600);
    }
  }
  
}
</script>

<style scoped>
input {
  width: 60px;
  height: 60px;
}
</style>