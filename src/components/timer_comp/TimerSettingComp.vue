<template>
  <div>
    <h2>TimerSetting</h2>
    <button @touchstart="mainPage"></button>
    <ButtonComp2></ButtonComp2>
  </div>
</template>

<script>
import ButtonComp2 from '@/components/parts_comp/ButtonComp2.vue';

export default {
  components: {
    ButtonComp2
  },
  data() {
    return {
      isfalse: false
    }
  },
  methods: {
    mainPage() {
      this.$emit("my-click", this.isfalse);
    }
  }
}
</script>

<style>
button {
  width: 50px;
  height: 50px;
}
</style>


