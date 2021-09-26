<template>
  <div>
    <div class="columns is-mobile is-centered">
      <div class="column has-text-centered">
        <h5 class="subtitle is-5">P1</h5>
        <app-bisection-point-button :point="iteration.p1" :precision="precision"/>
      </div>
      <div class="column has-text-centered">
        <h5 class="subtitle is-5">P3</h5>
        <app-bisection-point-button :point="iteration.p3" :precision="precision"/>
      </div>
      <div class="column has-text-centered">
        <h5 class="subtitle is-5">P2</h5>
        <app-bisection-point-button :point="iteration.p2" :precision="precision"/>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import AppBisectionPointButton from '@/components/Bisection/AppBisectionPointButton.vue'
import {BisectionIteration} from '@/methods/Bisection'
import Vue from 'vue'

export default Vue.extend({
  name: "AppBisectionIterationButtons",
  components: {AppBisectionPointButton},
  props: {
    iteration: {type: Object as () => BisectionIteration},
    precision: {type: Number}
  }
})
</script>

<style scoped>

</style>