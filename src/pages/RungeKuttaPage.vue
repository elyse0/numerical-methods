<template>
  <AppContentAndPlot>

    <template #header>
      <AppHero title="Runge-Kutta 4° orden" :padding="1"/>
    </template>

    <template #content>

    </template>

    <template #plot>
      <AppPlot name="least-squares" v-model="plot" :callback="updatePlot"/>
    </template>

  </AppContentAndPlot>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator'

import AppContentAndPlot from '@/components/layout/AppContentAndPlot.vue'
import AppHero from '@/components/AppHero.vue'
import AppPlot from '@/components/AppPlot.vue'
import AppPointsList from '@/components/AppPointsList.vue'

import RungeKutta from '@/methods/RungeKutta'

@Component({
  components: {AppContentAndPlot, AppHero, AppPlot, AppPointsList}
})

export default class RungeKuttaPage extends Vue {

  plot: Window | null = null

  updatePlot() {
    if (!this.plot) {
      return
    }

    let message: any = {}
    this.plot.postMessage(message, "*")
  }

  mounted() {

    RungeKutta.create("x*y^(1/2)", {x: 1, y: 4}, 0.2)
  }

}
</script>

<style scoped>

</style>