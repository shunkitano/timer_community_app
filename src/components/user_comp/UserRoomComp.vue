<template>
  <div class="user__room">
    <div class="header" :class="{to__use:toUse}">
      <input type="button" class="logout nico" value="Logout" @touchstart="beforeLogOut" @touchend="logOut" :class="{before__logout:isLogOut}">
      <h2 class="nico" @touchstart="useTimer" @touchend="toTop">{{!toUse? "user:" + userName : "MEASURE"}}</h2>
      <CommunityButton class="comBtn"></CommunityButton>
    </div>
    <ul id="timers">
      <li v-for="(timer, index) in lineUpTimers" :key="index">
        <div class="timer" :class="{deleted:isCut && isId === index, nico:timer.style === 'digital', merriweather:timer.style === 'chronograph', quick:timer.style === 'circle'}">
          <div :style="{'background-color': timer.themeColor}" :class="timer.style" class="timer__time"  @touchstart="selectTimer(index)">
            <p :style="{'color': timer.accentColor}">{{ ((timer.time - timer.time%360000) / 360000) >= 10 ? (timer.time - timer.time%360000) / 360000 : "0" + ((timer.time - timer.time%360000) / 360000) }}</p>
            <p :style="{'color': timer.accentColor}">:</p>
            <p :style="{'color': timer.accentColor}">{{ ((timer.time%360000 - timer.time%6000 ) / 6000) >= 10 ? (timer.time%360000 - timer.time%6000 ) / 6000 : "0" + ((timer.time%360000 - timer.time%6000 ) / 6000) }}</p>
            <p :style="{'color': timer.accentColor}">:</p>
            <p :style="{'color': timer.accentColor}">{{ timer.time%6000 /100  >= 10 ? timer.time%6000 /100  : "0" + timer.time%6000 /100 }}</p>
          </div>
          <p class="timer__name" :class="{add__com:isCom && isId === index, return__com:!isCom && isId === index}">{{ timer.name }}</p>
          <OpenCloseButton class="open__close" @open-close="openClose" :childEdit="isEdit" :childIndex="index"></OpenCloseButton>
        </div>
        <transition name="fade">
          <div class="edit" v-if="isEdit && isId === index">
            <WitchButton text1="private" text2='community' @is-left="putPrivate" @is-right="putCom" :childIndex="index" :useOnly="timer.useOnly"></WitchButton>
            <CutButton @before-cut="beforeCut" @cut-item="deleteTimer" :childIndex="index"></CutButton>
          </div><!--edit-->
        </transition>
      </li>
    </ul><!--timers-->
  </div>
</template>

<script>
import CommunityButton from '@/components/parts_comp/CommunityButton.vue';
import WitchButton from '@/components/parts_comp/WitchButton.vue';
import CutButton from '@/components/parts_comp/CutButton.vue';
import OpenCloseButton from '@/components/parts_comp/OpenCloseButton.vue';
import firebaseApp from '@/firebase/firebase.js';
import { getAuth, signOut } from "firebase/auth";

const auth = getAuth(firebaseApp);

export default {
  
  components: {
    CommunityButton,
    WitchButton,
    CutButton,
    OpenCloseButton
  },
  data() {
    return {
      userName: '',
      isTrue: true,
      isEdit: false,
      isCut: false,
      isId: null,
      toUse: false,
      isLogOut: false
    }
  },
  async mounted() {
    await this.$store.dispatch('fetchUserId');
    await this.$store.dispatch('fetchDatas');
    await this.$store.dispatch('fetchUser');
    const getUserName = this.$store.state.users;
    getUserName.forEach((user) => {
      if(user.userId === this.$store.state.uid) {
        this.userName = user.name;
      }
    })
  },
  computed: {
    lineUpTimers() {
      return this.$store.state.fetchTimers;
    },
    isCom() {
      return this.isId ? this.$store.state.fetchTimers[this.isId].isCom : true;
    }
  },
  methods: {
    useTimer() {
      this.toUse = true;
    },
    toTop() {
      this.$router.push('/top');
    },
    fetchDatas() { //データ削除後の画面更新
      this.$store.dispatch('fetchDatas');
    },
    selectTimer(index) { //書き直し
      if(!this.isEdit) {
        console.log(index);
        this.$store.commit('selectTimer',{index});
      this.$router.push('/top');
      } 
    },
    beforeLogOut() {
      this.isLogOut = true;
    },
    logOut() {
      signOut(auth).then(() => {
        console.log("Sign-out successful");
        this.$router.push('/');
      })
      .catch((error) => {
        console.log("An error happened", `${error}`)
      })
    },
    openClose(isOpen, index) {
      this.isEdit = isOpen;
      this.isId = index;
    },
    putPrivate(childId, isThis) { //プライベイトにする
      console.log(childId, isThis);
      // this.isCom = isThis;
      this.$store.commit('putPrivate', {
        id: childId,
        privateCom: isThis,
      })
    },
    putCom(childId, isThis) { //コミュニティに公開する
      console.log(childId, isThis);
      // this.isCom = isThis;
      this.$store.commit('putCom', {
        id: childId,
        privateCom: isThis,
      })
    },
    async deleteTimer(isId) { //タイマーを削除する
      console.log(isId);
      await this.$store.commit('deleteTimer', {
        id: isId,
      })
      this.isCut = false;
      this.isEdit = !this.isEdit;
      this.fetchDatas();
    },
    beforeCut(isCut) {
      this.isCut = isCut;
    }
  }
}
</script>

