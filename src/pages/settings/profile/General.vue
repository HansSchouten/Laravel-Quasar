<template>
  <div class="q-pa-md q-mt-lg">
    <div class="row justify-center">
      <div class="col-12" style="max-width: 800px">
        <p class="text-subtitle1">
          {{ $t('Personal information') }}
        </p>
        <q-card>
          <form @submit.prevent="update" @keydown="form.onKeydown($event)">
            <alert-success :form="form" :message="$t('Information updated')" />

            <div class="q-pa-lg">
              <div class="col-12 q-pb-md">
                <div class="q-pa-xs">
                  <q-input
                    v-model="form.name"
                    type="text"
                    bottom-slots
                    :label="$t('Name')"
                    :error="form.errors.has('name')"
                  >
                    <template v-slot:error>
                      <has-error :form="form" field="name" />
                    </template>
                  </q-input>
                </div>
                <div class="q-pa-xs">
                  <q-input
                    v-model="form.email"
                    type="email"
                    bottom-slots
                    :label="$t('Email')"
                    :error="form.errors.has('email')"
                  >
                    <template v-slot:error>
                      <has-error :form="form" field="email" />
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
import { useAuthStore } from 'stores/auth'

export default {
  data: () => ({
    form: new Form({
      name: '',
      email: '',
    }),
  }),

  created() {
    const authStore = useAuthStore()
    this.form.keys().forEach((key) => {
      this.form[key] = authStore.user[key]
    })
  },

  methods: {
    async update() {
      const { data } = await this.form.patch('/api/settings/profile')
      const authStore = useAuthStore()
      authStore.updateUser(data)
    },
  },
}
</script>
