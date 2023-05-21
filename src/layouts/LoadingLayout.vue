<template>
  <q-layout>
    <q-page-container>
      <q-page class="flex column flex-center">
        <div>
          <q-avatar>
            <img src="/logo.png" />
          </q-avatar>
          <span class="q-toolbar__title">{{ appName }}</span>
        </div>
        <div class="q-mt-lg">
          <q-spinner-puff color="primary" size="4em" />
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script setup>
const appName = window.appName
</script>
