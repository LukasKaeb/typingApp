<template>
  <NavBar />
  <RouterView />
</template>

<script setup>
import NavBar from '@/components/NavBar.vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from './stores/auth'
import { onMounted } from 'vue'

// const router = useRouter()
const authStore = useAuthStore()

onMounted(() => {
  authStore.checkAuth()
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
