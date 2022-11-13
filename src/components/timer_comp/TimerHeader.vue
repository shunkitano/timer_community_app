<template>
  <div class="header">
    <transition name="slide" mode="out-in">
      <div v-if="isAtherPage" class="page__info">
        <UserButton></UserButton>
        <button @touchend="makeTimer">Make</button>
        <CommunityButton></CommunityButton>
        <button @touchend="closeHeader"></button>
      </div>
      <ButtonComp1 @settingBtn="atherPage" v-else></ButtonComp1>
    </transition>         
  </div>
</template>

<script>
import ButtonComp1 from '@/components/parts_comp/ButtonComp1.vue';
import UserButton from '@/components/parts_comp/UserButton.vue';
import CommunityButton from '@/components/parts_comp/CommunityButton.vue';

export default {
  components: {
    ButtonComp1,
    UserButton,
    CommunityButton
  },
  data() {
    return {
      anim: '', //アニメーション切り替えのためにバインドしている
      isMakeTimer: false,
      isAtherPage: false
    }
  },
  methods: {
    makeTimer() {
      this.anim = "set";
      this.isMakeTimer = true;
      this.$emit('makeTimer', this.anim, this.isMakeTimer);
      this.isAtherPage = !this.isAtherPage;
    },
    atherPage() {
      this.isAtherPage = !this.isAtherPage;
    },
    closeHeader() {
      this.isAtherPage = !this.isAtherPage;
    }
  }
}
</script>

<style scoped>
.header {
  position: fixed;
  top: 0;
  right: 0;
  width: 100%;
  display: flex;
  justify-content: flex-end;
  z-index: 2;
}
.page__info {
  position: relative;
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 100vh;
}
.page__info button:nth-child(2) {
  width: 40%;
  border-radius: 40px;
  height: 60px;
  transition: 0.5s ease;
  font-size: 1.2rem;
  color: rgba(250, 250, 250, 1);
  background-color: rgba(0, 0, 0, 0.5);
  border: solid 1px rgba(250, 250, 250, 1);
  box-shadow: rgba(0, 0, 0, 1) 0px 2px 4px, rgba(240, 240, 240, 0.8) 0px -2px 4px;
}
.page__info button:active {
  width: 50%;
  height: 30px;
  border-radius: 0 0 40px 40px;
}
.page__info UserButton {
  z-index: 100;
}
.page__info CommunityButton {
  z-index: 100;
}
.page__info button:nth-child(2) {
  z-index: 100;
}
.page__info button:last-child {
  position: absolute;
  top: 60px;
  left: 0;
  width: 100%;
  height: 90vh;
  border: none;
  background-color: rgba(0, 0, 0, 0);
  z-index: 100;
}
.slide-enter-active {
  animation: slideOut 0.7s reverse ease-in;
}
.slide-leave-active {
  animation: slideOut 0.5s ease-out;
}
@keyframes slideOut {
  0% {
    opacity: 1;
    transform: translateX(0px);
  }
  50% {
    opacity: 0.8;
    width: 80%;
  }
  100% {
    opacity: 0;
    transform: translateX(100vw);
  }
}
</style>