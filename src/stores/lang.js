import { defineStore } from 'pinia'
import Cookies from 'js-cookie'

export const useLangStore = defineStore('lang', {
  state: () => ({
    locale: Cookies.get('locale'),
    locales: [],
  }),

  actions: {
    setLocale(locale) {
      this.locale = locale
      Cookies.set('locale', locale, { expires: 365 })
    },

    setAvailableLocales(locales) {
      this.locales = locales
    },

    setInitialLocale() {
      if (!this.locale) {
        const browserLang = navigator.language.split('-')[0]
        if (this.locales.includes(browserLang)) {
          this.setLocale(browserLang)
        } else {
          this.setLocale(this.locales[0])
        }
      }
    },
  },
})
