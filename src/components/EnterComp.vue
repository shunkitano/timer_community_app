<template>
  <div class="enter">
    <ul>
      <li v-for="text in texts" :key="text">
        {{ text }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      texts: [
        "つな",
        "がる",
        "タイマー"
      ]
    }
  }
}
</script>

<style scoped>
.enter {
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  background-color: #EEE;
  /* animation: enterin 2.5s ease-out; */
}
.enter li {
  font-size: 2rem;
  color: goldenrod;
  display: inline;
  font-family: "Nico Moji";
}
.enter li {
  width: 100px;
  animation: enterin 2.5s ease-out;
}
@keyframes enterin {
  0% {
    opacity: 0;
    width: 200%;
    margin-left: -20px;
    margin-right: 30px;
    color: goldenrod;
  }
  50% {
    opacity: 0.5;
    width: 150%;
    margin-left: 20px;
    margin-right: 10px;
     color: goldenrod;
  }
  100% {
    width: 0%;
    margin-left: 0px;
    margin-right: 0px;
     color: goldenrod;
  }
}
</style>
