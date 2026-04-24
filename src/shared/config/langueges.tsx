export type Lang = 'ru' | 'en' | 'fr' | 'de' | 'nl' | 'pl'
export const languages: {
  code: Lang
  label: string
  countryCode: string
}[] = [
 { code: 'de', label: 'Deutsch', countryCode: 'DE' },
  { code: 'en', label: 'English', countryCode: 'US' },
  { code: 'fr', label: 'Français', countryCode: 'FR' },
  { code: 'ru', label: 'Русский', countryCode: 'RU' }, 
  { code: 'nl', label: 'Nederlands', countryCode: 'NL' },
  { code: 'pl', label: 'Polski', countryCode: 'PL' }
]