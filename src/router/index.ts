import Vue from 'vue'
import VueRouter, {RouteConfig} from 'vue-router'

import Mainpage from '@/pages/Mainpage.vue'
import BisectionPage from '@/pages/BisectionPage.vue'
import LeastSquaresPage from '@/pages/LeastSquaresPage.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
    {
        path: "/",
        name: "Mainpage",
        component: Mainpage
    },
    {
        path: '/bisection',
        name: 'BisectionPage',
        component: BisectionPage
    },
    {
        path: '/least-squares',
        name: 'LeastSquaresPage',
        component: LeastSquaresPage
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
