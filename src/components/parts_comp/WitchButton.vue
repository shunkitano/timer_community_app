<template>
  <div class="witch">
    <button class="btn" :class="{active:isThis}" @touchstart="selectBtn">{{text1}}</button>
    <button class="btn" :class="{active:!isThis}" @touchstart="selectBtn">{{text2}}</button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      isThis: true,
      text1: '1',
      text2: '2'
    }
  },
  methods: {
    selectBtn() {
      this.isThis = !this.isThis;
    }
  }
}

</script>

<style scoped>
.witch {
  display: flex;
  gap: 1rem;
  width: 100%;
  height: 100%;
}
.witch .btn {
  display: block;
  width: 40%;
  height: 80%;
  border: none;
  border-radius: 30px;
  background-color: rgba(200, 200, 200, 0.3);
}
.witch .active {
  background-color: rgba(240, 10, 10, 0.8);
}
</style>