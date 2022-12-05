<template>
  <div class="style">
    <ul>
      <li v-for="(move, index) in moves" :key="index" @touchstart="thisMove(index)">
        {{ move.name }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: ["isSelect"],
  data() {
    return {
      moves: [],
      move: "move",
      text: "text"
    }
  },
  mounted() {
    return this.moves = this.$store.state.moves;
  },
  methods: {
    thisMove(index) {
      const reset = "";
      this.move = this.moves[index].name;
      this.$emit("moveChange", reset, this.move);
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