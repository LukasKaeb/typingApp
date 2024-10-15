import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    userId: null,
    userToken: null,
    isLoggedIn: false,
    username: null
  }),
  actions: {
    // ...
  }
})
