<template>
  <main>
    <div class="login wrap">
      <div class="h1">Login</div>
      <input
        pattern="^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$"
        placeholder="Email"
        id="email"
        name="email"
        type="text"
        v-model="email"
      />
      <input
        placeholder="Password"
        id="password"
        name="password"
        type="password"
        v-model="password"
      />
      <input
        value="Login"
        class="btn"
        type="submit"
        @click="login(email, password, '/dashboard')"
      />
      <p>Don't have an Account? <router-link to="/register">Register here.</router-link></p>
      <p v-if="error.value !== ''">{{ error }}</p>
    </div>
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

const error = ref('')

const login = (email, password, route) => {
  try {
    if (!email.includes('@')) {
      alert('Invalid email')
      email.value = ''
      return
    }
    console.log(email, password)
    authStore.loginUser(email, password)
    router.push(route)
  } catch (error) {
    console.error('Fetch error:', error)
    error.value = error.message || 'Invalid email or password'
  }
}
</script>

<style scoped>
main {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.login {
  width: 340px;
  height: 450px;
  background: #2c2c2c;
  padding: 47px;
  padding-bottom: 57px;
  color: #fff;
  border-radius: 17px;
  padding-bottom: 50px;
  font-size: 1.3em;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell,
    'Open Sans', 'Helvetica Neue', sans-serif;
}

.login input[type='text'],
.login input[type='password'] {
  opacity: 1;
  display: block;
  border: none;
  outline: none;
  width: 100%;
  padding: 13px 18px;
  margin: 20px 0 0 0;
  font-size: 0.8em;
  border-radius: 100px;
  background: #3c3c3c;
  color: #fff;
}

.login input:focus {
  animation: bounce 1s;
  -webkit-appearance: none;
}

.login input[type='submit'],
.login input[type='button'],
.h1 {
  border: 0;
  outline: 0;
  width: 100%;
  padding: 13px;
  margin: 40px 0 0 0;
  border-radius: 500px;
  font-weight: 600;
  animation: bounce2 1.6s;
}

.h1 {
  padding: 0;
  position: relative;
  top: -35px;
  display: block;
  margin-bottom: -0px;
  font-size: 1.3em;
}

.btn {
  background: linear-gradient(144deg, #af40ff, #5b42f3 50%, #00ddeb);
  color: #fff;
  padding: 16px !important;
}

.btn:hover {
  background: linear-gradient(144deg, #1e1e1e, 20%, #1e1e1e 50%, #1e1e1e);
  color: rgb(255, 255, 255);
  padding: 16px !important;
  cursor: pointer;
  transition: all 0.4s ease;
}

.login input[type='text'] {
  animation: bounce 1s;
  -webkit-appearance: none;
}

.login input[type='password'] {
  animation: bounce1 1.3s;
}

.ui {
  font-weight: bolder;
  background: -webkit-linear-gradient(#b563ff, #535efc, #0ec8ee);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  border-bottom: 4px solid transparent;
  border-image: linear-gradient(0.25turn, #535efc, #0ec8ee, #0ec8ee);
  border-image-slice: 1;
  display: inline;
}

@media only screen and (max-width: 600px) {
  .login {
    width: 70%;
    padding: 3em;
  }
}

@keyframes bounce {
  0% {
    transform: translateY(-250px);
    opacity: 0;
  }
}

@keyframes bounce1 {
  0% {
    opacity: 0;
  }

  40% {
    transform: translateY(-100px);
    opacity: 0;
  }
}

@keyframes bounce2 {
  0% {
    opacity: 0;
  }

  70% {
    transform: translateY(-20px);
    opacity: 0;
  }
}

p {
  font-size: 0.9em;
  margin: 20px 0;
}
</style>
