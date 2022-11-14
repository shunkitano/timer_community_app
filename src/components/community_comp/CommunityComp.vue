<template>
  <div class="community">
    <UserButton class="userBtn"></UserButton>
    <div class="header">
      <h2>Community</h2>
    </div>
    <ul id="community_room">
      <li v-for="(timer, id) in timers" :key="id">
        {{ timer.name }}
      </li>
    </ul>
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
      timers: []
    }
  },
  methods: {
    selectTimer() {

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
  /* background-color: rgb(217, 217, 217); */
}
/* header */
.header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.header h2 {
  line-height: 60px;
  font-size: 1rem;
  height: 60px;
  text-align: center;
  width: 160px;
  color: rgba(250, 250, 250, 1);
  background-color: rgba(0, 0, 0, 1);
  border: solid 1px rgba(250, 250, 250, 1);
  border-radius: 40px;
}
.community .userBtn {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 100;
}
/* CommunityRoom */
#community_room {
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 60px;
}
</style>
