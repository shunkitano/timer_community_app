<template>
  <div class="user">
    <button @touchend="userRoom">User</button>
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
  width: 30%;
  height: 60px;
  text-align: center;
}
.user button {
  font-size: 1.2rem;
  width: 80px;
  background-color: rgba(240, 240, 240, 1);
  border: solid 1px rgba(0, 0, 0, 1);
  border-radius: 40px;
  transition: 1s ease;
}
.user button:active {
  font-size: 1.6rem;
  margin-right: 200px;
  border-radius: 0 40px 40px 0;
  border-left: none;
}
</style>