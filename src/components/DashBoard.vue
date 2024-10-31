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
      <div class="stats shadow">
        <div class="stat">
          <div class="stat-title">Highest WPM</div>
          <div class="stat-value">{{ highestWpm }}</div>
          <!-- <div class="stat-desc">21% more than last month</div> -->
        </div>
      </div>
      <div class="stats shadow">
        <div class="stat">
          <div class="stat-title">Highest Raw WPM</div>
          <div class="stat-value">{{ highestRawWpm }}</div>
          <!-- <div class="stat-desc">21% more than last month</div> -->
        </div>
      </div>
      <p>User ID: {{ authStore.userId }}</p>
    </div>
    <div class="average-stats">
      <h2>Typing Speed</h2>
      <p>Average WPM: {{ averageWpm }}</p>
      <p>Average Raw WPM: {{ averageRawWpm }}</p>
    </div>
    <div class="backlog">
      <h2>History</h2>
      <p>Coming soon...</p>
    </div>
  </main>
</template>

<script setup>
import { useAuthStore } from '@/stores/auth'
import { ref, onMounted } from 'vue'

const authStore = useAuthStore()

const totalTests = ref(0)
const timeSpentTyping = ref(0)

const averageWpm = ref(0)
const averageRawWpm = ref(0)

const highestWpm = ref(0)
const highestRawWpm = ref(0)

const uid = authStore.userId

const fetchUserStats = async () => {
  try {
    console.log('Fetching user stats', uid)
    const endpoint = `${import.meta.env.VITE_API_URL}/get_user_stats/${uid}`
    const response = await fetch(endpoint)
    const data = await response.json()

    if (response.ok) {
      totalTests.value = data.test_count
      timeSpentTyping.value = data.test_time
    } else {
      console.error('Error fetching user stats:', data)
    }
  } catch (error) {
    console.error('Fetch error:', error)
  }
}

const fetchUserTypingStats = async () => {
  try {
    const endpoint = `${import.meta.env.VITE_API_URL}/get_typing_stats/${uid}`
    const response = await fetch(endpoint)
    const data = await response.json()

    if (response.ok && data.tests.length > 0) {
      console.log('User Typing Stats: ', data)
      // Map the tests and get Math.max of each value
      highestWpm.value = Math.max(...data.tests.map((test) => test.wpm))
      highestRawWpm.value = Math.max(...data.tests.map((test) => test.raw_wpm))
      // Calculate the average WPM and Raw WPM
      averageWpm.value = Math.round(
        data.tests.reduce((acc, test) => acc + test.wpm, 0) / data.tests.length
      )
      averageRawWpm.value = Math.round(
        data.tests.reduce((acc, test) => acc + test.raw_wpm, 0) / data.tests.length
      )
    }
  } catch (error) {
    console.error('Fetch error:', error)
  }
}

onMounted(() => {
  fetchUserStats()
  fetchUserTypingStats()
})
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

.stats {
  display: inline-grid;
  background-color: #111111;
  color: #fff;
  border-radius: 1rem;
  border: 1px solid gray;
}

.shadow {
  box-shadow:
    0 1px 3px 0 rgb(0 0 0 / 0.1),
    0 1px 2px -1px rgb(0 0 0 / 0.1);
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
.backlog {
  /* style it  */
  margin-top: 20px;
  padding: 20px;
  width: 900px;
  height: 200px;
}
.average-stats {
  /* style the stats */
  margin-top: 20px;
  padding: 20px;
  border: 2.5px solid #ccc;
  border-radius: 12px;
  width: 900px;
  height: 130px;
}
</style>
