<template>

  <AppContentAndPlot>

    <template #header>
      <AppHero title="Integración trapezoidal" :padding="1"/>
    </template>

    <template #content>
      <div v-if="trapezoidalIntegration">
        <katex-element :expression="trapezoidalIntegration.integralFunction"/>
        {{trapezoidalIntegration.integral}}
      </div>
      <b-button @click="updatePlot">Click me</b-button>
    </template>

    <template #plot>
      <AppPlot name="integration" v-model="plot" :callback="updatePlot"/>
    </template>

  </AppContentAndPlot>
</template>

<script lang="ts">
import AppContentAndPlot from '@/components/layout/AppContentAndPlot.vue'
import {Component, Vue} from 'vue-property-decorator'

import AppContentLayout from '@/components/layout/AppContentLayout.vue'
import AppHero from '@/components/AppHero.vue'
import AppPlot from '@/components/AppPlot.vue'

import TrapezoidalIntegration from '@/methods/TrapezoidalIntegration'

@Component({
  components: {AppContentAndPlot, AppContentLayout, AppHero, AppPlot}
})

export default class TrapezoidalIntegrationPage extends Vue {


  plot: Window | null = null

  get trapezoidalIntegration(): TrapezoidalIntegration | null {

    return TrapezoidalIntegration.create("x^2+3", {x0: 0, x1: 3}, 6)
  }

  updatePlot() {
    if (!this.plot) {
      return
    }

    let message: any = {}
    if (this.trapezoidalIntegration) {
      message["functionFx"] = this.trapezoidalIntegration.functionFx
      message["integral"] = this.trapezoidalIntegration.integralFunction
      message["integrationInterval"] = this.trapezoidalIntegration.integrationInterval
    }
    this.plot.postMessage(message, "*")
  }

}
</script>

<style scoped>

</style>