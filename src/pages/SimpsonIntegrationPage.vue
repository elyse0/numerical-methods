<template>
  <AppContentAndPlot>

    <template #header>
      <AppHero title="Integración Simpson" :padding="1"/>
    </template>

    <template #content>

      <b-field label="Integral" label-position="inside">
        <b-input v-model="inputFunction"/>
      </b-field>

      <b>Intervalo de integracion</b>
      <b-field grouped>
        <AppNumberInput label="a" v-model="integrationInterval.x0" @input="updatePlot"/>
        <AppNumberInput label="b" v-model="integrationInterval.x1" @input="updatePlot"/>
        <AppNumberInput label="Número de pasos" v-model="steps" :min="6" :max="100" @input="updatePlot"/>

      </b-field>

      <div>
        Type: {{simpsonIntegration.type}}
      </div>

      <div v-if="integrationLatex" class="has-text-centered">
        <katex-element :expression="integrationLatex"/>
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

import SimpsonIntegration from '@/methods/SimpsonIntegration'
import {IntegrationInterval} from '@/methods/NumericalMethod'

@Component({
  components: {AppContentAndPlot, AppHero, AppPlot, AppNumberInput}
})

export default class SimpsonIntegrationPage extends Vue {

  inputFunction: string = "1/(1+x)"
  integrationInterval: Partial<IntegrationInterval> = {x0: 0, x1: 1}
  steps: number = 6

  plot: Window | null = null

  get simpsonIntegration(): SimpsonIntegration | null {

    return SimpsonIntegration.create(this.inputFunction, this.integrationInterval, this.steps)
  }

  get integrationLatex(): string | null {

    if (!this.simpsonIntegration) {
      return null
    }

    const integralFunction = this.simpsonIntegration.integralFunction
    const integralValue = this.simpsonIntegration.integral.toFixed(4)

    return `${integralFunction}=${integralValue}`
  }

  updatePlot() {
    if (!this.plot) {
      return
    }

    let message: any = {}
    if (this.simpsonIntegration) {
      message["functionFx"] = this.simpsonIntegration.functionFx
      message["integral"] = this.simpsonIntegration.integralFunction
      message["integrationInterval"] = this.simpsonIntegration.integrationInterval
    }
    this.plot.postMessage(message, "*")
  }

}
</script>

<style scoped>

</style>