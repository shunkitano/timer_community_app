<template>
  <div class="witch">
    <button class="btn" :class="{active:isThis}" @touchstart="selectBtn1">{{text1}}</button>
    <button class="btn" :class="{active:!isThis}" @touchstart="selectBtn2">{{text2}}</button>
  </div>
</template>
<script>
export default {
  props: ['text1', 'text2'],
  data() {
    return {
      isThis: false
    }
  },
  methods: {
    selectBtn1() {
      if(this.isThis) {
        this.isThis = !this.isThis;
      }
    },
    selectBtn2() {
      if(!this.isThis) {
        this.isThis = !this.isThis;
      }
    },
  }
}

</script>

<style scoped>
.witch {
  display: flex;
  gap: 0.25rem;
  width: 100%;
  height: 100%;
}
.witch .btn {
  display: block;
  width: 45%;
  height: 80%;
  border: none;
  border-radius: 30px;
  font-weight: bold;
  background-color: rgba(230, 100, 100, 0.8);
  box-shadow: inset 0px 3px 4px rgba(20, 20, 20, 1);
  transition: 0.5s;
}
.witch .active {
  color: rgba(50, 50, 50, 0.8);
  background-color: rgba(220, 220, 220, 0.8);
  box-shadow: inset 0px 3px 4px rgba(250, 250, 250, 0.8), inset 0px -3px 4px rgba(20, 20, 20, 0.8);
}
</style>