<template>
  <div>
    <transition name="top" mode="out-in">
      <div class="enter" v-show="isShow">
        <ul>
          <li v-for="text in texts" :key="text">
            {{ text }}
          </li>
        </ul>
        <div v-show="!isClose" class="box">
          <transition name="slide" mode="out-in">
            <LoginComp v-if="isSignUp"  @my-click='isSignUp = $event' @my-click2='closeBox'></LoginComp>
            <SignUpComp v-else @my-click='isSignUp = $event'  @my-click2='closeBox'></SignUpComp>
          </transition>
        </div>
      </div><!--enter-->
    </transition>
  </div>
</template>

<script>
import LoginComp from '@/components/LoginComp.vue';
import SignUpComp from '@/components/SignUpComp.vue';

export default {
  components: {
    LoginComp,
    SignUpComp
  },
  beforeRouteLeave (to, from, next) {
    this.isShow = false;
    setTimeout(() => {
      console.log('enter:beforeRouteLeave');
      next();
    }, 1500);
  },
  data() {
    return {
      texts: [
        "つ な",
        "が る",
        "タ イ マ ー"
      ],
      time:'',
      count: 4,
      isShow: false,
      isSignUp: true,
      isClose: true
    }
  },
  async created() {
    await this.$store.dispatch('fetchUserId');
  },
  mounted() {
    this.isShow = true;
    this.time = setInterval(() => {this.enterPage()}, 1000);
  },
  methods: {
    enterPage() {
      if(this.count>0) {
        this.count--;
        console.log(this.count);
      } else if(this.count === 0) {
        clearInterval(this.time);
        if(this.$store.state.uid === null) {
          this.isClose = false;
        } else {
          // this.$store.dispatch('fetchDatas');
          // this.$store.dispatch('fetchCommunityDatas');
          this.$router.push('top');
        }
      }
    },
    closeBox(isClose) {
      this.isClose = isClose;
      // await this.$store.dispatch('fetchDatas');
      // this.$store.dispatch('fetchCommunityDatas');
      this.$router.push('/top');
    }
  }
}
</script>

<style scoped>
.enter {
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #EEE;
}
.enter ul {
  width: 100%;
  text-align: center;
  text-align: center;
  animation: enterDown 2s ease;
}
.enter li {
  margin: auto;
  font-size: 2rem;
  color: goldenrod;
  display: inline;
  font-family: "Nico Moji";
  width: 100px;
  align-items: center;
  animation: enterin 2.5s ease;
}
@keyframes enterDown {
  0% {
    height: 100vh;
  }
  40% {
    height: 0vh;
  }
  60% {
    height: 30vh;
  }
  70% {
    height: 0vh;
  }
  80% {
    height: 20vh;
  }
  90% {
    height: 0vh;
  }
  95% {
    height: 5vh;
  }
  100% {
    height: 0vh;
  }
}
@keyframes enterin {
  0% {
    opacity: 0;
    margin-left: -5px;
    margin-right: 5px;
    color: goldenrod;
  }
  50% {
    opacity: 0.5;
    margin-left: 10px;
    margin-right: -10px;
    color: goldenrod;
  }
  75% {
    opacity: 0.8;
    margin-left: -5px;
    margin-right: 5px;
    color: goldenrod;
  }
  100% {
    margin-left: 0px;
    margin-right: 0px;
    color: goldenrod;
  }
}
.top-enter-active {
  animation: comeIn 1.5s;
}
.top-leave-active {
  animation: comeIn 1.5s reverse;
}
@keyframes comeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
.box {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
.slide-enter-active {
  animation: slideIn 0.5s;
}
.slide-leave-active {
  animation: slideIn 0.5s reverse;
}
@keyframes slideIn {
  0% {
    opacity: 0;
    transform: rotateY(90deg);
    scale: 0.7;
  }
  100% {
    opacity: 1;
    transform: rotateY(0deg);
  }
}
</style>
