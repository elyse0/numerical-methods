<template>
  <AppContentAndPlot>

    <template #header>
      <AppHero title="Método de Newton-Raphson" :padding="1"/>
    </template>

    <template #content>
      <b-field label="Función f(x)" label-position="inside">
        <b-input v-model="inputFunctionFx"/>
      </b-field>

      <b-field grouped>
        <AppNumberInput label="Punto inicial" v-model="initialPoint"/>
        <AppNumberInput label="Precisión" v-model="precision" step="1"/>
      </b-field>

      <div v-if="parsedFunctionFx" class="has-text-centered" style="padding-bottom: 10px">
        <katex-element :expression="'f(x)='+parsedFunctionFx.toTex()"/>
      </div>

      <div v-if="newtonRaphson" class="has-text-centered">

        <div style="padding-bottom: 10px">
          <katex-element :expression="'f('+root.x + ') = ' + root.fx"/>
        </div>

        <b-field :label="'Iteración ' + (selectedIteration) + '/' + (newtonRaphson.iterations.length)"
                 v-if="newtonRaphson.iterations.length !== 1">
          <b-slider v-model="selectedIteration" :min="1" :max="newtonRaphson.iterations.length" ticks/>
        </b-field>

        <div>
          <AppRow>
            <katex-element :expression="`x_{${selectedIteration - 1}} =` + currentIteration.x"/>
          </AppRow>

          <AppRow>
            <katex-element :expression="'f('+currentIteration.x + ') = ' + currentIteration.fx"/>
          </AppRow>

          <AppRow>
            <katex-element :expression="'f\'('+currentIteration.x + ') = ' + currentIteration.dfx"/>
          </AppRow>

          <AppRow>
            <katex-element :expression="`x_{${selectedIteration}} =` + currentIteration.approximation"/>
          </AppRow>
        </div>

      </div>
    </template>

    <template #plot>
      <AppPlot name="newton-raphson" v-model="plot" :callback="updateGraph"/>
    </template>

  </AppContentAndPlot>
</template>

<script lang="ts">
import AppRow from '@/components/common/AppRow.vue'
import {Component, Vue, Watch} from 'vue-property-decorator'
import {MathNode} from 'mathjs'

import AppContentAndPlot from '@/components/layout/AppContentAndPlot.vue'
import AppHero from '@/components/AppHero.vue'
import AppPlot from '@/components/AppPlot.vue'
import AppNumberInput from '@/components/AppNumberInput.vue'

import NewtonRaphson, {NewtonRaphsonIterations} from '@/methods/NewtonRaphson'
import {Point, Root} from '@/methods/NumericalMethod'

@Component({
  components: {AppRow, AppContentAndPlot, AppHero, AppPlot, AppNumberInput}
})

export default class NewtonRaphsonPage extends Vue {

  inputFunctionFx: string = "x^2+3*x"
  initialPoint: number = 5
  precision: number = 4

  selectedIteration: number = 1
  plot: Window | null = null

  get newtonRaphson(): NewtonRaphson | null {
    return NewtonRaphson.create(this.inputFunctionFx, this.initialPoint)
  }

  get root(): Root | null {
    if (!this.newtonRaphson) {
      return null
    }

    return {
      x: NewtonRaphson.round(this.newtonRaphson.root.x, this.precision),
      fx: NewtonRaphson.round(this.newtonRaphson.root.fx, this.precision),
    }
  }

  get iterations(): NewtonRaphsonIterations[] | null {
    if (!this.newtonRaphson) {
      return null
    }

    return this.newtonRaphson.iterations
  }

  get currentIteration(): NewtonRaphsonIterations | null {
    if (!this.newtonRaphson) {
      return null
    }

    const iteration = this.newtonRaphson.iterations[this.selectedIteration - 1]
    return {
      x: NewtonRaphson.round(iteration.x, this.precision),
      fx: NewtonRaphson.round(iteration.fx, this.precision),
      dfx: NewtonRaphson.round(iteration.dfx, this.precision),
      approximation: NewtonRaphson.round(iteration.approximation, this.precision)
    }
  }

  get parsedFunctionFx(): MathNode | null {
    return NewtonRaphson.getParsedFunction(this.inputFunctionFx)
  }

  get linePattern(): Point[] | null {
    if (!this.currentIteration) {
      return null
    }

    const iteration = this.currentIteration
    return [
      {x: iteration.x, y: 0},
      {x: iteration.x, y: iteration.fx},
    ]
  }

  updateGraph() {
    if (!this.plot)
      return

    let message: any = {}
    message["functionFx"] = this.parsedFunctionFx ? "f(x)=" + this.parsedFunctionFx.toTex() : ""

    if (this.currentIteration) {
      message["derivativeFx"] =
          `f(x)=${this.currentIteration.dfx.toFixed(10)}*(x-${this.currentIteration.approximation.toFixed(10)})`
    }

    if (this.linePattern) {
      const xValues = this.linePattern.map((item) => item.x.toFixed(10))
      const yValues = this.linePattern.map((item) => item.y.toFixed(10))

      message["table"] = {x: xValues, y: yValues}
    }

    this.plot.postMessage(message, "*")
  }

  @Watch("parsedFunctionFx")
  onParsedFunctionFx() {
    this.updateGraph()
  }

  @Watch("selectedIteration")
  onSelectedIteration() {
    this.updateGraph()
  }

  @Watch("initialPoint")
  onInitialPoint() {
    this.updateGraph()
  }
}
</script>

<style scoped>

</style>