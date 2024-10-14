// stores/wpmStore.js
import { defineStore } from 'pinia'

export const useWpmStore = defineStore('wpm', {
  state: () => ({
    rawWpm: null,
    netWpm: null,
    userId: null,
    userToken: null,
    isLoggedIn: false,
    username: null
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
    }
    // setUsername(value) {
    //   this.username = value
    // }
  }
})
