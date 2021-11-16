<template>
  <div>
    <div class="buttons">
      <b-button tag="router-link"
                to="/bisection"
                type="is-link"
                label="Método de Bisección"
      />
      <b-button tag="router-link"
                to="/fixed-point"
                type="is-link"
                label="Método de Punto fijo"
      />
      <b-button tag="router-link"
                to="/newton-raphson"
                type="is-link"
                label="Método de Newton-Raphson"
      />
      <b-button tag="router-link"
                to="/jacobi"
                type="is-link"
                label="Jacobi"
      />
      <b-button tag="router-link"
                to="/least-squares"
                type="is-link"
                label="Least squares"
      />
    </div>

    <div class="columns">
      <div class="column">
        <AppMatrix></AppMatrix>
      </div>
      <div class="column">

      </div>
      <div class="column">

      </div>
    </div>

  </div>
</template>

<script lang="ts">
import AppMatrix from '@/components/AppMatrix.vue'
import {Component, Vue} from 'vue-property-decorator'
@Component({
  components: {AppMatrix}
})
export default class Mainpage extends Vue {

}
</script>

<style scoped>

</style>