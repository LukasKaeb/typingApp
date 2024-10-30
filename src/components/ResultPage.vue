<template>
  <main>
    <div>
      <h1>See result below brother :D</h1>
      <p>Your Raw WPM: {{ wpmStore.rawWpm }}</p>
      <p>Your Net WPM: {{ wpmStore.netWpm }}</p>
    </div>
    <router-link to="/practice">Go back</router-link>
  </main>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useWpmStore } from '@/stores/store'
import { useAuthStore } from '@/stores/auth'

const wpmStore = useWpmStore()
const authStore = useAuthStore()

const storeResultsEndpoint =
  'http://ec2-13-49-145-140.eu-north-1.compute.amazonaws.com:5001/store_test_result'
const uid = localStorage.getItem('uid')

const storeTestResults = async () => {
  const data = {
    uid: uid,
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

const updateTestCountEndpoint =
  'http://ec2-13-49-145-140.eu-north-1.compute.amazonaws.com:5001/update_test_count'

const updateTestCount = async () => {
  const data = {
    uid: uid,
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

const updateTimeTypingEndpoint = 'http://ec2-13-49-145-140.eu-north-1.compute.amazonaws.com:5001/update_time_typing'

onMounted(() => {
  storeTestResults()
  updateTestCount()
})
</script>

<style scoped>
h1 {
  font-size: 2.5em;
  margin-bottom: 30px;
}
</style>
