<template>
  <q-layout view="hHh lpR fFf">

    <q-header elevated class="bg-primary text-white">
      <q-toolbar>

        <q-btn flat no-caps stretch :to="{ name: 'dashboard' }">
          <q-avatar>
            <img src="/logo.png">
          </q-avatar>
          <q-toolbar-title>
            {{ appName }}
          </q-toolbar-title>
        </q-btn>

      </q-toolbar>
    </q-header>

    <q-page-container>
      <slot />
    </q-page-container>

  </q-layout>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'GuestLayout',

  setup() {
    return {
      appName: window.appName
    }
  }
})
</script>
