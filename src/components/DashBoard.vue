<template>
  <main>
    <h1>Dashboard</h1>
    <div class="border">
      <h2>Username:___</h2>
      <h2>Total Tests Taken: ___</h2>
      <h2>Total Time Typing: ___</h2>
      <p>User ID: {{ authStore.userId }}</p>
    </div>
    <div class="data">
      <h2>Test Data</h2>
      <p>Test 1: ___</p>
      <p>Test 2: ___</p>
      <p>Test 3: ___</p>
    </div>
  </main>
</template>

<script setup>
import { useWpmStore } from '@/stores/store'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()

const wpmStore = useWpmStore()
</script>

<style scoped>
main {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 5rem;
}

h1 {
  font-size: 2.5em;
  margin-bottom: 30px;
  display: flex;
  justify-content: center;
}
.border {
  margin-top: 20px;
  padding: 20px;
  border: 2.5px solid #ccc;
  border-radius: 12px;
  width: 900px;
  height: 200px;
}
</style>