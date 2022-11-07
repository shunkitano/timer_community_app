<template>
  <div class="community">
    <div class="header">
      <UserButton @click="toUserRoom"></UserButton>
      <h2>Community</h2>
    </div>
    <div id="community_room">
      <button class="timer" @click="selectTimer()"></button>
    </div><!--timer_room-->
  </div>
</template>

<script>
import UserButton from '@/components/parts_comp/UserButton.vue'

export default {
  components: {
    UserButton
  },
  data() {
    return {
      userName: 'Who',
    }
  },
  methods: {
    toUserRoom() {
      this.$router.push('/user');
    }
  }
}
</script>

<style scoped>
.community {
  position: relative;
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
/* header */
.header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 1rem;
  align-items: center;
  gap: 1rem;
}
.header button {
  width: 20%;
  height: 50px;
  border-radius: 2rem;
  border: solid 1px gray;
  background-color: ghostwhite;
}
.header h2 {
  font-size: 1.8rem;
  height: 60px;
  text-align: center;
  width: 80%;
  background-color: ghostwhite;
  border: solid 1px gray;
  border-radius: 2rem;
}
/* CommunityRoom */
#community_room {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  margin: 0 auto;
}
#community_room .timer {
  width: 150px;
  height: 150px;
  margin: 1rem;
  border-radius: 50%;
}
</style>
