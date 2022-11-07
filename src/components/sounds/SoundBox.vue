<template>
  <div>
    <input type="button" @touchstart="sound1">
    <input type="button" @touchstart="sound2">
    <input type="button" @touchstart="sound3">
  </div>
</template>

<script>
import * as Tone from 'tone'; // ここで読み込む。

export  default {
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
  }
  
}
</script>

<style scoped>
input {
  width: 60px;
  height: 60px;
}
</style>