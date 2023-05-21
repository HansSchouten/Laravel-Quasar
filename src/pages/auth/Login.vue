<template>
  <div class="q-pa-md q-mt-xl">
    <div class="row justify-center">
      <div class="col-12" style="max-width: 500px">
        <q-card>
          <q-card-section>
            <div class="text-h6">
              {{ $t('Login') }}
            </div>
          </q-card-section>

          <q-separator />

          <form @submit.prevent="login" @keydown="form.onKeydown($event)">
            <div class="q-pa-lg">
              <div class="col-12 q-pb-lg q-mb-md">
                <div class="q-pl-xs q-pr-xs">
                  <q-input
                    v-model="form.email"
                    type="email"
                    bottom-slots
                    :label="$t('Email')"
                    :error="form.errors.has('email')"
                    :autofocus="true"
                  >
                    <template v-slot:error>
                      <has-error :form="form" field="email" />
                    </template>
                  </q-input>
                </div>
                <div class="q-pl-xs q-pr-xs">
                  <q-input
                    v-model="form.password"
                    type="password"
                    bottom-slots
                    :label="$t('Password')"
                    :error="form.errors.has('password')"
                  >
                    <template v-slot:error>
                      <has-error :form="form" field="password" />
                    </template>
                  </q-input>
                </div>

                <div class="row">
                  <div class="col-6">
                    <q-checkbox
                      v-model="remember"
                      name="remember"
                      :label="$t('Remember Me')"
                    />
                  </div>
                  <div class="col-6 q-pt-sm">
                    <router-link
                      :to="{ name: 'password.request' }"
                      class="forgot-password"
                    >
                      {{ $t('Forgot Your Password?') }}
                    </router-link>
                  </div>
                </div>
              </div>

              <div class="col-12">
                <q-btn
                  type="submit"
                  color="primary"
                  :label="$t('Login')"
                  :loading="form.busy"
                />
              </div>

              <div class="col-12 q-pt-lg text-center">
                <router-link :to="{ name: 'register' }" class="register">
                  {{ $t('No account? Click here to register') }}
                </router-link>
              </div>
            </div>
          </form>
        </q-card>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import Form from 'vform'
import { useAuthStore } from 'stores/auth'

export default defineComponent({
  middleware: 'guest',
  layout: 'guest',
  title: 'Login',

  data: () => ({
    form: new Form({
      email: '',
      password: '',
    }),
    remember: true,
  }),

  methods: {
    async login() {
      const { data } = await this.form.post('/api/login')
      const authStore = useAuthStore()
      authStore.saveToken(data.token, this.remember)
      await authStore.fetchUser()
      await this.$router.push({ name: 'dashboard' })
    },
  },
})
</script>
