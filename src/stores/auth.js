import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    userId: '',
    userToken: null,
    isLoggedIn: false,
    username: ''
  }),
  actions: {
    setUsername(username) {
      this.username = username
    },

    async createAccount(email, password) {
      const apiKey = import.meta.env.VITE_FIREBASE_API_KEY
      let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + apiKey

      const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify({
          email: email,
          password: password,
          returnSecureToken: true
        })
      })

      const responseData = await response.json()
      console.log(responseData)
      console.log(responseData.username)

      if (responseData.idToken) {
        // Save token and user id to local storage for persistence
        console.log('Account created!', responseData.idToken)
        localStorage.setItem('token', responseData.idToken)
        localStorage.setItem('userId', responseData.localId)
      } else {
        throw new Error(responseData.error.message)
      }

      if (response.ok) {
        this.isLoggedIn = true
        this.userToken = responseData.idToken
        this.userId = responseData.localId
      } else {
        alert(responseData.error.message)
      }
    },
    async loginUser(email, password) {
      try {
      if (this.isLoggedIn) {
        alert('You are already logged in!')
      }

      const apiKey = import.meta.env.VITE_FIREBASE_API_KEY
      const url =
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + apiKey

      const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify({
          email: email,
          password: password,
          returnSecureToken: true
        })
      })

      const responseData = await response.json()

      if (!response.ok) {
          const error = new Error(responseData.message || 'Failed to authenticate. Check your login data.')
          throw error
      }

      if (responseData.idToken) {
        // Save token and user id to local storage for persistence
        console.log('Logged in!', responseData.idToken)
        localStorage.setItem('token', responseData.idToken)
        localStorage.setItem('userId', responseData.localId)
      } else {
        throw new Error(responseData.error.message)
      }

      if (response.ok) {
        console.log('Logged in!')
        this.isLoggedIn = true
        this.userToken = responseData.idToken
        this.userId = responseData.localId
        console.log(this.userId)
      } else {
        alert(responseData.error.message)
      }
      } catch (error) {
        if (error.message === 'INVALID_LOGIN_CREDENTIALS') {
          alert('Invalid login credentials')
        } else {
          alert('An error occurred')
        }
      }
    },
    checkAuth() {
      const userId = localStorage.getItem('userId')
      if (userId) {
        console.log('User is logged in')
        this.isLoggedIn = true
        this.userId = userId
      } else {
        console.log('User is not logged in')
        this.isLoggedIn = false
        this.userId = null
      }
    },
    logout() {
      localStorage.removeItem('userId')
      this.isLoggedIn = false
      this.userId = null
    }
  }
})
