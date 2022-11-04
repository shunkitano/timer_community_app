<template>
  <div class="color">
    <input type="button" :value="color" @touchstart="selectColor" :style="styleObject">
    <ul v-if="isColor">
      <li v-for="(color, index) in colors" :key="index" @touchstart="thisColor(index)">
        {{ color.name }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: ["isSelect"],
  data() {
    return {
      colors: [
        {
          name: 'skeleton',
          color: 'rgba(0, 0, 0, 0.3)'
        },
        {
          name: 'red',
          color: '#F00'
        },
        {
          name: 'dark',
          color: '#000'
        },
        {
          name: 'grey',
          color: '#999'
        }
      ],
      isColor: false,
      color: "color",
      styleObject: {
        'background-color': ''
      }
    }
  },
  methods: {
    selectColor() {
      if(!this.isSelect) {
        this.isColor = true;
        this.$emit("colorChange", this.isColor);
      }
    },
    thisColor(index) {
      this.isColor = false;
      this.$emit("colorChange", this.isColor);
      this.color = this.colors[index].name;
      this.styleObject["background-color"] = this.colors[index].color;
    }
  }
}
</script>

<style scoped>
.color {
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: 2rem;
}
.color input {
  width: 60%;
  height: 40px;
  margin: 0 auto;
  border-radius: 5px;
  color: #FFF;
  text-shadow: 1px 1px 2px #000;
}
.color ul {
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
}
.color li {
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