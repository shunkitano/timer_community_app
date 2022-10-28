<template>
  <div>
    <TimerComp v-show="!isTimer2"></TimerComp>
    <TimerComp2 v-show="isTimer2"></TimerComp2>
  </div>
</template>

<script>
import TimerComp from '@/components/timer_comp/TimerComp.vue';
import TimerComp2 from '@/components/timer_comp/TimerComp2.vue';

export default {
  components: {
    TimerComp,
    TimerComp2
  },
  data() {
    return {
      isTimer2: true
    }
  }
}
</script>
