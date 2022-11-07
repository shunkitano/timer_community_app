<template>
  <div>
    <div class="user">
      <input type="button" class="logout" value="Logout">
      <CommunityButton class="comBtn"></CommunityButton>
      <div class="header">
        <h2>{{ userName }}</h2>
      </div>
      <ul id="user__room">
        <li v-for="(timer, id) in timers" :key="id">
          {{ timer.name }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import CommunityButton from '@/components/parts_comp/CommunityButton.vue';

export default {
  
  components: {
    CommunityButton
  },
  data() {
    return {
      timers: [],
      userName: 'User',
      isSetting: false,
      isTrue: true
    }
  },
  mounted() {
    return this.timers = this.$store.state.timers;
  },
  methods: {
    toUserSetting() {
      this.isSetting = !this.isSetting;
    },
    selectTimer() {
      this.$router.push('/top');
      this.$emit("my-click", this.isTrue)
    }
  }
}
</script>

<style scoped>
.user {
  position: relative;
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: rgb(217, 217, 217);
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
  font-size: 1rem;
  height: 60px;
  line-height: 60px;
  text-align: center;
  width: 160px;
  background-color: rgba(240, 240, 240, 1);
  border: solid 1px rgba(0, 0, 0, 1);
  border-radius: 40px;
}
.user .comBtn {
  position: absolute;
  top: 0;
  right: 0;
  z-index: 100;
}
.user .logout {
  position: absolute;
  top: 0;
  left: 0;
  width: 80px;
  height: 60px;
  border: solid 1px rgba(0, 0, 0, 1);
  border-radius: 40px;
  background-color: rgb(220, 220, 220);
  margin-left: 1rem;
  z-index: 100;
}
/* TimerRoom */
#user__room {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-top: 70px;
}
#user__room li {
  text-align: center;
  list-style: none;
  margin: 0 auto;
}
</style>