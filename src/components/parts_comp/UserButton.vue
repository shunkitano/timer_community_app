<template>
  <div class="user">
    <button @touchstart="userRoom">User</button>
  </div>
</template>

<script>
export default {
  methods: {
    userRoom() {
      this.$router.push('/user')
    }
  }
}
</script>

<style scoped>
.user {
  position: relative;
  display: flex;
  justify-content: center;
  height: 60px;
  text-align: center;
}
.user button {
  font-size: 1.2rem;
  width: 60%;
  background-color: #FFF;
  border: solid 1px #000;
  border-radius: 40px;
  transition: 1s ease;
}
.user button:hover {
  font-size: 1.6rem;
  margin-right: 200px;
  border-radius: 0 40px 40px 0;
  border-left: none;
}
</style>