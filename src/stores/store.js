// stores/wpmStore.js
import { defineStore } from 'pinia'

export const useWpmStore = defineStore('wpm', {
  state: () => ({
    rawWpm: null,
    netWpm: null,
    userId: null,
    userToken: null,
    isLoggedIn: false,
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
    setUserId(value) {
      this.userId = value
    },
    setToken(value) {
      this.userToken = value
    },
    setIsLoggedIn(value) {
      this.isLoggedIn = value
    },
    setTotalTimeSpentTyping(value) {
      this.totalTimeSpentTyping = value
    },
    setTotalWordsTyped(value) {
      this.totalWordsTyped = value
    },
    setTotalTestsTaken(value) {
      this.totalTestsTaken = value
    },
    // Check if user is logged in
    checkAuth() {
      const userId = localStorage.getItem('userId')
      if (userId) {
        console.log('User is logged in')
        this.setIsLoggedIn(true)
        this.setUserId(userId)
        // fetch data from backend...
      } else {
        console.log('User is not logged in')
        this.setIsLoggedIn(false)
        this.setUserId(null)
      }
    },
    logout() {
      localStorage.removeItem('userId')
      this.setIsLoggedIn(false)
      this.setUserId(null)
    }
    // setUsername(value) {
    //   this.username = value
    // }
  }
})
