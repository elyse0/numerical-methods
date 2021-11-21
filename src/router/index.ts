import FixedPointPage from '@/pages/FixedPointPage.vue'
import JacobiPage from '@/pages/JacobiPage.vue'
import LinearInterpolationPage from '@/pages/LinearInterpolationPage.vue'
import NewtonRaphsonPage from '@/pages/NewtonRaphsonPage.vue'
import Page404 from '@/pages/Page404.vue'
import QuadraticInterpolationPage from '@/pages/QuadraticInterpolationPage.vue'
import RungeKuttaPage from '@/pages/RungeKuttaPage.vue'
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
        path: '/root-of-polynomials/bisection',
        name: 'BisectionPage',
        component: BisectionPage
    },
    {
        path: '/root-of-polynomials/fixed-point',
        name: 'FixedPointPage',
        component: FixedPointPage
    },
    {
        path: '/root-of-polynomials/newton-raphson',
        name: 'NewtonRaphsonPage',
        component: NewtonRaphsonPage
    },
    {
        path: '/linear-system/jacobi',
        name: 'JacobiPage',
        component: JacobiPage
    },
    {
        path: '/interpolation/linear',
        name: 'LinearInterpolationPage',
        component: LinearInterpolationPage
    },
    {
        path: '/interpolation/quadratic',
        name: 'QuadraticInterpolationPage',
        component: QuadraticInterpolationPage
    },
    {
        path: '/interpolation/least-squares',
        name: 'LeastSquaresPage',
        component: LeastSquaresPage
    },
    {
        path: '/ode/runge-kutta',
        name: 'RungeKuttaPage',
        component: RungeKuttaPage
    },
    {
        path: '*',
        name: 'Page404',
        component: Page404
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
