import { boot } from 'quasar/wrappers'
import { useLangStore } from 'stores/lang'
import { createI18n } from 'vue-i18n'

export default boot(async ({ app, router, store }) => {
  const mainLocale = 'en'
  let messages = {}
  messages[mainLocale] = {}
  const translations = await import('../lang/app.json').then(
    (m) => m.default || m
  )
  Object.keys(translations).forEach((englishTranslation) => {
    messages[mainLocale][englishTranslation] = englishTranslation
    Object.keys(translations[englishTranslation]).forEach((locale) => {
      messages[locale] = messages[locale] || {}
      messages[locale][englishTranslation] =
        translations[englishTranslation][locale]
    })
  })

  const langStore = useLangStore()
  langStore.setAvailableLocales(Object.keys(messages))
  langStore.setInitialLocale()

  window.i18n = createI18n({
    locale: langStore.locale,
    fallbackLocale: mainLocale,
    messages: messages,
  })

  app.use(i18n)
})
