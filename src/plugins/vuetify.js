import { createVuetify } from 'vuetify'
import {
  VApp,
  VMain,
  VContainer,
  VRow,
  VCol,
  VCard,
  VCardTitle,
  VCardText,
  VCardActions,
  VForm,
  VTextField,
  VBtn,
  VSelect,
  VSlideYTransition,
  VDialog,
  VSpacer,
  VSnackbar,
} from 'vuetify/components'
import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css'

export default createVuetify({
  components: {
    VApp,
    VMain,
    VContainer,
    VRow,
    VCol,
    VCard,
    VCardTitle,
    VCardText,
    VCardActions,
    VForm,
    VTextField,
    VBtn,
    VSelect,
    VSlideYTransition,
    VDialog,
    VSpacer,
    VSnackbar,
  },
  icons: {
    defaultSet: 'mdi',
  },
})
