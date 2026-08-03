import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css'

import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

/*
 * demo2 — Sales / CRM ERP theme
 * Spec overrides applied:
 *   design_system:       material-3
 *   primary_color:       #4338CA  (deep indigo — distinct from spec default #145A7A)
 *   secondary_color:     #7C3AED  (violet)
 *   accent_color:        #F59E0B  (amber)
 *   density_mode:        comfortable  (spec allows compact | balanced | comfortable)
 *   border_radius_scale: balanced     (spec allows compact | balanced | rounded)
 */
export default createVuetify({
  components,
  directives,
  icons: { defaultSet: 'mdi' },
  theme: {
    defaultTheme: 'salesLight',
    themes: {
      salesLight: {
        colors: {
          primary:    '#4338CA',
          secondary:  '#7C3AED',
          accent:     '#F59E0B',
          background: '#F4F5FB',
          surface:    '#FFFFFF',
          success:    '#0F9D58',
          warning:    '#D97706',
          error:      '#C0392B',
          info:       '#0284C7',
        },
      },
    },
  },
  defaults: {
    // density: comfortable  →  44px control height (spec Layout.md §4)
    VBtn:          { rounded: 'xl', elevation: 0 },
    VCard:         { rounded: 'xl' },
    VTextField:    { variant: 'outlined', density: 'comfortable', rounded: 'lg' },
    VSelect:       { variant: 'outlined', density: 'comfortable', rounded: 'lg' },
    VAutocomplete: { variant: 'outlined', density: 'comfortable', rounded: 'lg' },
    VTextarea:     { variant: 'outlined', density: 'comfortable', rounded: 'lg' },
  },
})
