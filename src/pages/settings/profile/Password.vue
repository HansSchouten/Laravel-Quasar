<template>
  <div class="q-pa-md q-mt-lg">
    <div class="row justify-center">
      <div class="col-12" style="max-width: 800px">
        <p class="text-subtitle1">
          {{ $t('Password') }}
        </p>
        <q-card>
          <form @submit.prevent="update" @keydown="form.onKeydown($event)">
            <alert-success :form="form" :message="$t('Password updated')" />

            <div class="q-pa-lg">
              <div class="col-12 q-pb-md">
                <div class="q-pa-xs">
                  <q-input
                    v-model="form.password"
                    type="password"
                    bottom-slots
                    :label="$t('New password')"
                    :error="form.errors.has('password')"
                  >
                    <template v-slot:error>
                      <has-error :form="form" field="password" />
                    </template>
                  </q-input>
                </div>
                <div class="q-pa-xs">
                  <q-input
                    v-model="form.password_confirmation"
                    type="password"
                    bottom-slots
                    :label="$t('Confirm Password')"
                    :error="form.errors.has('password_confirmation')"
                  >
                    <template v-slot:error>
                      <has-error :form="form" field="password_confirmation" />
                    </template>
                  </q-input>
                </div>
              </div>

              <div class="col-12">
                <q-btn
                  type="submit"
                  color="primary"
                  :label="$t('Update')"
                  :loading="form.busy"
                />
              </div>
            </div>
          </form>
        </q-card>
      </div>
    </div>
  </div>
</template>

<script>
import Form from 'vform'

export default {
  data: () => ({
    form: new Form({
      password: '',
      password_confirmation: '',
    }),
  }),

  methods: {
    async update() {
      await this.form.patch('/api/settings/password')
      this.form.reset()
    },
  },
}
</script>
