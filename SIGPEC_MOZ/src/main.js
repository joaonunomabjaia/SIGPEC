import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createORM } from 'pinia-orm'
import App from './App.vue'
import router from './router'
import './assets/main.css'
import { Quasar } from 'quasar'
import quasarUserOptions from './quasar-user-options'
import layoutPadrao from 'src/layouts/LayoutPadrao.vue'
// import Camera from 'simple-vue-camera'

const pinia = createPinia().use(createORM())
const app = createApp(App).use(Quasar, quasarUserOptions)

app.component('layout-padrao', layoutPadrao)
// app.component('camera-component', Camera)
app.use(pinia)
app.use(router)

app.mount('#app')
