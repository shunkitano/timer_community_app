<template>
  <div>
    <transition name="slide">
      <div class="user">
        <div class="header">
          <h2>{{ userName }}</h2>
        </div>
        <div id="timer_room">
          <button class="timer" @click="selectTimer()"></button>
        </div><!--timer_room-->
        <UserSettingComp v-show="isSetting" class="setting"></UserSettingComp>
      </div>
    </transition>
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
      userName: 'User',
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
.slide-enter-active {
  animation: slideIn 2s;
}
.slide-leave-active {
  animation: slideIn 2s reverse;
}
@keyframes slideIn {
  0% {
    transform: translateX(-380px);
  }
  100% {
    transform: translateX(0px);
  }
}
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
  justify-content: center;
  padding-top: 1rem;
  align-items: center;
}
.header h2 {
  font-size: 1.8rem;
  height: 60px;
  text-align: center;
  width: 60%;
  background-color: ghostwhite;
  border: solid 1px gray;
  border-radius: 40px;
  animation: slide 1s ease;
}
@keyframes slide {
  0% {
    border-right: none;
    border-radius: 40px 0 0 40px;
    margin-left: 40%;
  }
}

.header button {
  width: 20%;
  height: 40px;
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