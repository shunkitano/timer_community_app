<template>
  <div>
    <button @touchstart="touchBtn" class="btn">{{ text }}</button>
  </div>
</template>

<script>
export default {
  props: ["text"],
  data() {
    return {
      isFalse: false
    }
  },
  methods: {
    touchBtn() {
      // console.log("touch!");
      this.$emit("touchBtn", this.isFalse);
    }
  }
}

</script>

<style scoped>
  .btn {
    background-color: rgba(240, 10, 10, 0.8);
    color: rgba(250, 250, 250, 1);
    font-size: 1.2rem;
    padding: 0.5rem;
    border-radius: 40px;
    border: solid 1px rgba(20, 20, 20, 0.8);
  }
</style>