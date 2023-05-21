import { boot } from 'quasar/wrappers'
import axios from 'axios'
import { useAuthStore } from 'stores/auth'
import { useLangStore } from 'stores/lang'
// import swal from 'sweetalert2'
// import i18n from '~/plugins/i18n'

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

  /*
  // Response interceptor
  axios.interceptors.response.use(response => response, error => {
    const {status} = error.response

    if (status >= 500) {
      swal({
        type: 'error',
        title: i18n.t('error_alert_title'),
        text: i18n.t('error_alert_text'),
        reverseButtons: true,
        confirmButtonText: i18n.t('ok'),
        cancelButtonText: i18n.t('cancel')
      })
    }

    if (status === 401 && store.getters['auth/check']) {
      swal({
        type: 'warning',
        title: i18n.t('token_expired_alert_title'),
        text: i18n.t('token_expired_alert_text'),
        reverseButtons: true,
        confirmButtonText: i18n.t('ok'),
        cancelButtonText: i18n.t('cancel')
      }).then(() => {
        store.commit('auth/LOGOUT')

        router.push({name: 'login'})
      })
    }

    return Promise.reject(error)
  })
   */
})
