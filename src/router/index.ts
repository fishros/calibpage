import {createRouter, createWebHashHistory} from "vue-router"

// 1. 定义路由组件
import Home from '../views/Home.vue'

// 2. 定义路由配置
const routes = [
    {
        path: '/',
        redirect: '/home'
    },
    {
        path: '/home/:msgid',
        name: 'Home',
        component: Home
    }
]

// 3. 创建路由实例
const router = createRouter({
    // 采用 hash 模式
    history: createWebHashHistory(),
    routes
})

export default router

