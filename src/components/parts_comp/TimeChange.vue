<template>
  <div class="time">
    <ul>
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
          name: 'time1',
          time: ''
        },
        {
          name: 'time2',
          time: ''
        },
        {
          name: 'time3',
          time: ''
        }
      ],
      time: "time",
      text: "time"
    }
  },
  methods: {
    thisTime(index) {
      const reset = "";
      this.time = this.times[index].name;
      this.$emit("timeChange", reset, this.time);
    }
  }
}
</script>

<style scoped>
.time {
  display: flex;
  flex-direction: column;
  justify-content: center;
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
  list-style: none;
  animation: look 1.5s;
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