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
        "つな",
        "がる",
        "タイマー"
      ],
      time:'',
      count: 4,
      isShow: false,
      isSignUp: false,
      isClose: true
    }
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
        this.isClose = false;
      }
    },
    closeBox(isClose) {
      this.isClose = isClose;
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
  text-align: center;
  background-color: #EEE;
}
.enter li {
  font-size: 2rem;
  color: goldenrod;
  display: inline;
  font-family: "Nico Moji";
}
.enter li {
  width: 100px;
  animation: enterin 3s ease-out;
}
@keyframes enterin {
  0% {
    opacity: 0;
    width: 200%;
    margin-left: -20px;
    margin-right: 30px;
    color: goldenrod;
  }
  50% {
    opacity: 0.5;
    width: 150%;
    margin-left: 20px;
    margin-right: 10px;
    color: goldenrod;
  }
  100% {
    width: 0%;
    margin-left: 0px;
    margin-right: 0px;
    color: goldenrod;
  }
}
.top-enter-active {
  animation: comeIn 1s;
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
