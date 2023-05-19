import { boot } from 'quasar/wrappers'
import { createPinia } from 'pinia'

export default boot(async ({ app, router, store }) => {
  const pinia = createPinia()
  app.use(pinia)

  window.appName = import.meta.env.VITE_APP_NAME
})
