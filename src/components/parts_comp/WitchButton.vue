<template>
  <div class="witch">
    <button class="btn" :class="{active:isThis, useOnly:useOnly}" @touchstart="selectBtn1">{{text1}}</button>
    <button class="btn" :class="{active:!isThis}" @touchstart="selectBtn2">{{text2}}</button>
  </div>
</template>
<script>
export default {
  props: ['text1', 'text2', 'childIndex', 'useOnly'],
  data() {
    return {
      isThis: false,
    }
  },
  mounted() {
    this.isThis = this.$store.state.fetchTimers[this.childIndex].isCom;
  },
  methods: {
    selectBtn1() {
      if(this.isThis && !this.useOnly) {
        this.isThis = !this.isThis;
        this.$emit('is-left', this.childIndex);
      }
    },
    selectBtn2() {
      if(!this.isThis && !this.useOnly) {
        this.isThis = !this.isThis;
        this.$emit('is-right', this.childIndex);
      }
    },
  }
}

</script>

<style scoped>
.witch {
  display: flex;
  align-items: center;
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
  padding: 0.5rem;
  background-color: rgba(230, 100, 100, 0.8);
  box-shadow: inset 0px 3px 4px rgba(20, 20, 20, 1);
  transition: 0.5s;
}
.witch .active {
  color: rgba(50, 50, 50, 0.8);
  background-color: rgba(220, 220, 220, 0.8);
  box-shadow: inset 0px 3px 4px rgba(250, 250, 250, 0.8), inset 0px -3px 4px rgba(20, 20, 20, 0.8);
}
.witch .useOnly {
  color: rgba(250, 250, 250, 0.8);
  background-color: rgba(10, 10, 10, 0.8);
}
</style>