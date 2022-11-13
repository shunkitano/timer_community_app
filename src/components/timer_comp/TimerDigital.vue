<template>
  <div class="digital">
    <p>Digital</p>
    <div class="watch">
      <p class="text" :class="{light:isTms === '1', count__now:isCount && m > 0}">{{ m }}</p>
      <p class="text" :class="{light:isTms === '2', count__now:isCount && (s > 0 || m > 0)}">{{ s }}</p>
      <p class="text" :class="{light:isTms === '3', count__now:isCount}">{{ ms }}</p>
    </div>
    <p>{{ message }}</p>
  </div>
</template>

<script>
export default {
  props: ['isTms'],
  data() {
    return {
      count:0,
      time: '',
      outTime: '',
      isCount:false,
      isCountS: false,
      isCountM: false,
      isReset: false,
      message: 'Please select "time"'
    }
  },
  computed: {
    m() {
      let m = Math.floor((this.count/6000) % 60);
      return ("0" + m).slice(-2);
    },
    s() {
      let s = Math.floor((this.count/100) % 60);
      return ("0" + s).slice(-2);
    },
    ms() {
      let ms = this.count;
      return ("0" + ms).slice(-2);
    },
    checkTms() {
      return this.changeTms();
    }
  },
  methods: {
  }
}
</script>

<style scoped>
.digital {
  position: relative;
  width: 100%;
  height: 45vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  border-radius: 40px;
  background-color: rgb(217, 217, 217);
  box-shadow: inset rgba(250, 250, 250, 0.8) 0px 4px 8px, inset rgba(0, 0, 0, 0.7) 0px -4px 8px, rgba(0, 0, 0, 0.5) 0px 30px 90px, rgba(0, 0, 0, 0.5) 0px 30px 90px;
}
/* タイトル */
.digital>p:first-child {
  position: absolute;
  top: 2rem;
  font-size: 2rem;
  color: rgba(200, 200, 200, 0.8);
  display: inline;
  font-family: "Nico Moji";
  text-shadow: 1px 1px 1px rgba(240, 240, 240, 0.8), -1px -1px 1px rgba(0, 0, 0, 0.7);
}
/* メッセージ */
.digital>p:last-child {
  position: absolute;
  bottom: 2rem;
  width: 240px;
  font-size: 1.2rem;
  color: rgba(0, 255, 4, 0.9);
  display: inline;
  background-color: rgba(0, 0, 0, 0.7);
  border-radius: 15px;
  box-shadow: inset rgba(0, 0, 0, 0.7) 0px 1px 2px, inset rgba(240, 240, 240, 0.8) 0px -1px 2px;
}
.watch {
  display: flex;
  gap: 1rem; 
}
.watch .text {
  display: block;
  font-size: 3rem;
  margin: 0 auto;
  height: 5rem;
  padding: 1rem;
  line-height: 3rem;
  background-color: rgba(0, 0, 0, 0.7);
  border-radius: 1rem;
  color: rgba(0, 255, 4, 0.9);
  box-shadow: inset rgba(0, 0, 0, 0.7) 0px 2px 4px, inset rgba(240, 240, 240, 0.8) 0px -2px 4px;
}
.light {
  position: relative;
}
.light::after {
  content: "";
  position: absolute;
  bottom: 0.5rem;
  left: 0;
  right: 0;
  margin: auto;
  width: 50%;
  height: 4px;
  border-radius: 2px;
  background-color: rgba(0, 255, 4, 0.9);
}
</style>