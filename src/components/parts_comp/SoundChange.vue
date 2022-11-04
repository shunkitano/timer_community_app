<template>
  <div class="sound">
    <input type="button" :value="sound" @touchstart="selectSound">
    <ul v-if="isSound">
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
      isSound: false,
      sound: "sound"
    }
  },
  methods: {
    selectSound() {
      if(!this.isSelect) {
        this.isSound = true;
        this.$emit("soundChange", this.isSound);
      }
    },
    thisSound(index) {
      this.isSound = false;
      this.$emit("soundChange", this.isSound);
      this.sound = this.sounds[index].name;
    }
  }
}
</script>

<style scoped>
.sound {
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: 2rem;
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
  animation: look 1.5s;
}
@keyframes look {
  0% {
    opacity: 0;
    transform: translateX(-100px);
  }
  100% {
    opacity: 1;
    transform: translateX(0px);
  }
}
</style>