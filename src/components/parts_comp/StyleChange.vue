<template>
  <div class="style">
    <input type="button" :value="style" @touchstart="selectStyle">
    <ul v-if="isStyle">
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
      isStyle: false,
      style: "style"
    }
  },
  methods: {
    selectStyle() {
      if(!this.isSelect) {
        this.isStyle = true;
        this.$emit("styleChange", this.isStyle);
      } 
    },
    thisStyle(index) {
      this.isStyle = false;
      this.$emit("styleChange", this.isStyle);
      this.style = this.styles[index].name;
    }
  }
}
</script>

<style scoped>
.style {
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: 2rem;
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