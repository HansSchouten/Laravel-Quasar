import { defineStore } from 'pinia'

export const useLayoutStore = defineStore('layout', {
  state: () => ({
    layout: null,
  }),

  actions: {
    setLayout(layout) {
      this.layout = layout
    },
  },
})
