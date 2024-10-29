<template>
  <main>
    <div class="header">
      <h1>Typing Practice</h1>
    </div>
    <div class="timer-options">
      <p>Choose Interval:</p>
      <select class="countdown-options" name="countdown" v-model="selectedCountdown" required>
        <option value="15">15 sec</option>
        <option value="30">30 sec</option>
        <option value="60">1 mins</option>
        <option value="120">2 mins</option>
        <option value="180">3 mins</option>
        <option value="240">4 mins</option>
        <option value="300">5 mins</option>
      </select>
    </div>
    <div class="input-container">
      <input
        class="key-strokes"
        type="text"
        v-model="userInput"
        @keydown="startCountdown"
        @blur="pauseCountdown"
        placeholder="Start typing here..."
        @input="compareInput"
      />
      <div class="timer">{{ selectedCountdown }}</div>
      <i @click="resetTimer" class="material-icons">restart_alt</i>
    </div>
    <p>
      <span
        v-for="(char, index) in targetText"
        :key="index"
        :class="{
          correct: isTextCorrect[index],
          incorrect: !isTextCorrect[index] && isTextCorrect[index] !== undefined
        }"
        >{{ char }}</span
      >
    </p>

    <!-- Keyboard layout -->
    <div class="keyboard-layout">
      <!-- result button -->
      <router-link v-if="showResults" class="button" to="/results">Go To Results</router-link>
    </div>
    <transition name="keyboard-slide">
      <div class="keyboard" v-if="isKeyBoardVisible">
        <div v-for="row in keyboardLayout" :key="row">
          <div v-for="key in row" :key="key" :class="['key', { 'key-pressed': isKeyPressed(key) }]">
            {{ key }}
          </div>
        </div>
      </div>
    </transition>
    <i class="material-icons" @click="toggleKeyboardVis">keyboard_hide</i>
  </main>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useWpmStore } from '@/stores/store'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const wpmStore = useWpmStore()
const authStore = useAuthStore()
const userInput = ref('') // User Input

const timerStarted = ref(false)
const selectedCountdown = ref(0)
const showResults = ref(true)

// Needs to be fixed
const storeResultsEndpoint =
  'http://ec2-13-49-145-140.eu-north-1.compute.amazonaws.com:5001/store_test_result'

const storeTestResults = async () => {
  try {
    const response = await fetch(storeResultsEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        uid: authStore.uid,
        wpm: wpmStore.netWpm,
        raw_wpm: wpmStore.rawWpm
      })
    })

    if (response.ok) {
      const data = await response.json()
      console.log('Test results stored: ', data)
    } else {
      console.log('Error storing test results: ', response.status, response.statusText)
    }
  } catch (error) {
    console.error('Error storing test results: ', error)
  }
}

// Fetch text
const targetText = ref('')
const fetchText = async () => {
  try {
    const res = await fetch('/words.json')
    const data = await res.json()

    const randomWords = []
    for (let i = 0; i < 30; i++) {
      const randomIndex = Math.floor(Math.random() * data.words.length)
      randomWords.push(data.words[randomIndex])
    }

    targetText.value = randomWords.join(' ')
  } catch (error) {
    console.error('Error fetching words: ', error)
  }
}
// Compare input
const isTextCorrect = ref([])

const compareInput = () => {
  const userChars = userInput.value.split('')
  isTextCorrect.value = []

  for (let i = 0; i < targetText.value.length; i++) {
    if (userChars[i] === targetText.value[i]) {
      isTextCorrect.value[i] = true
    } else if (userChars[i] !== undefined) {
      isTextCorrect.value[i] = false
    } else {
      isTextCorrect.value[i] = undefined
    }
  }
}

//Calculate WPM and Net WPM

const rawWpm = ref(0)
const netWpm = ref(0)
const mistakes = ref(0)
// let newString = ref('')
const totalTime = ref(selectedCountdown.value)

const calculateNetWpm = () => {
  const totalCorrectChars = userInput.value.split('').length - mistakes.value

  netWpm.value = Math.round(totalCorrectChars / 5 / (totalTime.value / 60))

  wpmStore.setNetWpm(netWpm.value)
  console.log('Raw WPM: ' + netWpm.value)
}

const calculateRawWpm = () => {
  userInput.value = userInput.value.trim()

  const totalCharsTyped = userInput.value.split('').length

  for (let i = 0; i < userInput.value.length; i++) {
    if (userInput.value[i] !== targetText.value[i]) {
      mistakes.value++
    }
  }

  rawWpm.value = Math.round(totalCharsTyped / 5 / (totalTime.value / 60))

  wpmStore.setRawWpm(rawWpm.value)
  // console.log('Net WPM: ' + rawWpm.value)
}

// Start, Reset and pause countdown
let interval = null

const pauseCountdown = () => {
  clearInterval(interval)
  timerStarted.value = false
}

const startCountdown = () => {
  if (selectedCountdown.value <= 0) {
    alert('Please select a countdown interval')
  }

  if (!timerStarted.value) {
    totalTime.value = selectedCountdown.value

    timerStarted.value = true
    interval = setInterval(() => {
      selectedCountdown.value--
      if (selectedCountdown.value === 0) {
        clearInterval(interval)
        timerStarted.value = false
        showResults.value = true
        calculateRawWpm()
        calculateNetWpm()
        storeTestResults()
        router.push('/results')
      }
    }, 1000)
  }
}

const resetTimer = () => {
  selectedCountdown.value = 60
  timerStarted.value = false
  clearInterval(interval)
  showResults.value = false
  userInput.value = ''
  isTextCorrect.value = []
  fetchText()
}

// Keyboard logic
const isKeyBoardVisible = ref(true)

