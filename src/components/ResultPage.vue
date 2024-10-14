<template>
  <main>
    <div>
      <h1>See result below brother :D</h1>
      <p>Your Raw WPM: {{ wpmStore.rawWpm }}</p>
      <p>Your Net WPM: {{ wpmStore.netWpm }}</p>
    </div>
    <router-link to="/practice">Go back</router-link>
  </main>
</template>

<script setup>
import { ref } from 'vue'
import { useWpmStore } from '@/stores/store'

const wpmStore = useWpmStore()

// const rawWpm = ref(wpmStore.rawWpm)
</script>

<style scoped>
h1 {
  font-size: 2.5em;
  margin-bottom: 30px;
}
</style>