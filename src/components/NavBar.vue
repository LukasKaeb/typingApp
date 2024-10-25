<template>
  <nav class="navbar">
    <div class="navbar-brand">
      <!-- Change to logo later -->
      <router-link to="/"><i class="material-icons">home</i></router-link>
    </div>
    <ul class="navbar-links">
      <li><router-link to="/">Home</router-link></li>
      <li><router-link to="/practice">Practice</router-link></li>
      <li v-if="authStore.isLoggedIn">
        <router-link to="/dashboard"><i class="material-icons">dashboard</i></router-link>
      </li>
      <li v-if="!authStore.isLoggedIn">
        <router-link to="/register"><i class="material-icons">person</i></router-link>
      </li>
      <li v-if="authStore.isLoggedIn">
        <button class="Btn" @click="logout('/')">
          <div class="sign">
            <svg viewBox="0 0 512 512">
              <path
                d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"
              ></path>
            </svg>
          </div>

          <div class="text">Logout</div>
        </button>
      </li>
    </ul>
  </nav>
</template>
  
<script setup>
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
const router = useRouter()
const authStore = useAuthStore()

const logout = (route) => {
  authStore.logout()
  router.push(route)
}
</script>
  
<style scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background-color: #333;
  color: white;
  position: fixed; /* Keep navbar fixed at the top */
  top: 0;
  left: 0;
  width: 100%; /* Full width of the screen */
  height: 60px; /* Limit the height of the navbar */
  z-index: 1000; /* Ensure it’s above other content */
}

.navbar-brand {
  font-size: 1.5rem;
  margin-left: 1rem;
}

.navbar-brand a {
  color: white;
  text-decoration: none;
}

.navbar-links {
  list-style-type: none;
  display: flex;
  align-items: center;
  gap: 2rem; /* More space between links */
  margin-right: 1rem;
}

.navbar-links li {
  display: inline;
}

.navbar-links li a {
  color: white;
  text-decoration: none;
  display: flex;
  align-items: center;
}

.navbar-links li a:hover {
  text-decoration: underline;
}

.material-icons {
  font-size: 1.2rem;
  color: white;
}

/* Push content below the navbar */
body {
  padding-top: 60px; /* Add padding to avoid content overlap */
}
.Btn {
  --black: #000000;
  --ch-black: #141414;
  --eer-black: #1b1b1b;
  --night-rider: #2e2e2e;
  --white: #ffffff;
  --af-white: #f3f3f3;
  --ch-white: #e1e1e1;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 45px;
  height: 45px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition-duration: 0.3s;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.199);
  background-color: var(--night-rider);
}

/* plus sign */
.sign {
  width: 100%;
  transition-duration: 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
}

.sign svg {
  width: 17px;
}

.sign svg path {
  fill: var(--af-white);
}
/* text */
.text {
  position: absolute;
  right: 0%;
  width: 0%;
  opacity: 0;
  color: var(--af-white);
  font-size: 1.2em;
  font-weight: 600;
  transition-duration: 0.3s;
}
/* hover effect on button width */
.Btn:hover {
  width: 125px;
  border-radius: 5px;
  transition-duration: 0.3s;
}

.Btn:hover .sign {
  width: 30%;
  transition-duration: 0.3s;
  padding-left: 20px;
}
/* hover effect button's text */
.Btn:hover .text {
  opacity: 1;
  width: 70%;
  transition-duration: 0.3s;
  padding-right: 10px;
}
/* button click effect*/
.Btn:active {
  transform: translate(2px, 2px);
}
</style>
  