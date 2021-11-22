<template>
  <AppContentLayout>
    <div class="columns">
      <div class="column">
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

          <b-field :label="'Iteración ' + (this.selectedIteration) + '/' + (this.taylorSeries.iterations.length)">
            <b-slider v-model="selectedIteration" :min="1" :max="this.taylorSeries.iterations.length" ticks/>
          </b-field>

          <b-button @click="updatePlot">Click me</b-button>
          {{taylorSeries}}
        </div>
      </div>

      <div class="column">
        <AppPlot name="taylor-series" v-model="plot"/>
      </div>
    </div>
  </AppContentLayout>
</template>

<script lang="ts">
import {Component, Vue, Watch} from 'vue-property-decorator'

import TaylorSeries from '@/methods/TaylorSeries'

import AppContentLayout from '@/components/layout/AppContentLayout.vue'
import AppNumberInput from '@/components/AppNumberInput.vue'
import AppPlot from '@/components/AppPlot.vue'

@Component({
  components: {AppContentLayout, AppNumberInput, AppPlot}
})

export default class TaylorSeriesPage extends Vue {

  inputFunction: string = "e^x"
  iterations: number = 3

  selectedIteration: number = 1

  plot: Window | null = null

  get taylorSeries(): TaylorSeries | null {
    return TaylorSeries.create("e^x", this.iterations)
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