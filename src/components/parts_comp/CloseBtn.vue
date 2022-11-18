<template>
  <div>
    <button :class="opCl" @touchstart='openClose'>
      <p></p>
    </button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      opCl:'close',
      isOpen: false,
      isSlide: false
    }
  },
  methods: {
    openClose() {
      if(this.opCl === 'close' && this.childEdit === false) {
        this.opCl = 'open';
        this.isOpen = true;
        this.$emit("open-close", this.isOpen, this.childId);
      } else if(this.opCl === 'open' && this.childEdit === true) {
        this.opCl = 'close';
        this.isOpen = false;
        this.$emit("open-close", this.isOpen, this.childId);
      }
    }
  }
}
</script>