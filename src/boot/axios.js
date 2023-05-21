import { boot } from 'quasar/wrappers'
import axios from 'axios'
import { useAuthStore } from 'stores/auth'
import { useLangStore } from 'stores/lang'

export default boot(async ({ app, router, store }) => {
  axios.defaults.baseURL = import.meta.env.VITE_API_URL

  // Request interceptor
  axios.interceptors.request.use((request) => {
    const authStore = useAuthStore()
    if (authStore.token) {
      request.headers['Authorization'] = `Bearer ${authStore.token}`
    }

    const langStore = useLangStore()
    if (langStore.locale) {
      request.headers['Accept-Language'] = langStore.locale
    }

    // request.headers['X-Socket-Id'] = Echo.socketId()

    return request
  })

  // Response interceptor
  axios.interceptors.response.use(
    (response) => response,
    (error) => {
      if (!error.response) return
      const { status } = error.response

      if (status >= 500) {
        swal.fire({
          type: 'error',
          title: $t('An error occurred'),
          html: $t('Something went wrong!<br>Please try again or contact us.'),
          confirmButtonText: $t('Ok')
        })
      }

      const authStore = useAuthStore()
      if (status === 401 && authStore.check) {
        swal.fire({
          type: 'warning',
          title: $t('Session Expired'),
          text: $t('Please log in again to continue.'),
          confirmButtonText: $t('Ok'),
        }).then(async () => {
          await authStore.logout()
          await router.push({ name: 'login' })
        })
      }

      return Promise.reject(error)
    }
  )
})
