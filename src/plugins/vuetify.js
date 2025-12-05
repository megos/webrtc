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
import { aliases, mdi } from 'vuetify/iconsets/mdi-svg'
import 'vuetify/styles'

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
    aliases,
    sets: {
      mdi,
    },
  },
})
