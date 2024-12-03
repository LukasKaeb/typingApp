<template>
  <main>
    <h1>Dashboard</h1>
    <div>
      <div class="profile">
        <input
          v-if="username === ''"
          type="text"
          placeholder="Enter a username"
          @keyup.enter="setUsername($event.target.value)"
        />
        <h2>{{ username }}</h2>
        <input
          v-if="isUsernameInputVisible"
          type="text"
          @keyup.enter="setUsername"
          v-model="newUsername"
        />
        <i v-if="username" class="material-icons" @click="toggleInputVisibility">edit</i>
      </div>

      <div class="file-input-wrapper">
        <!-- TODO: alt attribute should look better. Default profile icon? -->
        <img class="profile-pic" :src="profilePic" alt="No Picture" />
        <button class="custom-button">Change Profile</button>
        <input
          v-if="!isInputHidden"
          type="file"
          @change="changeProfilePic"
          alt="Profile Picture"
          class="file-input"
        />
      </div>

      <div></div>
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
    </div>
    <div class="average-stats">
      <h2>Typing Speed</h2>
      <p>Average WPM: {{ averageWpm }}</p>
      <p>Average Raw WPM: {{ averageRawWpm }}</p>
    </div>
    <div class="backlog">
      <h2>History</h2>
      <ul>
        <!-- create a list element for each test -->
        <li v-for="(test, index) in allTests.slice(0, visibleCount)" :key="index">
          <p>WPM: {{ test.wpm }}</p>
          <p>Raw WPM: {{ test.raw_wpm }}</p>
        </li>
      </ul>
      <div class="button-container">
        <p v-if="allTests.length === 0">No tests taken yet.</p>
        <button class="button" v-if="visibleCount < allTests.length" @click="showMore">
          Show more
        </button>
        <button
          class="button"
          v-if="visibleCount > allTests.length && allTests.length !== 0"
          @click="showLess"
        >
          Show less
        </button>
      </div>
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

const allTests = ref([])
const visibleCount = ref(5)

// Set a username
const username = ref('')
const newUsername = ref('')

const profilePic = ref('')

const uid = ref(authStore.userId || localStorage.getItem('userId'))

const showMore = () => {
  visibleCount.value += 5
}

const showLess = () => {
  visibleCount.value -= 5
}

const isUsernameInputVisible = ref(false)

const toggleInputVisibility = () => {
  isUsernameInputVisible.value = !isUsernameInputVisible.value
}

const changeProfilePic = async (event) => {
  try {
    const file = event.target.files[0]
    const endpoint = import.meta.env.VITE_API_URL + '/set_profilepic'

    if (file) {
      const reader = new FileReader()
      reader.onload = async (e) => {
        const base64image = e.target.result

        const response = await fetch(endpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            uid: uid.value,
            image: base64image
          })
        })

        if (response.ok) {
          const data = await response.json()
          location.reload()
          console.log('Success! ', data)
        } else {
          console.log('Something went wrong!')
        }
      }
      reader.readAsDataURL(file)
    }
  } catch (error) {
    console.log('Fetch error: ', error)
    alert('Error setting profile picture')
  }
}

const setUsernameEndpoint = import.meta.env.VITE_API_URL + '/set_username'

const setUsername = async () => {
  try {
    const response = await fetch(setUsernameEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        uid: uid.value,
        username: newUsername.value
      })
    })

    if (response.ok) {
      const data = await response.json()
      console.log('Username set in DB', data)
    } else {
      alert('Error setting username')
    }
  } catch (error) {
    console.error('Fetch error:', error)
    alert('Error setting username')
  }
  toggleInputVisibility()
  getUsername()
}

const getProfilePic = async () => {
  try {
    const endpoint = `${import.meta.env.VITE_API_URL}/get_profilepic/${uid.value}`
    const response = await fetch(endpoint)
    const data = await response.json()

    if (response.ok) {
      profilePic.value = data.profile_picture
    } else {
      console.log('Error fetching profile picture: ', data)
    }
  } catch (error) {
    console.log('Fetch error: ', error)
  }
}

