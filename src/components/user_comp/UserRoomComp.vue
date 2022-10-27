<template>
  <div class="user">
    <div class="header">
      <button @click="toUserSetting">設定</button>
      <h2>{{ userName }}</h2>
      <button @click="toCommunity">Community</button>
    </div>
    <div id="timer_room">
      <button class="timer" @click="selectTimer()"></button>
    </div><!--timer_room-->
    <UserSettingComp v-show="isSetting" class="setting"></UserSettingComp>
  </div>
</template>

<script>
import UserSettingComp from '@/components/user_comp/UserSettingComp.vue';

export default {
  components: {
    UserSettingComp,
  },
  data() {
    return {
      userName: 'Who',
      isSetting: false,
    }
  },
  methods: {
    toUserSetting() {
      this.isSetting = !this.isSetting;
    },
    toCommunity() {
      this.$router.push('/community');
    },
    selectTimer() {
      this.$router.push('/');
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
.header button:first-child {
  position: absolute;
  top: 1rem;
  left: 1rem;
}
.header h2 {
  font-size: 1.8rem;
  height: 50px;
  text-align: center;
  width: 80%;
  background-color: ghostwhite;
  border: solid 1px gray;
  border-radius: 2rem;
  padding-left: 2.5rem;
}
.header button {
  width: 20%;
  height: 50px;
  border-radius: 2rem;
  border: solid 1px gray;
  background-color: ghostwhite;
}
/* TimerRoom */
#timer_room {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  margin: 0 auto;
}
#timer_room .timer {
  width: 150px;
  height: 150px;
  margin: 1rem;
  border-radius: 50%;
}

/* UserSetting */
.user .setting {
  display: block;
  width: 80%;
  height: 80%;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  background-color: ghostwhite;
}
</style>