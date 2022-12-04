<template>
  <div>
    <transition name="top" mode="out-in">
      <div class="enter" v-show="isShow">
        <transition name="enter" mode="out-in">
          <ul  v-show="isShow">
            <li v-for="text in sortedTexts" :key="text.id" :style="{color:text.color}" v-show="isAll && text.id < number || text.contain===true">
              {{ text.text }}
            </li>
          </ul>
        </transition>
        <transition name="fade" mode="out-in">
        <div v-show="!isClose" class="box">
          <transition name="fade" mode="out-in">
            <LoginComp v-if="isSignUp"  @my-click='isSignUp = $event' @my-click2='closeBox'></LoginComp>
            <SignUpComp v-else @my-click='isSignUp = $event'  @my-click2='closeBox'></SignUpComp>
          </transition>
        </div>
        </transition>
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
    this.isClose = true;
    this.isShow = false;
    setTimeout(() => {
      console.log('enter:beforeRouteLeave');
      next();
    }, 2000);
  },
  data() {
    return {
      texts: [
        {
          id: 4,
          text: "m",
          color: "rgba(0, 0, 0, 0.8)",
          contain: true,
        },
        {
          id: 7,
          text: "ake ",
          color: "rgba(100, 100, 100, 0.8)",
          contain: false,
        },
        { 
          id: 13,
          text: "s",
          color: "rgba(0, 0, 0, 0)",
          contain: false,
        },
        { 
          id: 5,
          text: "me",
          color: "rgba(0, 0, 0, 0.8)",
          contain: true,
          
        },
        {
          id: 9,
          text: "asu",
          color: "rgba(100, 100, 100, 0.8)",
          contain: false,
          
        },
        {
          id: 6,
          text: "r",
          color: "rgba(0, 0, 0, 0.8)",
          contain: true,
        },
        {
          id: 11,
          text: "e",
          color: "rgba(100, 100, 100, 0.8)",
          contain: false,
        },
        { 
          id: 14,
          text: "s",
          color: "rgba(0, 0, 0, 0)",
          contain: false,
        },
        {
          id: 8,
          text: "co",
          color: "rgba(100, 100, 100, 0.8)",
          contain: false,
          
        },
        {
          id: 3,
          text: "m",
          color: "rgba(0, 0, 0, 0.8)",
          contain: true,
          
        },
        {
          id: 10,
          text: "mun",
          color: "rgba(100, 100, 100, 0.8)",
          contain: false,
          
        },
        {
          id: 2,
          text: "i",
          color: "rgba(0, 0, 0, 0.8)",
          contain: true,
          
        },
        {
          id: 1,
          text: "t",
          color: "rgba(0, 0, 0, 0.8)",
          contain: true,
          
        },
        {
          id: 12,
          text: "y",
          color: "rgba(100, 100, 100, 0.8)",
          contain: false,
          
        }
      ],
      time:'',
      count: 16,
      isShow: false,
      isSignUp: true,
      isClose: true,
      isAll: true,
      number: 15,
    }
  },
  async created() {
    await this.$store.dispatch('fetchUserId');
  },
  mounted() {
    this.isShow = true;
    this.time = setInterval(() => {this.enterPage()}, 250);
  },
  computed: {
    sortedTexts() {
      return this.sortedBox();
    }
  },
  methods: {
    enterPage() {
      if(this.count>0) {
        this.count--;
        if(this.count<11 && this.count>2) {
          this.number --;
        }
        if(this.count===1) {
          this.isAll = false;
        }
      } else if(this.count === 0) {
        clearInterval(this.time);
        if(this.$store.state.uid === null) {
          this.isClose = false;
        } else {
          this.$router.push('top');
        }
      }
    },
    closeBox(isClose) {
      this.isClose = isClose;
      this.$router.push('/top');
    },
    sortedBox() {
      if(this.isAll) {
        return this.texts;
      } else if(!this.isAll) {
        return this.texts.sort((a,b) => a.id - b.id);
      }
    }
  }
}
</script>

