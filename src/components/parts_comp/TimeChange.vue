<template>
  <div class="time">
    <input type="button" :value="time" @touchstart="selectTime">
    <ul v-if="isTime">
      <li v-for="(time, index) in times" :key="index" @touchstart="thisTime(index)">
        {{ time.name }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: ["isSelect"],
  data() {
    return {
      times: [
        {
          name: 'color',
          time: '#FFF'
        },
        {
          name: 'red',
          time: '#F00'
        },
        {
          name: 'black',
          time: '#000'
        }
      ],
      isTime: false,
      time: "time"
    }
  },
  methods: {
    selectTime() {
      if(!this.isSelect) {
        this.isTime = true;
        this.$emit("timeChange", this.isTime);
      }
    },
    thisTime(index) {
      this.isTime = false;
      this.$emit("timeChange", this.isTime);
      this.time = this.times[index].name;
    }
  }
}
</script>

<style scoped>
.time {
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: 2rem;
}
.time input {
  width: 60%;
  height: 40px;
  margin: 0 auto;
  border-radius: 5px;
  color: #FFF;
  text-shadow: 1px 1px 2px #000;
}
.time ul {
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
}
.time li {
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