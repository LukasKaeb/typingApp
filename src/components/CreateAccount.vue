<template>
  <main>
    <h1>Create Account</h1>
    <form class="form" @submit.prevent="createAccount(email, password, '/dashboard')">
      <label for="email">Username</label>
      <input type="text" name="username" id="username" v-model="username" />
      <label for="email">Email</label>
      <input type="text" name="email" id="email" v-model="email" />
      <label for="password">Password</label>
      <input type="text" name="password" id="password" v-model="password" />
      <button type="submit" class="button">Create Account</button>
    </form>
    <p>Already have an Account? <router-link to="/login">Login Here.</router-link></p>
  </main>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const email = ref('')
const password = ref('')
const username = ref('')

const createAccount = (email, password, route) => {
  console.log(email, password)
  authStore.createAccount(email, password)
  router.push(route)
}
</script>

<style scoped>
h1 {
  font-size: 2.5em;
  margin-bottom: 30px;
  display: flex;
  justify-content: center;
}

.form {
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px #4caf50 solid;
  padding: 20px;
  border-radius: 12px;
  width: 600px;
  margin: 0 auto;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  height: 400px;
}

label {
  font-size: 1.5em;
  margin-bottom: 10px;
}

input {
  padding: 10px;
  margin-bottom: 20px;
  width: 300px;
  border-radius: 5px;
  border: 1px solid #ccc;
}

input:focus {
  outline: none;
  border: 1px solid #000;
}

.button {
  padding: 10px;
  width: 100px;
  border-radius: 5px;
  border: none;
  background-color: #4caf50;
  cursor: pointer;
}

button:hover {
  background-color: #45a049;
}
</style>