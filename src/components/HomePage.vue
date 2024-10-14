<template>
  <div class="home-page">
    <header>
      <h1>Welcome to My TypingApp</h1>
    </header>
    <main>
      <p>Improve your typing skills with our practice.</p>
      <router-link to="/practice">
        <button>Start Practicing</button>
      </router-link>
    </main>
  </div>
</template>

<script>
export default {
  name: 'HomePage'
}
</script>

<style scoped>
button {
  padding: 10px 20px;
  font-size: 1em;
  cursor: pointer;
  border: none;
  border-radius: 12px;
  background-color: #4caf50;
}
.home-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
}

header h1 {
  font-size: 2.5em;
  margin-bottom: 20px;
}

main {
  text-align: center;
}

main p {
  font-size: 1.2em;
  margin-bottom: 20px;
}

button {
  padding: 10px 20px;
  font-size: 1em;
  cursor: pointer;
}
</style>