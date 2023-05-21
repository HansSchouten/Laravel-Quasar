import { boot } from 'quasar/wrappers'
import { createPinia } from 'pinia'
import { HasError } from 'vform/src/components/bootstrap5'
import AlertSuccess from 'components/AlertSuccess.vue'

export default boot(async ({ app, router, store }) => {
  const pinia = createPinia()
  app.use(pinia)

  // register global components
  app.component(HasError.name, HasError)
  app.component(AlertSuccess.name, AlertSuccess)

  window.appName = import.meta.env.VITE_APP_NAME
})
