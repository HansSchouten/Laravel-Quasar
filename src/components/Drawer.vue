<template>
  <q-scroll-area id="app-menu">
    <q-item
      clickable
      icon="dashboard"
      class="non-selectable top-level"
      :to="{ name: 'dashboard' }"
    >
      <q-item-section avatar>
        <q-icon color="primary" name="dashboard" />
      </q-item-section>
      <q-item-section>
        {{ $t('Dashboard') }}
      </q-item-section>
    </q-item>

    <q-expansion-item
      :label="$t('Settings')"
      icon="settings"
      class="non-selectable top-level"
    >
      <q-list>
        <q-item
          clickable
          :insetLevel="1"
          dense
          :to="{ name: 'settings.profile' }"
        >
          <q-item-section>
            {{ $t('Profile') }}
          </q-item-section>
        </q-item>
      </q-list>
    </q-expansion-item>
  </q-scroll-area>
</template>

<script setup>
</script>
