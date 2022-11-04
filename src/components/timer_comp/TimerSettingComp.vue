<template>
  <div>
    <div class="user">
      <UserButton></UserButton>
    </div>
    <div class="community">
      <CommunityButton></CommunityButton>
    </div>
    <div class="setting">
      <input type="button" :value="selects[0].name" @touchstart="selectTime">
      <TimeChange @timeChange="changeHere" v-show="isActive === '1'"></TimeChange>
      <input type="button" :value="selects[1].name" @touchstart="selectColor">
      <ColorChange @colorChange="changeHere" v-show="isActive === '2'"></ColorChange>
      <input type="button" :value="selects[2].name" @touchstart="selectSound">
      <SoundChange @soundChange="changeHere" v-show="isActive === '3'"></SoundChange>
      <input type="button" :value="selects[3].name" @touchstart="selectStyle">
      <StyleChange @styleChange="changeHere" v-show="isActive === '4'"></StyleChange>
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
      isActive: '',
      selects: [
        {name: "Time"},
        {name: "Color"},
        {name: "Sound"},
        {name: "Style"}
      ]
    }
  },
  computed: {
    check() {
      return this.checkNum();
    }
  },
  methods: {
    checkNum() {
      return this.isActive = this.text;
    },
    mainPage(isFalse) { //メインページへ飛ぶ
      this.isFalse = isFalse;
      this.$emit("my-click", this.isFalse);
    },
    selectTime() {
      this.isActive = "1";
    },
    selectColor() {
      this.isActive = "2";
    },
    selectSound() {
      this.isActive = "3";
    },
    selectStyle() {
      this.isActive = "4";
    },
    changeHere(reset ,item) {
      console.log(reset, item);
      const i = this.isActive;
      this.isActive = reset;
      this.selects[i -1].name = item;
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
  display: flex;
  flex-direction: column;
  margin: 2rem auto 1rem;
  width: 60%;
}
.setting input {
  height: 40px;
  margin-top: 2rem;
  border-radius: 0.5rem;
}
.footer {
  position: fixed;
  bottom: 0;
  right: 0.2rem;
}
</style>


