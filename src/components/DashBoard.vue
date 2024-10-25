<template>
  <main>
    <h1>Dashboard</h1>
    <div class="border">
      <h2>Username:___</h2>
      <div class="stats shadow">
        <div class="stat">
          <div class="stat-title">Total Tests Taken</div>
          <div class="stat-value">{{ totalTests }}</div>
          <!-- <div class="stat-desc">21% more than last month</div> -->
        </div>
      </div>
      <div class="stats shadow">
        <div class="stat">
          <div class="stat-title">Time Spent Typing</div>
          <div class="stat-value">{{ timeSpentTyping }}</div>
          <!-- <div class="stat-desc">21% more than last month</div> -->
        </div>
      </div>
      <p>User ID: {{ authStore.userId }}</p>
    </div>
  </main>
</template>

<script setup>
import { useWpmStore } from '@/stores/store'
import { useAuthStore } from '@/stores/auth'

// Dummy data
const totalTests = 20
const timeSpentTyping = '20 hours'

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
/* From Uiverse.io by Yaya12085 */
.stats {
  display: inline-grid;
  background-color: #111111;
  color: #fff;
  border-radius: 1rem;
  border: 1px solid gray;
}

.shadow {
  box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
}

.stat {
  display: inline-grid;
  width: 100%;
  grid-template-columns: repeat(1, 1fr);
  column-gap: 1rem;
  padding-left: 1.5rem;
  padding-right: 1.5rem;
  padding-top: 1rem;
  padding-bottom: 1rem;
}

.stat-title {
  grid-column-start: 1;
  white-space: nowrap;
  color: rgb(197, 194, 194);
}

.stat-value {
  grid-column-start: 1;
  white-space: nowrap;
  font-size: 2.25rem;
  line-height: 2.5rem;
  font-weight: 800;
}

.stat-desc {
  grid-column-start: 1;
  white-space: nowrap;
  font-size: 0.75rem;
  line-height: 1rem;
  color: rgb(197, 194, 194);
}
</style>