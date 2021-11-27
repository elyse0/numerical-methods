<template>

  <AppContentAndPlot>

    <template #header>
      <AppHero title="Integración trapezoidal" :padding="1"/>
    </template>

    <template #content>

      <b-field label="Función" label-position="inside">
        <b-input v-model="inputFunction"/>
      </b-field>

      <b>Intervalo de integracion</b>
      <b-field grouped>
        <AppNumberInput label="a" v-model="integrationInterval.x0" @input="updatePlot"/>
        <AppNumberInput label="b" v-model="integrationInterval.x1" @input="updatePlot"/>
        <AppNumberInput label="Número de pasos" v-model="steps" :min="6" :max="12" @input="updatePlot"/>
      </b-field>

      <div class="has-text-centered" v-if="integralLatex">
        <katex-element :expression="integralLatex"/>
      </div>

      <div v-if="trapezoidalIntegration">


      </div>

    </template>

    <template #plot>
      <AppPlot name="integration" v-model="plot" :callback="updatePlot"/>
    </template>

  </AppContentAndPlot>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator'

import AppContentAndPlot from '@/components/layout/AppContentAndPlot.vue'
import AppHero from '@/components/AppHero.vue'
import AppPlot from '@/components/AppPlot.vue'
import AppNumberInput from '@/components/AppNumberInput.vue'

import TrapezoidalIntegration from '@/methods/TrapezoidalIntegration'
import {IntegrationInterval} from '@/methods/NumericalMethod'

@Component({
  components: {AppContentAndPlot, AppHero, AppPlot, AppNumberInput}
})

export default class TrapezoidalIntegrationPage extends Vue {

  inputFunction: string = "x^2+3"
  steps: number = 6
  integrationInterval: Partial<IntegrationInterval> = {x0: 0, x1: 3}

  plot: Window | null = null

  get trapezoidalIntegration(): TrapezoidalIntegration | null {

    return TrapezoidalIntegration.create(this.inputFunction, this.integrationInterval, this.steps)
  }

  get integralLatex(): string | null {
    if (!this.trapezoidalIntegration) {
      return null
    }

    const integralFunction = this.trapezoidalIntegration.integralFunction
    const integralValue = this.trapezoidalIntegration.integral.toFixed(4)

    return `${integralFunction}=${integralValue}`
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