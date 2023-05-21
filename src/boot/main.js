import { boot } from 'quasar/wrappers'
import { createPinia } from 'pinia'
import HasError from 'components/HasError.vue'
import AlertSuccess from 'components/AlertSuccess.vue'
import Swal from 'sweetalert2'

export default boot(async ({ app, router, store }) => {
  const pinia = createPinia()
  app.use(pinia)

  // register global components
  app.component(HasError.name, HasError)
  app.component(AlertSuccess.name, AlertSuccess)

  window.swal = Swal.mixin({})

  window.appName = import.meta.env.VITE_APP_NAME
})
