<template>
  <div class="community">
    <button  @touchstart="communityRoom">Community</button>
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
  height: 60px;
  text-align: center;
}
.community button {
  font-size: 1.2rem;
  width: 60%;
  color: #FFF;
  background-color: #000;
  border-radius: 40px;
  transition: 1s ease;
}
.community button:hover {
  font-size: 1.6rem;
  margin-left: 200px;
  border-radius: 40px 0 0 40px;
  border-right: none;
}
</style>