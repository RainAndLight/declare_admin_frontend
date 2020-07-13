import Vue from 'vue'
import VueRouter from 'vue-router'
// import Login from '../views/login'
import Home from '../views/home'
import Home2 from '../views/home/home.vue'
Vue.use(VueRouter)

const routes = [{
        path: '/',
        redirect: '/home' // 强制跳转
    },
    {
        path: '*',
        component: () => import('@/views/404')
    },
    {
        path: '/login',
        name: 'login',
        component: (resolve) => require(['@/views/login'], resolve)
    },
    {
        path: '/home',
        component: Home,
        children: [{
                path: '',
                component: Home2
            },
            {
                path: 'account',
                component: () => import('@/views/account')
            },
            {
                path: 'userInfo',
                component: () => import('@/views/userInfo/userInfo')
            },
            {
                path: 'declarationOperate',
                component: () => import('@/views/declaration/declarationOperate')
            },
            {
                path: 'declarationSchedule',
                component: () => import('@/views/declaration/declarationSchedule')
            },
            {
                path: 'declaration',
                component: () => import('@/views/declaration/declaration')
            },
            {
                path: 'todoCenter',
                component: () => import('@/views/todoCenter')
            },
            {
                path: 'todoCenter/declaration',
                component: () => import('@/views/todoCenter/declaration')
            },
            {
                path: 'user/userAudit',
                component: () => import('@/views/user/userAudit')
            },
            {
                path: 'user/userManage',
                component: () => import('@/views/user/userManage')
            },
            {
                path: 'user/userManage/userinfo',
                component: () => import('@/views/user/user-info')
            }
        ]
    }
]

const router = new VueRouter({
    routes
})

export default router
