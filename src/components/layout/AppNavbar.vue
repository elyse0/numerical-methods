<template>
  <b-navbar>
    <template #brand>
      <b-navbar-item tag="router-link" :to="{ path: '/' }">
        <img alt="Logo" :src="logoPath" height="50" width="45">
      </b-navbar-item>
    </template>

    <template #start>

      <b-navbar-item>
        <b-navbar-dropdown label="Iterativos">
          <b-navbar-item tag="router-link" :to="{ path: '/root-of-polynomials/bisection' }">Método de Bisección</b-navbar-item>
          <b-navbar-item tag="router-link" :to="{ path: '/root-of-polynomials/fixed-point' }">Método de Punto fijo</b-navbar-item>
          <b-navbar-item tag="router-link" :to="{ path: '/root-of-polynomials/newton-raphson' }">Método de Newton-Raphson</b-navbar-item>
        </b-navbar-dropdown>
      </b-navbar-item>

      <b-navbar-item>
        <b-navbar-dropdown label="Ecuaciones Lineales">
          <b-navbar-item tag="router-link" :to="{ path: '/linear-system/gauss-seidel' }">Método de Gauss-Seidel</b-navbar-item>
          <b-navbar-item tag="router-link" :to="{ path: '/linear-system/jacobi' }">Método de Jacobi</b-navbar-item>
        </b-navbar-dropdown>
      </b-navbar-item>

      <b-navbar-item>
        <b-navbar-dropdown label="Interpolación">
          <b-navbar-item tag="router-link" :to="{ path: '/interpolation/linear' }">Interpolación lineal</b-navbar-item>
          <b-navbar-item tag="router-link" :to="{ path: '/interpolation/quadratic' }">Interpolación cuadrática</b-navbar-item>
          <b-navbar-item tag="router-link" :to="{ path: '/interpolation/lagrange-polynomial' }">Interpolación por método de Lagrange</b-navbar-item>
          <b-navbar-item tag="router-link" :to="{ path: '/interpolation/least-squares' }">Interpolación por minimos cuadrados</b-navbar-item>
        </b-navbar-dropdown>
      </b-navbar-item>

      <b-navbar-item>
        <b-navbar-dropdown label="Integración">
          <b-navbar-item tag="router-link" :to="{ path: '/integration/trapezoidal' }">Integración Trapezoidal</b-navbar-item>
          <b-navbar-item tag="router-link" :to="{ path: '/integration/simpson-1-3' }">Integración Simpson 1/3</b-navbar-item>
          <b-navbar-item tag="router-link" :to="{ path: '/integration/simpson-3-8' }">Integración Simpson 3/8</b-navbar-item>
        </b-navbar-dropdown>
      </b-navbar-item>

      <b-navbar-item>
        <b-navbar-dropdown label="Aproximación">
          <b-navbar-item tag="router-link" :to="{ path: '/approximation/taylor-series' }">Series de Taylor</b-navbar-item>
        </b-navbar-dropdown>
      </b-navbar-item>

      <b-navbar-item>
        <b-navbar-dropdown label="EDO">
          <b-navbar-item tag="router-link" :to="{ path: '/ode/runge-kutta' }">Runge-Kutta</b-navbar-item>
        </b-navbar-dropdown>
      </b-navbar-item>

    </template>

    <template #end>
    </template>

  </b-navbar>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator'

@Component
export default class AppNavbar extends Vue {

  logoPath = process.env.BASE_URL + "cube.png"
}
</script>

<style scoped>
nav.navbar {
  background-color: transparent;
}

.navbar-item img {
  max-height: 3rem;
}
</style>