<template>
  <div class="wrapper">
    <h1>正解音＆不正解音サンプル</h1>
    <div class="sounds">
      <input type="button" @click="playCorrect" value="正解">
      <input type="button" @click="playWrong" value="不正解">
    </div>
    <h2>＊Tone.jsの読み込み方＊</h2>
    <div class="param">
      <p>1: ターミナルで "npm install tone" でインストールする。</p>
      <p>2: "script"内に "import * as Tone from 'tone';" で読み込む。</p>
      <p>3: "script"内に "import * as Tone from 'tone';" で読み込む。</p>
    </div>
  </div>
  
</template>

<script>
import * as Tone from 'tone'; // ここで読み込む。
export default {
  data() {
    return {
      count: 1,
      time: ''
    }
  },
  methods: {
    // 正解 //
    sound() {
      const autoWah = new Tone.AutoWah(80, 100, -100).toDestination();
      const synth = new Tone.Synth().connect(autoWah);
      autoWah.Q.value = 6;
      synth.triggerAttackRelease("A4", "8n"); // １つ目の引数：音階、２つ目の引数：音の長さ
    },
    sound2() {
      const autoWah = new Tone.AutoWah(80, 100, -100).toDestination();
      const synth = new Tone.Synth().connect(autoWah);
      autoWah.Q.value = 8;
      synth.triggerAttackRelease("F4", "4n");
    },
    countDown() {
      if(this.count > 0) {
        this.count--;
        this.sound();
      } else if(this.count === 0) {
        clearInterval(this.time);
        this.sound2();
        this.count = 1;
      }
    },
    playCorrect() {
      this.time = setInterval(() => {
        this.countDown();
      }, 300); // 音が呼び出される間隔
    },

    // 不正解 //
    sound3() {
      const cheby = new Tone.Chebyshev(21).toDestination();
      const synth = new Tone.Synth().connect(cheby);
      synth.triggerAttackRelease("E2", "10n");
    },
    sound4() {
      const cheby = new Tone.Chebyshev(21).toDestination();
      const synth = new Tone.Synth().connect(cheby);
      synth.triggerAttackRelease("E2", "4n");
    },
    countDown2() {
      if(this.count > 0) {
        this.count--;
        this.sound3();
      } else if(this.count === 0) {
        clearInterval(this.time);
        this.sound4();
        this.count = 1;
      }
    },
    playWrong() {
      this.time = setInterval(() => {
        this.countDown2();
      }, 300);
    }  
  } 
}
</script>

<style scoped>
.wrapper {
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
}
h1 {
  font-size: 1.4rem;
  width: 100%;
  margin-top: 1rem;
  background-color: grey;
}
h2 {
  font-size: 1.2rem;
  margin-top: 2rem;
}
p {
  margin: 1rem;
}
.sounds input {
  width: 50px;
  height: 50px;
  border-radius: 1rem;
  margin: 1rem;
}
.sounds input:first-child {
  color: white;
  background-color: blue;
}
.sounds input:last-child {
  color: white;
  background-color: red;
}
.param {
  display: flex;
  flex-direction: column;
  justify-content: start;
  text-align: start;
  background-color: rgba(0, 0, 0, 0.1);
  border-radius: 1rem;
}
</style>
