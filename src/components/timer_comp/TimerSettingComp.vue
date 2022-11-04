<template>
  <div>
    <div class="user">
      <UserButton></UserButton>
    </div>
    <div class="community">
      <CommunityButton></CommunityButton>
    </div>
    <div class="setting">
      <TimeChange @touchstart="style" :isSelect="selecting" @timeChange="changeHere"></TimeChange>
      <ColorChange @touchstart="color" :isSelect="selecting" @colorChange="changeHere"></ColorChange>
      <SoundChange @touchstart="sound" :isSelect="selecting" @soundChange="changeHere"></SoundChange>
      <StyleChange @touchstart="style" :isSelect="selecting" @styleChange="changeHere"></StyleChange>
    </div>
    <div class="footer">
      <ButtonComp2 @my-click="mainPage"></ButtonComp2>
    </div>
  </div>
</template>

<script>
import ButtonComp2 from '@/components/parts_comp/ButtonComp2.vue';
import UserButton from '@/components/parts_comp/UserButton.vue';
import CommunityButton from '@/components/parts_comp/CommunityButton.vue';
import ColorChange from '@/components/parts_comp/ColorChange.vue';
import SoundChange from '@/components/parts_comp/SoundChange.vue';
import StyleChange from '@/components/parts_comp/StyleChange.vue';
import TimeChange from '@/components/parts_comp/TimeChange.vue';

export default {
  components: {
    ButtonComp2,
    UserButton,
    CommunityButton,
    ColorChange,
    SoundChange,
    StyleChange,
    TimeChange
  },
  data() {
    return {
      isFalse: false,
      selecting: false
    }
  },
  methods: {
    mainPage(isFalse) {
      this.isFalse = isFalse;
      this.$emit("my-click", this.isFalse);
    },
    color() {
      console.log("color");
    },
    sound() {

    },
    style() {

    },
    changeHere(select) {
      this.selecting = select;
      console.log(this.selecting);
    }
  }
}
</script>

<style>
.user {
  margin-top: 1rem;

}
.community {
  margin-top: 1rem;
}
.setting {
  margin-top: 4rem;
}
.footer {
  position: fixed;
  bottom: 0;
  right: 0.2rem;
}
</style>


