<template>
  <main>
    <div>
      <h1>Typing Test Results</h1>
      <p>Your Raw WPM: {{ wpmStore.rawWpm }}</p>
      <p>Your Net WPM: {{ wpmStore.netWpm }}</p>
    </div>
    <router-link to="/practice">Go back</router-link>
    <router-link v-if="uid" to="/dashboard">Dashboard</router-link>
  </main>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useWpmStore } from '@/stores/store'
import { useAuthStore } from '@/stores/auth'

const wpmStore = useWpmStore()
const authStore = useAuthStore()

const uid = ref(authStore.userId)
console.log('uid: ', uid)

const storeResultsEndpoint = import.meta.env.VITE_API_URL + '/store_test_result'

const storeTestResults = async () => {
  const data = {
    uid: uid.value,
    raw_wpm: wpmStore.rawWpm,
    wpm: wpmStore.netWpm
  }

  try {
    const res = await fetch(storeResultsEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    if (res.ok) {
      const data = await res.json()
      console.log('Test results stored: ', data)
    } else {
      console.log('Error storing test results: ', res.status, res.statusText)
    }
  } catch (error) {
    console.log('Error storing test results: ', error)
  }
}

const updateTestCountEndpoint = import.meta.env.VITE_API_URL + '/update_test_count'

const updateTestCount = async () => {
  console.log('uid: ', uid.value)
  const data = {
    uid: uid.value,
    test_count: 1
  }

  try {
    const res = await fetch(updateTestCountEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    if (res.ok) {
      const data = await res.json()
      console.log('Test count updated: ', data)
    } else {
      console.log('Error updating test count: ', res.status, res.statusText)
    }
  } catch (error) {
    console.log('Error updating test count: ', error)
  }
}
console.log('countdown: ', wpmStore.countdown)
const updateTimeTypingEndpoint = import.meta.env.VITE_API_URL + '/update_time_typing'

const updateTimeTyping = async () => {
  const data = {
    uid: uid.value,
    test_time: wpmStore.countdown
  }

  try {
    const res = await fetch(updateTimeTypingEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    if (res.ok) {
      const data = await res.json()
      console.log('Time typing updated: ', data)
    } else {
      console.log('Error updating time typing: ', res.status, res.statusText)
    }
  } catch (error) {
    console.log('Error updating time typing: ', error)
  }
}

onMounted(() => {
  storeTestResults()
  updateTestCount()
  updateTimeTyping()
})
</script>

<style scoped>
h1 {
  font-size: 2.5em;
  margin-bottom: 30px;
}
</style>
