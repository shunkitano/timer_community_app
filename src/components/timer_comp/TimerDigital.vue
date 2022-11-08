<template>
  <div class="watch__wrapper">
    <p class="text" :class="{light:!isActive, count__now:isCount && m > 0}">{{ m }}</p>
    <p class="text" :class="{light:isActive, count__now:isCount && (s > 0 || m > 0)}">{{ s }}</p>
    <p class="text" :class="{count__now:isCount}">{{ ms }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      count:0,
      time: '',
      outTime: '',
      isCount:false,
      isCountS: false,
      isCountM: false,
      isReset: false,
      isActive: true
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
    }
  },
  methods: {
  }
}
</script>

<style scoped>

.watch__wrapper { 
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  /* height: 100vh;  */
  /* background-color: rgb(217, 217, 217); */
}
.watch__wrapper .text {
  display: block;
  font-size: 4rem;
  width: 33%;
  margin: 0 auto;
  text-align: center;
  height: 8rem;
  background-color: rgba(0, 0, 0, 0.7);
  border-radius: 1rem;
  margin: 1rem;
  padding-top: 1rem;
  color: rgba(0, 255, 4, 0.9);
}
.watch__wrapper .light {
  position: relative;
}
.watch__wrapper .light::after {
  content: '';
  width: 60%;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 1rem;
  margin: auto;
  border-width: 0 0 5px;
  border-style: solid;
  border-radius: 2px;
}
</style>