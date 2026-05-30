import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index.js'
import './assets/styles/tokens.css'
import './assets/styles/base.css'
import './assets/styles/components.css'

createApp(App).use(router).mount('#app')
