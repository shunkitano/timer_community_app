<template>
  <div class="color">
    <ul>
      <li v-for="(color, index) in colors" :key="index" @touchstart="thisColor(index)">
        <div :style="{'background-color': color.color}"></div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: ["isSelect"],
  data() {
    return {
      colors: [],
      color: "color",
      text: "color",
      styleObject: {
        'background-color': ''
      }
    }
  },
  mounted() {
    return this.colors = this.$store.state.themeColors;
  },
  methods: {
    thisColor(index) {
      const reset = "";
      this.color = this.colors[index].name;
      this.$emit("colorChange", reset, this.color, this.colors[index].color);
      // console.log(this.colors[index].color);
      this.styleObject['background-color'] = this.colors[index].color;
    }
  }
}
</script>

<style scoped>
.color {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.color input {
  width: 100%;
  height: 40px;
  
  border-radius: 5px;
  color: #FFF;
  text-shadow: 1px 1px 2px #000;
}
.color ul {
  display: flex;
  justify-content: start;
  text-align: center;
  gap: 1rem;
  overflow: auto;
}
.color li {
  list-style: none;
  margin-top: 1rem;
  animation: look 1.5s;
}
.color li div {
  width: 30px;
  height: 30px;
  border-radius: 50%;
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