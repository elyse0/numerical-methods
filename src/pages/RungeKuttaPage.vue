<template>
  <AppContentAndPlot>

    <template #header>
      <AppHero title="Runge-Kutta 4° orden" :padding="1"/>
    </template>

    <template #content>

      <b-field label="Integral" label-position="inside">
        <b-input v-model="inputFunction"/>
      </b-field>

      <b>Condiciones iniciales</b>
      <b-field grouped>
        <AppNumberInput label="x" v-model="initialConditions.x" @input="updatePlot"/>
        <AppNumberInput label="y" v-model="initialConditions.y" @input="updatePlot"/>
        <AppNumberInput label="Tamaño de paso (h)" v-model="stepSize" :min="0.0001" :max="100" @input="updatePlot"/>
      </b-field>

      <div>
        Iteraciones:
        <b-table :data="tableContent" :columns="tableColumns"></b-table>
      </div>

    </template>

    <template #plot>
      <AppPlot name="least-squares" v-model="plot" :callback="updatePlot"/>
    </template>

  </AppContentAndPlot>
</template>

<script lang="ts">
import {Point} from '@/methods/NumericalMethod'
import {Component, Vue} from 'vue-property-decorator'

import AppContentAndPlot from '@/components/layout/AppContentAndPlot.vue'
import AppHero from '@/components/AppHero.vue'
import AppPlot from '@/components/AppPlot.vue'
import AppNumberInput from '@/components/AppNumberInput.vue'

import RungeKutta from '@/methods/RungeKutta'

@Component({
  components: {AppContentAndPlot, AppPlot, AppHero, AppNumberInput}
})

export default class RungeKuttaPage extends Vue {

  inputFunction: string = "x*y^(1/2)"
  initialConditions: Partial<Point> = {x: 1, y: 4}
  stepSize: number = 0.2

  plot: Window | null = null

  tableColumns = [
      {field: "x", label: "x"},
      {field: "y", label: "y"},
      {field: "k1", label: "k1"},
      {field: "k2", label: "k2"},
      {field: "k3", label: "k3"},
      {field: "k4", label: "k4"},
      {field: "yi", label: "yi"},
  ]

  get rungeKutta(): RungeKutta | null {

    return RungeKutta.create(this.inputFunction, this.initialConditions, this.stepSize)
  }

  get tableContent(): object[] | null {

    if (!this.rungeKutta) {
      return null
    }

    return this.rungeKutta.iterations.map((iteration, index, array) => {

      return {
        k1: iteration.k1.toFixed(4),
        k2: iteration.k2.toFixed(4),
        k3: iteration.k3.toFixed(4),
        k4: iteration.k4.toFixed(4),
        x: iteration.x.toFixed(4),
        y: iteration.y.toFixed(4),
        yi: index + 1 === array.length ? '' : array[index + 1].y.toFixed(4)
      }
    })
  }

  updatePlot() {
    if (!this.plot) {
      return
    }

    let message: any = {}
    this.plot.postMessage(message, "*")
  }

}
</script>

<style scoped>

</style>