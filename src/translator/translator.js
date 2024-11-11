import EN from './en'
import IT from './it'
import RU from './ru'
import VN from './vn'

const DEFAULT_LOCALE = 'vi' // Set default locale to Vietnamese

export default class Translator {
  constructor() {
    this.locale = null
    this.translations = {}

    this.registerTranslation('en', EN)
    this.registerTranslation('it', IT)
    this.registerTranslation('ru', RU)
    this.registerTranslation('vi', VN)

    // Always set the locale to Vietnamese
    this.setLocale(DEFAULT_LOCALE)
  }

  t(phrase, ...params) {
    return this.translate(phrase, ...params)
  }

  translate(phrase, ...params) {
    let locale = this.locale

    let translation = this.translations[locale]
    if (!translation.hasOwnProperty(phrase)) {
      console.warn(`translation '${phrase}' not found in language '${locale}'`)
      return phrase
    }

    let translatedPhrase = translation[phrase]

    translatedPhrase = translatedPhrase.replace(/{(\d+)}/g, function(match, number) {
      return typeof params[number] != 'undefined' ? params[number] : match
    })

    return translatedPhrase
  }

  setLocale(locale) {
    locale = locale.toLowerCase()

    if (this.translations.hasOwnProperty(locale)) {
      this.locale = locale
    } else {
      console.warn(`locale '${locale}' not available, switch to ${DEFAULT_LOCALE}`)
      this.locale = DEFAULT_LOCALE.toLowerCase()
    }
  }

  registerTranslation(locale, translations) {
    if (!this.translations.hasOwnProperty(locale)) {
      this.translations[locale] = translations
    } else {
      Object.assign(this.translations[locale], translations)
    }
  }

  static getBrowserLanguages() {
    return navigator.languages
      ? navigator.languages
      : [navigator.language || navigator.userLanguage]
  }
}