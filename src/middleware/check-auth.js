import { useAuthStore } from 'stores/auth'

export default async (to, from, next) => {
  const authStore = useAuthStore()

  if (!authStore.check && authStore.token) {
    try {
      await authStore.fetchUser()
    } catch (e) {}
  }
  next()
}
