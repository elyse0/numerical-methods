<template>
  <AppContentAndPlot>

    <template #header>
      <AppHero title="Serie de Taylor" :padding="1"/>
    </template>

    <template #content>
      <b-field label="Función" label-position="inside">
        <b-input v-model="inputFunction" @input="updatePlot"/>
      </b-field>
      <b>Número de iteraciones</b>
      <b-field grouped>
        <AppNumberInput label="Iteraciones" v-model="iterations" :min="1" @input="updatePlot"/>
      </b-field>

      <katex-element :expression="parsedInputFunction"/>

      <div v-if="taylorSeries">

        <katex-element :expression="approximationSum"/>

        <b-field :label="'Iteración ' + (selectedIteration) + '/' + (taylorSeries.iterations.length)">
          <b-slider v-model="selectedIteration" :min="1" :max="taylorSeries.iterations.length" ticks/>
        </b-field>

        <b-button @click="updatePlot">Click me</b-button>
        {{taylorSeries}}
      </div>
    </template>

    <template #plot>
      <AppPlot name="taylor-series" v-model="plot"/>
    </template>

  </AppContentAndPlot>
</template>

<script lang="ts">
import {Component, Vue, Watch} from 'vue-property-decorator'

import AppContentAndPlot from '@/components/layout/AppContentAndPlot.vue'
import AppHero from '@/components/AppHero.vue'
import AppPlot from '@/components/AppPlot.vue'
import AppNumberInput from '@/components/AppNumberInput.vue'

import TaylorSeries from '@/methods/TaylorSeries'

@Component({
  components: {AppContentAndPlot, AppHero, AppPlot, AppNumberInput}
})

export default class TaylorSeriesPage extends Vue {

  inputFunction: string = "e^x"
  iterations: number = 3

  selectedIteration: number = 1

  plot: Window | null = null

  get taylorSeries(): TaylorSeries | null {
    return TaylorSeries.create(this.inputFunction, this.iterations)
  }

  get approximationSum(): string | null {
    if (!this.taylorSeries) {
      return null
    }
    const filterIterations = this.taylorSeries.iterations.slice(0, this.selectedIteration)
    const sum = filterIterations.reduce((approximationSum, iteration) => `${approximationSum}+${iteration}`, "")
    return `f(x)=${sum}`
  }

  get parsedInputFunction(): string{
    return TaylorSeries.getFxEquation(this.inputFunction)
  }

  updatePlot() {
    if (!this.plot) {
      return
    }

    let message: any = {}
    if (this.taylorSeries) {
      message["functionFx"] = this.parsedInputFunction
      message["approximationFx"] = this.approximationSum
    }
    this.plot.postMessage(message, "*")
  }

  @Watch("taylorSeries")
  onTaylorSeries() {
    this.updatePlot()
  }

  @Watch("selectedIteration")
  onSelectedIteration() {
    this.updatePlot()
  }

}
</script>

<style scoped>

</style>