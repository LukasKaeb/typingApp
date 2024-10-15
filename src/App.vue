<template>
  <NavBar />
  <RouterView />
</template>

<script setup>
import NavBar from '@/components/NavBar.vue'
import { useRouter } from 'vue-router'
import { useWpmStore } from './stores/store'
import { onMounted } from 'vue'

const router = useRouter()
const wpmStore = useWpmStore()

onMounted(() => {
  wpmStore.checkAuth()
})
</script>

<style scoped>
body {
  font-family: 'Arial', sans-serif;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  display: flex;
}
</style>
