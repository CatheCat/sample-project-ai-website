import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css'

import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

// demo1 — HR / Finance ERP
// design_system: material-3  (spec ERP-Defaults.md §2)
// primary_color override: #1A6B5A (warmer teal, differentiates from demo2)
export default createVuetify({
  components,
  directives,
  icons: { defaultSet: 'mdi' },
  theme: {
    defaultTheme: 'erpLight',
    themes: {
      erpLight: {
        colors: {
          primary:    '#1A6B5A',
          secondary:  '#2E5D9E',
          accent:     '#E87417',
          background: '#F5F7FA',
          surface:    '#FFFFFF',
          success:    '#0F9D58',
          warning:    '#D97706',
          error:      '#C0392B',
          info:       '#1D4ED8',
        },
      },
    },
  },
  defaults: {
    VBtn:          { rounded: 'lg', elevation: 0 },
    VCard:         { rounded: 'lg' },
    VTextField:    { variant: 'outlined', density: 'comfortable' },
    VSelect:       { variant: 'outlined', density: 'comfortable' },
    VAutocomplete: { variant: 'outlined', density: 'comfortable' },
    VTextarea:     { variant: 'outlined', density: 'comfortable' },
  },
})