const toggleKeyboardVis = () => {
  isKeyBoardVisible.value = !isKeyBoardVisible.value
}

// Define the keyboard layout as a 2D array (rows and keys)
const keyboardLayout = ref([
  ['Esc', 'F1', 'F2', 'F3', 'F4', 'F5', 'F6', 'F7', 'F8', 'F9', 'F10', 'F11', 'F12'],
  ['~', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace'],
  ['Tab', 'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', '[', ']', '\\'],
  ['CapsLock', 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', ';', "'", 'Enter'],
  ['Shift', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', ',', '.', '/', 'Shift'],
  ['Ctrl', 'Alt', 'Space', 'Alt', 'Ctrl']
])

// Store pressed keys in a set for quick lookup
const pressedKeys = ref(new Set())

// Function to handle key down events
const handleKeyDown = (event) => {
  let key = event.key

  if (
    key !== 'Enter' &&
    key !== 'Backspace' &&
    key !== 'Shift' &&
    key !== 'CapsLock' &&
    key !== 'Tab' &&
    key !== 'Ctrl' &&
    key !== 'Alt' &&
    key !== 'Space' &&
    key !== 'ArrowLeft' &&
    key !== 'ArrowRight' &&
    key !== 'ArrowUp' &&
    key !== 'ArrowDown'
  ) {
    key = key.toUpperCase()
  }

  pressedKeys.value.add(key)
}

// Function to handle key up events
const handleKeyUp = (event) => {
  let key = event.key

  if (
    key !== 'Enter' &&
    key !== 'Backspace' &&
    key !== 'Shift' &&
    key !== 'CapsLock' &&
    key !== 'Tab' &&
    key !== 'Ctrl' &&
    key !== 'Alt' &&
    key !== 'Space' &&
    key !== 'ArrowLeft' &&
    key !== 'ArrowRight' &&
    key !== 'ArrowUp' &&
    key !== 'ArrowDown'
  ) {
    key = key.toUpperCase()
  }

  pressedKeys.value.delete(key)
}

// Function to check if a key is pressed
const isKeyPressed = (key) => {
  let normalizedKey = key
  if (key === 'Space') {
    normalizedKey = ' '
  }
  return pressedKeys.value.has(normalizedKey)
}

// Register event listeners for key presses
onMounted(() => {
  fetchText()
  window.addEventListener('keydown', handleKeyDown)
  window.addEventListener('keyup', handleKeyUp)
  selectedCountdown.value = 15
})

// Cleanup event listeners when component unmounts
onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleKeyDown)
  window.removeEventListener('keyup', handleKeyUp)
})
</script>

<style scoped>
main {
  padding-top: 3rem;
}

/* Define animation for the keyboard */
.keyboard-slide-enter-active,
.keyboard-slide-leave-active {
  transition: transform 0.4s ease, opacity 0.4s ease;
  transform-origin: top; /* Ensures the animation grows/shrinks from the top */
}

.keyboard-slide-enter {
  transform: scaleY(0); /* Shrunk state */
  opacity: 0; /* Hidden state */
}

.keyboard-slide-enter-to {
  transform: scaleY(1); /* Expanded state */
  opacity: 1; /* Visible state */
}

.keyboard-slide-leave-to {
  transform: scaleY(0); /* Shrunk state */
  opacity: 0; /* Hidden state */
}

/* Other styles */
.keyboard-layout {
  display: flex;
  gap: 10px;
  justify-content: center;
}

.material-icons {
  font-size: 2em;
  padding: 10px;
  margin-bottom: 20px;
  width: 5%;
  cursor: pointer;
}

h1 {
  margin-top: 2rem;
  font-size: 2.5em;
  margin-bottom: 20px;
}

.key-strokes {
  font-size: 1.2em;
  padding: 10px;
  margin-bottom: 20px;
  width: 90%;
  border-radius: 10px;
  border: 1px solid #ccc;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
}

.timer {
  font-size: 1.2em;
  padding: 10px;
  margin-bottom: 20px;
  width: 10%;
  text-align: center;
  border-radius: 5px;
  border: 1px solid #333;
  /* background: rgb(61, 106, 255); */
}

p {
  font-size: 1.5rem;
  margin-bottom: 20px;
}

.input-container {
  display: flex;
  gap: 10px;
}

.keyboard {
  display: flex;
  flex-direction: column;
  gap: 10px;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  transition: height 0.4s ease; /* Ensure height animation when needed */
  margin-top: 20px;
}

.key {
  display: inline-block;
  padding: 10px 15px;
  margin: 2px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #f1f1f1;
  font-size: 14px;
  text-align: center;
  transition: background-color 0.2s;
}

.key-pressed {
  background-color: #4caf50;
  color: white;
}

.timer-options {
  padding: 10px;
  font-size: 1.2em;
  display: flex;
  gap: 10px;
  text-align: center;
}

.button {
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

.text {
  font-size: 1.5rem;
  margin-bottom: 20px;
  display: inline;
}

.text-red {
  color: red;
}

.countdown-options {
  padding: 10px;
  font-size: 1.2em;
  border-radius: 5px;
  border: 1px solid #ccc;
}

.correct {
  color: green;
}

.incorrect {
  color: red;
}

.header {
  display: flex;
  /* justify-content: space-between; */
  align-items: center;
}

.nav {
  display: flex;
  align-items: center;
  /* align to the right side */
  justify-content: flex-end;
  gap: 10px;
}

@media (prefers-color-scheme: dark) {
  .key {
    background-color: #333;
    color: white;
  }

  .key-pressed {
    background-color: #4caf50;
    color: white;
  }

  .timer {
    color: white;
  }

  .material-icons {
    color: white;
    border-radius: 12px;
  }
  .material-icons:hover {
    background-color: #333;
  }
}
</style>


