<template>
  <div class="sound">
    <ul>
      <li v-for="(sound, index) in sounds" :key="index" @touchstart="thisSound(index)">
        {{ sound.name }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: ["isSelect"],
  data() {
    return {
      sounds: [
        {
          name: 'A',
          sound: '#FFF'
        },
        {
          name: 'B',
          sound: '#F00'
        },
        {
          name: 'C',
          sound: '#000'
        }
      ],
      sound: "sound",
      text: "sound"
    }
  },
  methods: {
    thisSound(index) {
      const reset = "";
      this.sound = this.sounds[index].name;
      this.$emit("soundChange", reset, this.sound);
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
  flex-direction: column;
  justify-content: center;
  text-align: center;
}
.sound li {
  list-style: none;
  animation: look 1.5s;
}
@keyframes look {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>