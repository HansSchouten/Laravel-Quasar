const Login = () => import('pages/auth/Login.vue')
const Register = () => import('pages/auth/Register.vue')
const PasswordEmail = () => import('pages/auth/password/Email.vue')
const PasswordReset = () => import('pages/auth/password/Reset.vue')
const Dashboard = () => import('pages/Dashboard.vue')
const SettingsProfile = () => import('pages/settings/profile/Index.vue')
const NotFound = () => import('pages/NotFound.vue')

const routes = [
  { path: '/login', name: 'login', component: Login },
  { path: '/register', name: 'register', component: Register },
  { path: '/password/reset', name: 'password.request', component: PasswordEmail },
  { path: '/password/reset/:token', name: 'password.reset', component: PasswordReset },

  { path: '/', name: 'dashboard', component: Dashboard },
  { path: '/settings', name: 'settings.profile', component: SettingsProfile },

  { path: '/:catchAll(.*)*', component: NotFound }
]

export default routes
