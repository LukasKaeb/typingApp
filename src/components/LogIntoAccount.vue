<template>
  <main>
    <h1>Login</h1>
    <form class="form" @submit.prevent="login">
      <label for="email">Email</label>
      <input type="text" name="email" id="email" v-model="email" />
      <label for="password">Password</label>
      <input type="text" name="password" id="password" v-model="password" />
      <button type="submit" class="button">Login</button>
    </form>
    <p>Don't have an Account?<router-link to="/register">Register Here.</router-link></p>
  </main>
</template>
  
  <script setup>
import { ref } from 'vue'
import { useWpmStore } from '@/stores/store'
import { useRouter } from 'vue-router'

const router = useRouter()

const wpmStore = useWpmStore()

const email = ref('')
const password = ref('')

const login = async () => {
  const apiKey = import.meta.env.VITE_FIREBASE_API_KEY
  const url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + apiKey

  const response = await fetch(url, {
    method: 'POST',
    body: JSON.stringify({
      email: email.value,
      password: password.value,
      returnSecureToken: true
    })
  })

  const responseData = await response.json()

  if (response.ok) {
    console.log('Logged in!')
    wpmStore.setIsLoggedIn(true)
    wpmStore.setToken(responseData.idToken)
    wpmStore.setUserId(responseData.localId)
    router.push('/dashboard')
  } else {
    alert(responseData.error.message)
  }
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