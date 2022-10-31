<template>
  <div class="wrapper">
    <div class="login">
      <button @click="close" class="close">
        <svg width="26" height="25" viewBox="0 0 26 25" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M23.9598 1.74696C24.5456 2.33274 24.5456 3.28249 23.9598 3.86828L4.86796 22.9602C4.28218 23.5459 3.33243 23.5459 2.74664 22.9602C2.16086 22.3744 2.16086 21.4246 2.74664 20.8388L21.8385 1.74696C22.4243 1.16117 23.3741 1.16117 23.9598 1.74696Z" fill="black"/>
          <path fill-rule="evenodd" clip-rule="evenodd" d="M2.03993 1.74694C2.62571 1.16115 3.57546 1.16115 4.16125 1.74694L23.2531 20.8388C23.8389 21.4246 23.8389 22.3744 23.2531 22.9601C22.6673 23.5459 21.7176 23.5459 21.1318 22.9601L2.03993 3.86826C1.45414 3.28247 1.45414 2.33273 2.03993 1.74694Z" fill="black"/>
        </svg>
      </button>
      <h2>Login</h2>
      <input type="button" value="Sign Up" @click="signUp">
      <input type="text" placeholder="Email"  v-model="email">
      <input type="password" placeholder="Password"  v-model="password">
      <div class="btn">
        <button @click="login">Login?</button>
        <button @click="clear">Clear?</button>
      </div>
    </div>
  </div>
</template>

<script>
import firebaseApp from '@/firebase/firebase.js';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

const auth = getAuth(firebaseApp);

export default {
  data() {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    close() {
      this.$emit("my-click2", true);
    },
    signUp() {
      this.$emit("my-click", false);
    },
    login() {
      signInWithEmailAndPassword(auth, this.email,this.password)
        .then((userCredential) => {
          const user = userCredential.user
          console.log('create user success. '+ user)
          this.close();
        })
        .catch((error) => {
          const errorCode = error.code
          const errorMessage = error.errorMessage;
          console.log('errorCode: ' + errorCode);
          console.log('errorMessage: ' + errorMessage);
          alert('認証失敗')
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
.wrapper {
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  text-align: center;
  background-color: rgba(0, 0, 0, 0);
}
.login {
  position: relative;
  width: 350px;
  height: 60vh;
  background-color: rgba(250, 250, 250, 0.7);
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: 20vh;
  padding: 2rem;
  gap: 0.5rem;
  backdrop-filter: blur(3px);
}
.close {
  position: absolute;
  top: 0;
  right: 0;
  border: none;
}

h2 {
  margin-bottom: 2rem; 
}
.login input {
  cursor: pointer;
  background-color: rgba(250, 250, 250, 0);
  border: solid 1px ;
  margin-bottom: 1rem;
  padding: 0.5rem;
}
.login input:nth-child(3) {
  border: none;
  margin-bottom: 3rem;
}
.btn {
  display: flex;
  justify-content: center;
}
.btn button {
  padding: 0.5rem;
  margin: 0.5rem;
}
</style>