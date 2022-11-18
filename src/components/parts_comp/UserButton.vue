<template>
  <div class="user">
    <button @touchend="userRoom" class="nico">User</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isUser:false
    }
  },
  methods: {
    userRoom() {
      if(!this.isUser) {
        this.$router.push('/user');
      }
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
  width: 80%;
  background-color: rgba(240, 240, 240, 1);
  border: solid 1px rgba(0, 0, 0, 1);
  border-radius: 40px;
  /* transition: 1s ease; */
  box-shadow: 0px 2px 4px, rgba(240, 240, 240, 0.8) 0px -2px 4px;
}
/* .user button:active {
  font-size: 1.6rem;
  margin-right: 200px;
  border-radius: 0 40px 40px 0;
  border-left: none;
} */
</style>