<template>
  <div class="community">
    <button  @touchend="communityRoom">Community</button>
  </div>
</template>

<script>
export default {
  methods: {
    communityRoom() {
      this.$router.push('/community')
    }
  }
}
</script>

<style scoped>
.community {
  position: relative;
  display: flex;
  justify-content: center;
  width: 30%;
  height: 60px;
  text-align: center;
}
.community button {
  font-size: 1.2rem;
  width: 90%;
  color: #FFF;
  border: solid 1px rgba(250, 250, 250, 1);
  background-color: #000;
  border-radius: 40px;
  transition: 1s ease;
}
.community button:active {
  font-size: 1.6rem;
  margin-left: 200px;
  border-radius: 40px 0 0 40px;
  border-right: none;
}
</style>