const getUsername = async () => {
  try {
    const endpoint = `${import.meta.env.VITE_API_URL}/get_username/${uid.value}`
    const response = await fetch(endpoint)
    const data = await response.json()

    if (response.ok) {
      username.value = data.username
    } else {
      console.error('Error fetching username:', data)
    }
  } catch (error) {
    console.error('Fetch error:', error)
  }
}

const fetchUserStats = async () => {
  try {
    console.log('Fetching user stats', uid)
    const endpoint = `${import.meta.env.VITE_API_URL}/get_user_stats/${uid.value}`
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
    const endpoint = `${import.meta.env.VITE_API_URL}/get_typing_stats/${uid.value}`
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
      allTests.value = data.tests
    }
  } catch (error) {
    console.error('Fetch error:', error)
  }
}

onMounted(() => {
  getUsername()
  getProfilePic()
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
  margin-top: 20px;
  padding: 20px;
  width: 900px;
  height: 200px;
}

.average-stats {
  margin-top: 20px;
  padding: 20px;
  border: 2.5px solid #ccc;
  border-radius: 12px;
  width: 900px;
  height: 130px;
}

li {
  list-style-type: none;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 12px;
  margin-top: 10px;
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.button {
  cursor: pointer;
  position: relative;
  padding: 10px 20px;
  border-radius: 7px;
  border: 1px solid #333;
  font-size: 14px;
  text-transform: uppercase;
  font-weight: 600;
  letter-spacing: 2px;
  background: transparent;
  color: #fff;
  overflow: hidden;
  box-shadow: 0 0 0 0 transparent;
  -webkit-transition: all 0.2s ease-in;
  -moz-transition: all 0.2s ease-in;
  transition: all 0.2s ease-in;
}

.button:hover {
  /* background: rgb(61, 106, 255); */
  box-shadow: 0 0 30px 5px rgba(54, 55, 56, 0.815);
  -webkit-transition: all 0.2s ease-out;
  -moz-transition: all 0.2s ease-out;
  transition: all 0.2s ease-out;
}

.button:hover::before {
  -webkit-animation: sh02 0.5s 0s linear;
  -moz-animation: sh02 0.5s 0s linear;
  animation: sh02 0.5s 0s linear;
}

.button::before {
  content: '';
  display: block;
  width: 0px;
  height: 86%;
  position: absolute;
  top: 7%;
  left: 0%;
  opacity: 0;
  background: #fff;
  box-shadow: 0 0 50px 30px #fff;
  -webkit-transform: skewX(-20deg);
  -moz-transform: skewX(-20deg);
  -ms-transform: skewX(-20deg);
  -o-transform: skewX(-20deg);
  transform: skewX(-20deg);
}

@keyframes sh02 {
  from {
    opacity: 0;
    left: 0%;
  }

  50% {
    opacity: 1;
  }

  to {
    opacity: 0;
    left: 100%;
  }
}

.button:active {
  box-shadow: 0 0 0 0 transparent;
  -webkit-transition: box-shadow 0.2s ease-in;
  -moz-transition: box-shadow 0.2s ease-in;
  transition: box-shadow 0.2s ease-in;
}

.button-container {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.material-icons {
  font-size: 1.2rem;
  color: #fff;
  cursor: pointer;
}

input {
  /* make it pretty */
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 5px;
  margin: 5px;
  width: 100%;
  font-size: 1.2rem;
  color: #333;
  background-color: #f9f9f9;
}

.profile {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px;
  margin: 5px;
  width: 100%;
}

.profile-pic {
  /* style this */
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin-right: 10px;
  display: flex;
}

.edit-pic {
  /* style this */
  width: 100px;
  height: 50px;
  cursor: pointer;
}

.file-upload {
  background-color: transparent;
  width: 50%;
  height: 50px;
  border: none;
  padding: 5px;
  margin: 5px;
  cursor: pointer;
  display: flex;
}
.change-profile {
  padding-bottom: 1rem;
  cursor: pointer;
  font-size: 18px;
}

.file-input-wrapper {
  position: relative;
  display: inline-block;
  padding: 10px;
}

.custom-button {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 20px;
  font-size: 16px;
  border-radius: 5px;
  cursor: pointer;
}

.file-input {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  cursor: pointer;
}
</style>
