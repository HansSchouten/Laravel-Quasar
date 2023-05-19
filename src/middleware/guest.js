import { useAuthStore } from 'stores/auth'

export default async (to, from, next) => {
  const authStore = useAuthStore()

  if (authStore.check) {
    next({ name: 'dashboard' })
  } else {
    next()
  }
}
