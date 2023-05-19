<template>
  <div class="q-pa-md q-mt-lg">
    <div class="row justify-center">
      <div class="col-12" style="max-width: 500px;">
        <q-card>
          <q-card-section>
            <div class="text-h6">
              {{ $t('Register') }}
            </div>
          </q-card-section>

          <q-separator/>

          <form @submit.prevent="register" @keydown="form.onKeydown($event)">
            <div class="q-pa-lg">
              <div class="col-12 q-pb-lg q-mb-sm">
                <div class="q-pl-xs q-pr-xs">
                  <q-input v-model="form.name" type="text" bottom-slots
                           :label="$t('Name')" :error="form.errors.has('name')" :autofocus="true">
                    <template v-slot:error>
                      <has-error :form="form" field="name"/>
                    </template>
                  </q-input>
                </div>
                <div class="q-pl-xs q-pr-xs">
                  <q-input v-model="form.email" type="email" bottom-slots
                           :label="$t('Email')" :error="form.errors.has('email')">
                    <template v-slot:error>
                      <has-error :form="form" field="email"/>
                    </template>
                  </q-input>
                </div>
                <div class="q-pl-xs q-pr-xs">
                  <q-input v-model="form.password" type="password" bottom-slots
                           :label="$t('Password')" :error="form.errors.has('password')">
                    <template v-slot:error>
                      <has-error :form="form" field="password"/>
                    </template>
                  </q-input>
                </div>
                <div class="q-pl-xs q-pr-xs">
                  <q-input v-model="form.password_confirmation" type="password" bottom-slots
                           :label="$t('Confirm Password')"
                           :error="form.errors.has('password_confirmation')">
                    <template v-slot:error>
                      <has-error :form="form" field="password_confirmation"/>
                    </template>
                  </q-input>
                </div>
              </div>

              <div class="col-12">
                <q-btn type="submit" color="primary" :label="$t('Register')" :loading="form.busy"/>
              </div>
            </div>

          </form>
        </q-card>
      </div>

    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import Form from 'vform'
import { useAuthStore } from 'stores/auth'

export default defineComponent({
  middleware: 'guest',
  layout: 'guest',
  title: 'Register',

  data: () => ({
    form: new Form({
      name: '',
      email: '',
      password: '',
      password_confirmation: ''
    })
  }),

  methods: {
    async register() {
      await this.form.post('/api/register')
      const authStore = useAuthStore()
      const {data: {token}} = await this.form.post('/api/login')
      authStore.saveToken(token)
      await authStore.fetchUser()
      await this.$router.push({name: 'dashboard'})
    }
  }
})
</script>
