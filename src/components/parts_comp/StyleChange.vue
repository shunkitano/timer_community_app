<template>
  <div class="style">
    <ul>
      <li v-for="(style, index) in styles" :key="index" @touchstart="thisStyle(index)">
        {{ style.name }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: ["isSelect"],
  data() {
    return {
      styles: [
        {
          name: 'styleA',
          style: '#FFF'
        },
        {
          name: 'styleB',
          style: '#F00'
        },
        {
          name: 'styleC',
          style: '#000'
        }
      ],
      style: "style",
      text: "style"
    }
  },
  methods: {
    thisStyle(index) {
      const reset = "";
      this.style = this.styles[index].name;
      this.$emit("styleChange", reset, this.style);
    }
  }
}
</script>

<style scoped>
.style {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.style input {
  width: 60%;
  height: 40px;
  margin: 0 auto;
  border-radius: 5px;
  color: #FFF;
  text-shadow: 1px 1px 2px #000;
}
.style ul {
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
}
.style li {
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