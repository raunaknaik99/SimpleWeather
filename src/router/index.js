import Vue from 'vue'
import VueRouter from 'vue-router'
import Weather from '../views/Weather.vue'

Vue.use(VueRouter)

const routes = [{
        path: '/',
        name: "Weather",
        component: Weather
    },
    {
        path: '/about',
        name: "About",
        component: () => import("../views/About.vue")
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router