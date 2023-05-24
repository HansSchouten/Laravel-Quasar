import { defineStore } from 'pinia'

export const useDrawerStore = defineStore('drawer', {
  state: () => ({
    leftDrawerOpen: false,
  }),

  actions: {
    toggleLeftDrawer() {
      this.leftDrawerOpen = !this.leftDrawerOpen
    },
    setLeftDrawerOpen(newDrawerState) {
      this.leftDrawerOpen = newDrawerState
    },
  },
})