<style scoped>
.enter {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: #EEE;
}
.enter ul {
  width: 80%;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: center;
  margin: auto;
}
.enter li {
  list-style: none;
  font-size: 2rem;
  color: rgba(0, 0, 0, 1);
  font-family: "Nico Moji";
}
.enter-enter-active {
  animation: enterLeft 1s ease-in;
}
.enter-leave-active {
  animation: outRight 3s ease-out;
}
@keyframes enterLeft {
  0% {
    transform: translateX(-100vh);
  }
  50% {
    transform: translateX(3vh);
  }
  80% {
    transform: translateX(5vh);
  }
  100% {
    transform: translateX(0);
  }
}
@keyframes outRight {
  0% {
    transform: translateX(0);
    background: linear-gradient(90deg,rgba(255, 100, 0, 0.8),rgba(0, 255, 4, 0.8),rgba(190, 255, 255, 0.8),rgba(0, 50, 200, 0.7),rgba(200, 200, 200, 0.3),rgba(100, 100, 100, 0.8),rgba(220, 10, 5, 0.8),rgba(20, 20, 20, 0.8));
    background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  20% {
    transform: translateX(-5vh);
    background: linear-gradient(45deg,rgba(255, 100, 0, 0.8),rgba(0, 255, 4, 0.8),rgba(190, 255, 255, 0.8),rgba(0, 50, 200, 0.7),rgba(200, 200, 200, 0.3),rgba(220, 10, 5, 0.8),rgba(100, 100, 100, 0.8),rgba(20, 20, 20, 0.8));
    background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  30% {
    transform: translateX(-7vh);
    background: linear-gradient(-90deg, rgba(220, 10, 5, 0.8),rgba(255, 100, 0, 0.8),rgba(0, 255, 4, 0.8),rgba(190, 255, 255, 0.8),rgba(0, 50, 200, 0.7),rgba(220, 10, 5, 0.8),rgba(200, 200, 200, 0.3),rgba(100, 100, 100, 0.8),rgba(20, 20, 20, 0.8));
    background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  35% {
    transform: translateX(0vh);
    background: linear-gradient(-45deg, rgba(220, 10, 5, 0.8),rgba(255, 100, 0, 0.8),rgba(0, 255, 4, 0.8),rgba(190, 255, 255, 0.8),rgba(0, 50, 200, 0.7),rgba(200, 200, 200, 0.3),rgba(100, 100, 100, 0.8),rgba(20, 20, 20, 0.8), rgba(220, 10, 5, 0.8));
    background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  40% {
    transform: translateX(10vh);
    background: linear-gradient(-30deg, rgba(220, 10, 5, 0.8),rgba(255, 100, 0, 0.8),rgba(0, 255, 4, 0.8),rgba(190, 255, 255, 0.8),rgba(0, 50, 200, 0.7),rgba(200, 200, 200, 0.3),rgba(100, 100, 100, 0.8),rgba(20, 20, 20, 0.8), rgba(220, 10, 5, 0.8));
    background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  45% {
    transform: translateX(20vh);
    background: linear-gradient(-15deg, rgba(220, 10, 5, 0.8),rgba(255, 100, 0, 0.8),rgba(0, 255, 4, 0.8),rgba(190, 255, 255, 0.8),rgba(0, 50, 200, 0.7),rgba(200, 200, 200, 0.3),rgba(100, 100, 100, 0.8),rgba(220, 10, 5, 0.8),rgba(20, 20, 20, 0.8));
    background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  55% {
    transform: translateX(40vh);
    background: linear-gradient(0deg, rgba(220, 10, 5, 0.8),rgba(255, 100, 0, 0.8),rgba(0, 255, 4, 0.8),rgba(190, 255, 255, 0.8),rgba(0, 50, 200, 0.7),rgba(200, 200, 200, 0.3),rgba(100, 100, 100, 0.8),rgba(220, 10, 5, 0.8),rgba(20, 20, 20, 0.8));
    background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  60% {
    transform: translateX(50vh);
    background: linear-gradient(15deg, rgba(220, 10, 5, 0.8),rgba(255, 100, 0, 0.8),rgba(0, 255, 4, 0.8),rgba(190, 255, 255, 0.8),rgba(0, 50, 200, 0.7),rgba(200, 200, 200, 0.3),rgba(100, 100, 100, 0.8),rgba(220, 10, 5, 0.8),rgba(20, 20, 20, 0.8));
    background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  75% {
    transform: translateX(65vh);
    background: linear-gradient(30deg, rgba(220, 10, 5, 0.8),rgba(255, 100, 0, 0.8),rgba(0, 255, 4, 0.8),rgba(190, 255, 255, 0.8),rgba(0, 50, 200, 0.7),rgba(200, 200, 200, 0.3),rgba(100, 100, 100, 0.8),rgba(20, 20, 20, 0.8));
    background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  80% {
    transform: translateX(80vh);
    background: linear-gradient(45deg, rgba(220, 10, 5, 0.8),rgba(255, 100, 0, 0.8),rgba(0, 255, 4, 0.8),rgba(190, 255, 255, 0.8),rgba(0, 50, 200, 0.7),rgba(200, 200, 200, 0.3),rgba(100, 100, 100, 0.8),rgba(20, 20, 20, 0.8));
    background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  100% {
    transform: translateX(100vh);
    background: linear-gradient(90deg, rgba(220, 10, 5, 0.8),rgba(255, 100, 0, 0.8),rgba(0, 255, 4, 0.8),rgba(190, 255, 255, 0.8),rgba(0, 50, 200, 0.7),rgba(200, 200, 200, 0.3),rgba(100, 100, 100, 0.8),rgba(20, 20, 20, 0.8));
    background-clip: text;
    -webkit-text-fill-color: transparent;
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
.fade-enter-active {
  animation: slideIn 0.5s;
}
.fade-leave-active {
  animation: slideIn 0.5s reverse;
}
@keyframes slideIn {
  0% {
    opacity: 0;
    scale: 0;
  }
  100% {
    opacity: 1;
    scale: 1;
  }
}
</style>
