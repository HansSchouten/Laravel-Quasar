<template>
  <div id="app">
    <q-ajax-bar />

    <div v-if="layout" :id="'layout-' + layout">
      <component :is="layoutComponents[layout]">
        <router-view />
      </component>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { useLayoutStore } from 'stores/layout'

// Load all layouts
const layoutFiles = import.meta.glob('./layouts/*.vue')
let layoutComponents = {}
Object.keys(layoutFiles).forEach((file) => {
  let name = file.replace(/(\.vue$)/g, '').replace(/^.*[\\\/]/, '')
  name = name.toLowerCase().replace('layout', '')
  layoutFiles[file]().then((module) => {
    layoutComponents[name] = module.default
  })
})

export default defineComponent({
  el: '#app',
  name: 'App',

  data: () => ({
    layout: 'loading', // set null to disable loading screen
    layoutComponents: layoutComponents,
    defaultLayout: 'admin',
  }),

  created() {
    const layoutStore = useLayoutStore()
    layoutStore.$subscribe((mutation, state) => {
      this.setLayout(state.layout)
    })
  },

  methods: {
    setLayout(layout) {
      if (!layout || !layoutComponents[layout]) {
        layout = this.defaultLayout
      }
      this.layout = layout
    },
  },
})
</script>
