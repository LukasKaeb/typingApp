<template>
  <NavBar />
  <RouterView />
</template>

<script setup>
import NavBar from '@/components/NavBar.vue'
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
