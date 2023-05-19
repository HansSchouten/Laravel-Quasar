<template>
  <q-layout view="hhh lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-btn flat no-caps stretch :to="{ name: 'dashboard' }" class="q-ml-sm">
          <q-avatar>
            <img src="/logo.png">
          </q-avatar>
          <q-toolbar-title>
            {{ appName }}
          </q-toolbar-title>
        </q-btn>

        <q-space/>

        <div class="self-stretch row no-wrap" v-if="user">
          <q-btn-dropdown flat no-caps stretch :label="user.name">
            <q-list>
              <q-item clickable v-close-popup :to="{ name: 'settings.profile' }">
                <q-item-section>
                  <q-item-label>
                    {{ $t('Settings') }}
                  </q-item-label>
                </q-item-section>
              </q-item>

              <q-item clickable v-close-popup @click.prevent="logout">
                <q-item-section>
                  <q-item-label>
                    {{ $t('Logout') }}
                  </q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-btn-dropdown>
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
    >
      <q-list>
        <q-item-label
          header
        >
        </q-item-label>
      </q-list>
    </q-drawer>

    <q-page-container>
      <slot />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from 'vue'
import { useAuthStore } from 'stores/auth'
import {useRouter} from "vue-router";

export default defineComponent({
  name: 'AdminLayout',

  setup () {
    const leftDrawerOpen = ref(false)

    const authStore = useAuthStore()
    const router = useRouter()

    return {
      appName: window.appName,
      user: authStore.user,
      leftDrawerOpen,

      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      },
      async logout () {
        await authStore.logout()
        await router.push({ name: 'login' })
      }
    }
  }
})
</script>
