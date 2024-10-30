// stores/wpmStore.js
import { defineStore } from 'pinia'

export const useWpmStore = defineStore('wpm', {
  state: () => ({
    rawWpm: 0,
    netWpm: 0,
    totalTimeSpentTyping: 0,
    totalWordsTyped: 0,
    totalTestsTaken: 0
    // username: null,
  }),
  actions: {
    setRawWpm(value) {
      this.rawWpm = value
    },
    setNetWpm(value) {
      this.netWpm = value
    },
    setTotalTimeSpentTyping(value) {
      this.totalTimeSpentTyping = value
    },
    setTotalWordsTyped(value) {
      this.totalWordsTyped = value
    },
    setTotalTestsTaken(value) {
      this.totalTestsTaken = value
    }
    // Check if user is logged in
    // setUsername(value) {
    //   this.username = value
    // }
  }
})
