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
          @click="drawerStore.toggleLeftDrawer()"
        />

        <q-btn flat no-caps stretch :to="{ name: 'dashboard' }" class="q-ml-sm">
          <q-avatar>
            <img src="/logo.png" />
          </q-avatar>
          <q-toolbar-title class="gt-xs">
            {{ appName }}
          </q-toolbar-title>
        </q-btn>

        <q-space />

        <div class="self-stretch row no-wrap" v-if="user">
          <q-btn-dropdown flat no-caps stretch :label="user.name">
            <q-list>
              <q-item
                clickable
                v-close-popup
                :to="{ name: 'settings.profile' }"
              >
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

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <drawer />
    </q-drawer>

    <q-page-container>
      <slot />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { useAuthStore } from 'stores/auth'
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import Drawer from 'components/Drawer.vue'
import { useDrawerStore } from 'stores/drawer'

const router = useRouter()
const appName = window.appName

const drawerStore = useDrawerStore()
const { leftDrawerOpen } = storeToRefs(drawerStore)

const authStore = useAuthStore()
const { user } = storeToRefs(authStore)

async function logout() {
  await authStore.logout()
  await router.push({ name: 'login' })
}
</script>
