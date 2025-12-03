import { createApp } from 'vue'
import vuetify from '@/plugins/vuetify'
import App from '@/App'
import router from '@/router'

createApp(App)
  .use(router)
  .use(vuetify)
  .mount('#app')