<style scoped>
.user__room {
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.user__room .comBtn {
  position: absolute;
  top: 0;
  right: 0;
  z-index: 100;
}
.user__room .logout {
  position: absolute;
  top: 0;
  left: 0;
  width: 80px;
  height: 60px;
  margin-left: 1rem;
  z-index: 100;
  font-size: 1rem;
  color: rgba(250, 250, 250, 0.8);
  background-color: rgba(125, 125, 125, 0.8);
  border: solid 1px rgba(250, 250, 250, 1);
  border-radius: 40px;
  box-shadow: rgba(0, 0, 0, 1) 0px 2px 4px, rgba(240, 240, 240, 0.8) 0px -2px 4px;
}
.user__room .before__logout {
  animation: inflate 0.5s ease;
}
@keyframes inflate {
  0% {
    scale: 1;
  }
  100% {
    opacity: 0;
    scale: 1.5;
  }
}
/* header */
.header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100px;
  display: flex;
  justify-content: center;
  z-index: 1;
  background: linear-gradient(rgba(230, 230, 230, 1) 40%, rgba(230, 230, 230, 0));
}
.header h2 {
  font-size: 1.2rem;
  height: 60px;
  line-height: 60px;
  text-align: center;
  width: 160px;
  background-color: rgba(240, 240, 240, 0.8);
  border: solid 1px rgba(0, 0, 0, 0.8);
  border-radius: 40px;
  box-shadow: 0px 2px 4px, rgba(240, 240, 240, 0.8) 0px -2px 4px;
}
.to__use h2 {
  animation: vanish 0.5s ease;
}
@keyframes vanish {
  0% {
    scale: 1;
  }
  100% {
    font-size: 0.6rem;
    scale: 0.5;
  }
}
/* Timers */
#timers {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding-top: 5rem;
  padding-bottom: 2rem;
}
#timers li {
  list-style: none;
  width: 80%;
  display: flex;
  align-items: center;
  text-align: center;
  flex-direction: column;
  margin: 1.5rem auto 0;
  overflow: hidden;
}
.timer {
  width: 100%;
  display: flex;
  align-items: center;
  background-color: rgba(20, 20, 20, 0.1);
  border-radius: 10px;
}
.timer__time {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  width: 80px;
  height: 80px;
  margin-right: 0.5rem;
  padding: 1rem;
  border: solid 0.5px rgba(20, 20, 20, 0.8);
}
.timer__time p {
  
  font-size: 14px;
  font-weight: bold;
  color: rgba(0, 0, 0, 1);
  -webkit-text-stroke: 0.1px rgba(250, 250, 250, 1);
  text-shadow:rgba(0, 0, 0, 0.8) 1px 2px 3px;
}
.timer__name {
  padding: 1rem;
  background-color: rgba(250, 250, 250, 0.8);
  border-radius: 20px;
  width: 100%;
  overflow: scroll;
}
.add__com {
  animation: addCom 0.5s ease;
}
@keyframes addCom {
  0% {
    color: rgba(250, 250, 250, 0.8);
    background: linear-gradient(0.25turn, rgba(0, 0, 0, 1), rgba(250, 250, 250, 0.8));
  }
  10% {
    color: rgba(250, 250, 250, 0.8);
    background: linear-gradient(0.25turn, rgba(250, 250, 250, 0.8), rgba(0, 0, 0, 1) 10%, rgba(0, 0, 0, 1));
  }
  20% {
    color: rgba(250, 250, 250, 0.8);
    background: linear-gradient(0.25turn, rgba(250, 250, 250, 0.8), rgba(0, 0, 0, 1) 20%, rgba(0, 0, 0, 1));
  }
  30% {
    color: rgba(250, 250, 250, 0.8);
    background: linear-gradient(0.25turn, rgba(250, 250, 250, 0.8), rgba(0, 0, 0, 1) 30%, rgba(0, 0, 0, 1));
  }
  40% {
    color: rgba(250, 250, 250, 0.8);
    background: linear-gradient(0.25turn, rgba(250, 250, 250, 0.8), rgba(0, 0, 0, 1) 40%, rgba(0, 0, 0, 1));
  }
  50% {
    color: rgba(250, 250, 250, 0.8);
    background: linear-gradient(0.25turn, rgba(250, 250, 250, 0.8), rgba(0, 0, 0, 1), rgba(0, 0, 0, 1));
  }
  60% {
    color: rgba(250, 250, 250, 0.8);
    background: linear-gradient(0.25turn, rgba(250, 250, 250, 0.8), rgba(0, 0, 0, 1) 60%, rgba(0, 0, 0, 1));
  }
  70% {
    color: rgba(250, 250, 250, 0.8);
    background: linear-gradient(0.25turn, rgba(250, 250, 250, 0.8), rgba(0, 0, 0, 1) 70%, rgba(0, 0, 0, 1));
  }
  80% {
    color: rgba(250, 250, 250, 0.8);
    background: linear-gradient(0.25turn, rgba(250, 250, 250, 0.8), rgba(0, 0, 0, 1) 80%, rgba(0, 0, 0, 1));
  }
  90% {
    color: rgba(250, 250, 250, 0.8);
    background: linear-gradient(0.25turn, rgba(250, 250, 250, 0.8), rgba(0, 0, 0, 1) 90%, rgba(0, 0, 0, 1));
  }
  100% {
    color: rgba(250, 250, 250, 0.8);
    background: linear-gradient(0.25turn, rgba(250, 250, 250, 0.8), rgba(0, 0, 0, 1));
  }
}
.return__com {
  animation: returnCom 0.5s ease;
}
@keyframes returnCom {
  0% {
    color: rgba(250, 250, 250, 0.8);
    background: linear-gradient(0.25turn, rgba(0, 0, 0, 1), rgba(250, 250, 250, 0.8));
  }
  10% {
    color: rgba(250, 250, 250, 0.8);
    background: linear-gradient(0.25turn, rgba(250, 250, 250, 0.8), rgba(250, 250, 250, 0.8) 90%, rgba(0, 0, 0, 1));
  }
  20% {
    color: rgba(250, 250, 250, 0.8);
    background: linear-gradient(0.25turn, rgba(250, 250, 250, 0.8), rgba(250, 250, 250, 0.8) 80%, rgba(0, 0, 0, 1));
  }
  30% {
    color: rgba(250, 250, 250, 0.8);
    background: linear-gradient(0.25turn, rgba(250, 250, 250, 0.8), rgba(250, 250, 250, 0.8) 70%, rgba(0, 0, 0, 1));
  }
  40% {
    color: rgba(250, 250, 250, 0.8);
    background: linear-gradient(0.25turn, rgba(250, 250, 250, 0.8), rgba(250, 250, 250, 0.8) 60%, rgba(0, 0, 0, 1));
  }
  50% {
    color: rgba(250, 250, 250, 0.8);
    background: linear-gradient(0.25turn, rgba(250, 250, 250, 0.8), rgba(250, 250, 250, 0.8), rgba(0, 0, 0, 1));
  }
  60% {
    color: rgba(250, 250, 250, 0.8);
    background: linear-gradient(0.25turn, rgba(250, 250, 250, 0.8), rgba(250, 250, 250, 0.8) 40%, rgba(0, 0, 0, 1));
  }
  70% {
    color: rgba(250, 250, 250, 0.8);
    background: linear-gradient(0.25turn, rgba(250, 250, 250, 0.8), rgba(250, 250, 250, 0.8) 30%, rgba(0, 0, 0, 1));
  }
  80% {
    color: rgba(250, 250, 250, 0.8);
    background: linear-gradient(0.25turn, rgba(250, 250, 250, 0.8), rgba(250, 250, 250, 0.8) 20%, rgba(0, 0, 0, 1));
  }
  90% {
    color: rgba(250, 250, 250, 0.8);
    background: linear-gradient(0.25turn, rgba(250, 250, 250, 0.8), rgba(250, 250, 250, 0.8) 10%, rgba(0, 0, 0, 1));
  }
  100% {
    color: rgba(250, 250, 250, 0.8);
    background: linear-gradient(0.25turn, rgba(250, 250, 250, 0.8), rgba(0, 0, 0, 1));
  }
}
.open__close {
  margin-left: 0.5rem;
  margin-right: 0.5rem;
  padding-top: 20px;
}
.digital {
  border-radius: 10px;
}
.chronograph {
  border-radius: 30px;
}
.circle {
  position: relative;
  border-radius: 50%;
  z-index: 1;
}
.circle::before {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  content: '';
  width: 60px;
  height: 60px;
  border-radius: 50%;
  backdrop-filter: brightness(70%);
  z-index: -1;
}
.edit {
  display: flex;
  align-items: center;
  width: 100%;
  padding: 0.5rem;
}
.fade-enter-active {
  animation: comeOut 0.5s ease;
}
.fade-leave-active {
  animation: comeOut 0.5s ease reverse;
}
@keyframes comeOut {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>