import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import views from './utils/installViews.ts'
import 'uno.css'
import 'virtual:uno.css'
import router from './router/index.ts'
import 'element-plus/theme-chalk/dark/css-vars.css'
const app = createApp(App)
app.use(views)
app.use(router)
app.mount('#app')
