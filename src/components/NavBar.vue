<template>
  <nav class="navbar">
    <div class="navbar-brand">
      <!-- Change to logo later -->
      <router-link to="/"><i class="material-icons">home</i></router-link>
    </div>
    <ul class="navbar-links">
      <li><router-link to="/">Home</router-link></li>
      <li><router-link to="/practice">Practice</router-link></li>
      <li>
        <router-link to="/dashboard"><i class="material-icons">dashboard</i></router-link>
      </li>
      <li>
        <router-link to="/register"><i class="material-icons">person</i></router-link>
      </li>
    </ul>
  </nav>
</template>
  
  <script setup>
// No additional setup needed
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
</style>
  