import FixedPointPage from '@/pages/FixedPointPage.vue'
import JacobiPage from '@/pages/JacobiPage.vue'
import NewtonRaphsonPage from '@/pages/NewtonRaphsonPage.vue'
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
        path: '/fixed-point',
        name: 'FixedPointPage',
        component: FixedPointPage
    },
    {
        path: '/newton-raphson',
        name: 'NewtonRaphsonPage',
        component: NewtonRaphsonPage
    },
    {
        path: '/jacobi',
        name: 'JacobiPage',
        component: JacobiPage
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
