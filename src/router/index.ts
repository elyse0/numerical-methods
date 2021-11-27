import FixedPointPage from '@/pages/FixedPointPage.vue'
import JacobiPage from '@/pages/JacobiPage.vue'
import LinearInterpolationPage from '@/pages/LinearInterpolationPage.vue'
import NewtonRaphsonPage from '@/pages/NewtonRaphsonPage.vue'
import Page404 from '@/pages/Page404.vue'
import QuadraticInterpolationPage from '@/pages/QuadraticInterpolationPage.vue'
import RungeKuttaPage from '@/pages/RungeKuttaPage.vue'
import SimpsonIntegrationPage from '@/pages/SimpsonIntegrationPage.vue'
import TaylorSeriesPage from '@/pages/TaylorSeriesPage.vue'
import TrapezoidalIntegrationPage from '@/pages/TrapezoidalIntegrationPage.vue'
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
        component: Mainpage,
        meta: {
            title: "Métodos numéricos"
        }
    },
    {
        path: '/root-of-polynomials/bisection',
        name: 'BisectionPage',
        component: BisectionPage,
        meta: {
            title: "Método de Bisection"
        }
    },
    {
        path: '/root-of-polynomials/fixed-point',
        name: 'FixedPointPage',
        component: FixedPointPage,
        meta: {
            title: "Método de punto fijo"
        }
    },
    {
        path: '/root-of-polynomials/newton-raphson',
        name: 'NewtonRaphsonPage',
        component: NewtonRaphsonPage,
        meta: {
            title: "Método de Newton-Raphson"
        }
    },
    {
        path: '/linear-system/jacobi',
        name: 'JacobiPage',
        component: JacobiPage,
        meta: {
            title: "Método de Jacobi"
        }
    },
    {
        path: '/interpolation/linear',
        name: 'LinearInterpolationPage',
        component: LinearInterpolationPage,
        meta: {
            title: "Interpolación lineal"
        }
    },
    {
        path: '/interpolation/quadratic',
        name: 'QuadraticInterpolationPage',
        component: QuadraticInterpolationPage,
        meta: {
            title: "Interpolación cuadrática"
        }
    },
    {
        path: '/interpolation/least-squares',
        name: 'LeastSquaresPage',
        component: LeastSquaresPage,
        meta: {
            title: "Interpolación por minimos cuadrados"
        }
    },
    {
        path: '/approximation/taylor-series',
        name: 'TaylorSeriesPage',
        component: TaylorSeriesPage,
        meta: {
            title: "Serie de Taylor"
        }
    },
    {
        path: '/integration/trapezoidal',
        name: 'TrapezoidalIntegrationPage',
        component: TrapezoidalIntegrationPage,
        meta: {
            title: "Integración trapezoidal"
        }
    },

    {
        path: '/integration/simpson-1-3',
        name: 'SimpsonIntegrationPage',
        component: SimpsonIntegrationPage,
        meta: {
            title: "Integración Simpson"
        }
    },
    {
        path: '/ode/runge-kutta',
        name: 'RungeKuttaPage',
        component: RungeKuttaPage,
        meta: {
            title: "Runge-Kutta 4° orden"
        }
    },
    {
        path: '*',
        name: 'Page404',
        component: Page404,
        meta: {
            title: "404"
        }
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

router.beforeEach((to, from, next) => {

    const nearestWithTitle = to.matched.slice().reverse().find(r => r.meta && r.meta.title);

    if(nearestWithTitle) {
        document.title = nearestWithTitle.meta.title;
    }

    next()
})

export default router
