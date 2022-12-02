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
      styles: [],
      style: "style",
      text: "style"
    }
  },
  mounted() {
    return this.styles = this.$store.state.styles;
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
.style ul {
  display: flex;
  justify-content: center;
  text-align: center;
  gap: 0.5rem;
}
.style li {
  list-style: none;
  animation: look 1.5s;
  margin-top: 0.5rem;
  background-color: rgba(0, 0, 0, 0.2);
  padding: 0 0.5rem;
  border-radius: 10px;
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