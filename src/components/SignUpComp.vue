<template>
  <div class="wrapper">
    <div class="signup" :class="{isActive:isDrag, isActive2:isClose}">
      <button @touchend="close" class="close">
        <svg width="26" height="25" viewBox="0 0 26 25" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M23.9598 1.74696C24.5456 2.33274 24.5456 3.28249 23.9598 3.86828L4.86796 22.9602C4.28218 23.5459 3.33243 23.5459 2.74664 22.9602C2.16086 22.3744 2.16086 21.4246 2.74664 20.8388L21.8385 1.74696C22.4243 1.16117 23.3741 1.16117 23.9598 1.74696Z" fill="black"/>
          <path fill-rule="evenodd" clip-rule="evenodd" d="M2.03993 1.74694C2.62571 1.16115 3.57546 1.16115 4.16125 1.74694L23.2531 20.8388C23.8389 21.4246 23.8389 22.3744 23.2531 22.9601C22.6673 23.5459 21.7176 23.5459 21.1318 22.9601L2.03993 3.86826C1.45414 3.28247 1.45414 2.33273 2.03993 1.74694Z" fill="black"/>
        </svg>
      </button>
      <h2>Sign Up</h2>
      <p @touchstart="login" class="login">Login</p>
      <input type="text" placeholder="Name"  v-model="name">
      <input type="text" placeholder="Email"  v-model="email">
      <input type="password" placeholder="Password"  v-model="password">
      <div class="btn">
        <button @click="createUser">Sign Up?</button>
        <button @click="clear">Clear?</button>
      </div>
    </div>
  </div>
</template>

<script>
import firebaseApp from '@/firebase/firebase.js';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

const auth = getAuth(firebaseApp);

export default {
  data() {
    return {
      name: '',
      email: '',
      password: '',
      isDrag: false,
      isClose: false,
      time: '',
      count: 1,
    }
  },
  methods: {
    close() { 
      if(!this.isClose) {
        this.$emit("my-click2", this.isClose);
      }
    },
    login() {
      this.$emit("my-click", true);
    },
    createUser() {
      createUserWithEmailAndPassword(auth, this.email, this.password)
        .then((response) => {
          const user = response.user;
          console.log('create user success: ' + user);
          alert('作成成功');
          this.close()
        })
        .catch((error) => {
          const errorCode = error.code
          const errorMessage = error.message
          console.log('errorCode: '+ errorCode )
          console.log('errorMessage: '+ errorMessage)
          alert('作成失敗')
        })

    },
    clear() {
      this.email = '';
      this.password = '';
    }
  }
}
</script>

<style scoped>
input { 
	margin: 0;
	padding: 0;
	background: none;
	border: none;
	border-radius: 0;
	outline: none;
	-webkit-appearance: none;
	-moz-appearance: none;
	appearance: none;
}
.wrapper {
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  text-align: center;
  background-color: rgba(0, 0, 0, 0);
}
.signup {
  position: relative;
  width: 80%;
  height: 70vh;
  background-color: rgba(250, 250, 250, 0.7);
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: 20vh;
  padding: 2rem;
  backdrop-filter: blur(3px);
  border-radius: 40px;
}
.isActive {
  animation: skew 1.2s;
}
.isActive2 {
  animation: skew2 1.2s;
}
.close {
  position: absolute;
  top: 1rem;
  right: 1rem;
  border: none;
  background-color: rgba(0, 0, 0, 0);
  transition: 0.5s;
}
.close:active {
  transform: skew(-45deg, 45deg);
  scale: 0.6;
}
@keyframes skew {
  0% {
    transform: skew(-5deg, 5deg);
  }
  25% {
    transform: skew(5deg, -5deg);
  }
  50% {
    transform: skew(-3deg, 3deg);
  }
  73% {
    transform: skew(3deg, -3deg);
  }
  100% {
    transform: skew(0, 0);
  }
}
@keyframes skew2 {
  0% {
    transform: skew(5deg, -5deg);
  }
  25% {
    transform: skew(-5deg, 5deg);
  }
  50% {
    transform: skew(5deg, -5deg);
    transform: translateY(10px);
  }
  75% {
    transform: translateY(50px);
    opacity: 0.8;
  }
  100% {
    transform: translateY(500px);
    opacity: 0;
  }
}
h2 {
  margin-bottom: 2rem;
  font-family: "Nico Moji";
}
p {
  margin-bottom: 2rem;
  transition: 0.5s ease;
}
p:active {
  color: rgb(250, 100, 100);
}
.signup input {
  cursor: pointer;
  background-color: rgba(250, 250, 250, 0);
  border: solid 1px ;
  text-align: center;
  border-radius: 40px;
  height: 50px;
  margin-bottom: 1rem;
  padding: 0.5rem;
}
.signup input:focus {
  animation: neonline 1s ease;
}
@keyframes neonline {
  25% {
    border-top: solid 1px rgb(250, 100, 100);
  }
  50% {
    border-left: solid 1px rgb(250, 100, 100);
  }
  75% {
    border-bottom: solid 1px rgb(250, 100, 100);
  }
  100% {
    border-right: solid 1px rgb(250, 100, 100);
  }
}
.signup input:nth-child(3) {
  border: none;
}
.btn {
  display: flex;
  justify-content: center;
}
.btn button {
  height: 50px;
  width: 25%;
  padding: 0.5rem;
  margin: 0.5rem 0.5rem 2rem;
  border: rgba(0, 0, 0, 1) solid 1px ;
  border-radius: 40px;
}
.btn button:first-child {
  width: 40%;
  color: rgba(250, 250, 250, 1);
  background-color: rgb(240, 120, 100);
}
.btn button:focus {
  animation: neonline 1s ease;
}
</style>