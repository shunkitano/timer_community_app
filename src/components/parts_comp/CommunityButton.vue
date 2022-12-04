<template>
  <div class="community">
    <button @touchend="communityRoom" class="nico">COM</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isCom:false
    }
  },
  methods: {
    communityRoom() {
      if(!this.isCom) {
        this.$router.push('/community');
      }
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
  width: 80%;
  color: #FFF;
  border: solid 1px rgba(250, 250, 250, 0.8);
  background-color: rgba(0, 0, 0, 0.8);
  border-radius: 40px;
  transition: 0.5s ease;
  box-shadow: rgba(0, 0, 0, 1) 0px 2px 4px, rgba(240, 240, 240, 0.8) 0px -2px 4px;
}
.community button:active {
  font-size: 0.6rem;
  margin-left: 100px;
  border-radius: 40px 0 0 40px;
  border-right: none;
}
</style>