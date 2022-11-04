<template>
  <div class="color">
    <ul>
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
      color: "color",
      text: "color",
      styleObject: {
        'background-color': ''
      }
    }
  },
  methods: {
    thisColor(index) {
      const reset = ""
      this.color = this.colors[index].name;
      this.$emit("colorChange", reset, this.color);
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