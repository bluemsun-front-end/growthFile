import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import { createPinia } from 'pinia'
import router from './router/index'
import App from './App.vue'
import clearLocalStorageMixin from './mixins/clearLocalStorage';

const app = createApp(App)
const pinia = createPinia()
app.use(ElementPlus, { locale: zhCn })
// 路由
app.use(router)
app.use(pinia) 
app.mixin(clearLocalStorageMixin);

app.mount('#app')
