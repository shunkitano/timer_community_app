<template>
  <div class="top">
    <!-- <nav v-show="isMain">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </nav> -->
    <EnterComp v-if="!isMain"></EnterComp>
    <MainComp v-else></MainComp>
    
  </div>
</template>

<script>
import EnterComp from '@/components/EnterComp.vue';
import MainComp from '@/components/MainComp.vue';

export default {
  components: {
    EnterComp,
    MainComp
  },
  data() {
    return {
      isMain: false,
      time:'',
      count: 2,
    }
  },
  mounted() {
    this.time = setInterval(() => {this.enterPage()}, 1000);
  },
  methods: {
    enterPage() {
      if(this.count>0) {
        this.count--;
        console.log(this.count);
      } else if(this.count === 0) {
        clearInterval(this.time);
        this.isMain = !this.isMain;
      }
    }
  }
}
</script>

<style scoped>
.top nav {
  display: flex;
  justify-content: space-evenly;
}
</style>
