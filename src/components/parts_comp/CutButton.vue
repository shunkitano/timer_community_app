<template>
  <div class="cut">
    <button @touchstart="addClass" @touchend="cutItem" :class="{cutting:isCut}">
      <svg width="52" height="20" viewBox="0 0 52 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3.39933e-08 10C2.95292e-08 10.6566 0.439718 11.3068 1.29405 11.9134C2.14838 12.52 3.40059 13.0712 4.97919 13.5355C6.55778 13.9998 8.43185 14.3681 10.4944 14.6194C12.5569 14.8707 14.7675 15 17 15C19.2325 15 21.4431 14.8707 23.5056 14.6194C25.5682 14.3681 27.4422 13.9998 29.0208 13.5355C30.5994 13.0712 31.8516 12.52 32.706 11.9134C33.5603 11.3068 34 10.6566 34 10L34 8.00024L23.375 10L21.25 10L17 10L3.39933e-08 10Z" fill="#7E7E7E"/>
        <path fill-rule="evenodd" clip-rule="evenodd" d="M48.25 2L40.3333 2C36.9473 2 34.182 4.65715 34.0086 8L45.75 8C48.0972 8 50 6.09721 50 3.75C50 2.7835 49.2165 2 48.25 2ZM40.3333 5.66554e-08C35.731 2.53655e-08 32 3.73096 32 8.33333C32 9.25381 32.7462 10 33.6667 10L45.75 10C49.2018 10 52 7.20178 52 3.75C52 1.67893 50.3211 1.24559e-07 48.25 1.10478e-07L40.3333 5.66554e-08Z" fill="#222222"/>
      </svg>
      <svg width="52" height="20" viewBox="0 0 52 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M34 10C34 9.34339 33.5603 8.69321 32.7059 8.08658C31.8516 7.47995 30.5994 6.92876 29.0208 6.46447C27.4422 6.00017 25.5682 5.63188 23.5056 5.3806C21.4431 5.12933 19.2325 5 17 5C14.7675 5 12.5569 5.12933 10.4944 5.3806C8.43184 5.63188 6.55778 6.00017 4.97918 6.46447C3.40059 6.92876 2.14838 7.47996 1.29405 8.08658C0.439718 8.69321 -1.6564e-07 9.34339 3.39933e-08 10L17 10L21.25 10L23.375 10L34 12L34 10Z" fill="#7E7E7E"/>
        <path fill-rule="evenodd" clip-rule="evenodd" d="M34.0086 12C34.182 15.3429 36.9473 18 40.3333 18L48.25 18C49.2165 18 50 17.2165 50 16.25C50 13.9028 48.0972 12 45.75 12L34.0086 12ZM33.6667 10C32.7462 10 32 10.7462 32 11.6667C32 16.269 35.731 20 40.3333 20L48.25 20C50.3211 20 52 18.3211 52 16.25C52 12.7982 49.2018 10 45.75 10L33.6667 10Z" fill="#222222"/>
      </svg>
    </button>
  </div>
</template>

<script>
export default {
  props: ["childIndex"],
  data() {
    return {
      isCut: false
    }
  },
  methods: {
    addClass() {
      if(!this.isCut) {
        this.isCut = !this.isCut;
      }
    },
    cutItem() {
      this.$emit("cut-item", this.childIndex );
    }
  }
}

</script>

<style scoped>
.cut button {
  position: relative;
  border: none;
  display: flex;
  align-items: center;
  width: 52px;
  height: 52px;
  background-color: rgba(0,0,0,0);
}
.cut button svg:first-child {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  transform: rotateZ(-15deg);
}
.cut button svg:last-child {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  transform: rotateZ(15deg);
}
.cutting svg:first-child {
  animation: cutting1 0.5s ease;
}
.cutting svg:last-child {
  animation: cutting2 0.5s ease;
}
@keyframes cutting1 {
  0% {
    transform: rotateZ(-30deg)translateX(-5px);
  }
  50% {
    transform: rotateZ(0deg)translateX(-10px);
  }
  100% {
    transform: rotateZ(-30deg)translateX(0px);
  }
}
@keyframes cutting2 {
  0% {
    transform: rotateZ(30deg)translateX(-5px);
  }
  50% {
    transform: rotateZ(0deg)translateX(-10px);
  }
  100% {
    transform: rotateZ(30deg)translateX(0px);
  }
}
</style>