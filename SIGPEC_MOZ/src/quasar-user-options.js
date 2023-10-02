
import 'quasar/dist/quasar.css'
import '@quasar/extras/material-icons/material-icons.css'
import { Loading, LocalStorage, SessionStorage} from 'quasar'

// To be used on app.use(Quasar, { ... })
export default {
  plugins: {
    Loading, LocalStorage, SessionStorage
  },
  config: {
    loading: {  }
  }
}