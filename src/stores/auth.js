import { defineStore } from 'pinia'
import axios from 'axios'
import Cookies from 'js-cookie'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    token: Cookies.get('token'),
  }),

  getters: {
    check: (state) => state.user !== null,
  },

  actions: {
    saveToken(token, remember) {
      this.token = token
      Cookies.set('token', token, { expires: remember ? 365 : null })
    },

    async fetchUser() {
      try {
        const { data } = await axios.get('/api/user')
        this.user = data
      } catch (e) {
        this.token = null
        Cookies.remove('token')
      }
    },

    updateUser(user) {
      this.user = user
    },

    async logout() {
      try {
        await axios.post('/api/logout')
      } catch (e) {}

      this.user = null
      this.token = null
      Cookies.remove('token')
    },
  },
})
