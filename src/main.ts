import { createApp } from 'vue'
import App from './App.vue'
import '../src/css/global.less'
import router from './router/index'

const app = createApp(App)

// 引入路由对象实例
app.use(router)

app.mount('#app')

