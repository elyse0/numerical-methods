<template>
  <AppContentAndPlot>

    <template #header>
      <AppHero title="Método de punto fijo" :padding="1"/>
    </template>

    <template #content>
      <b-field label="Función f(x)" label-position="inside">
        <b-input v-model="inputFunctionFx"/>
      </b-field>

      <b-field label="Función g(x)" label-position="inside">
        <b-input v-model="inputFunctionGx"/>
      </b-field>

      <b-field grouped>
        <AppNumberInput label="Punto inicial" v-model="initialPoint" @input="updateGraph"/>
        <AppNumberInput label="Precisión" v-model="precision" step="1" :min="1" :max="8" @input="updateGraph"/>
      </b-field>

      <div v-if="parsedFunctionFx" class="has-text-centered" style="padding-bottom: 10px">
        <katex-element :expression="'f(x)='+parsedFunctionFx.toTex()"/>
      </div>

      <div v-if="parsedFunctionGx" class="has-text-centered" style="padding-bottom: 10px">
        <katex-element :expression="'g(x)='+parsedFunctionGx.toTex()"/>
      </div>

      <div v-if="fixedPoint" class="container has-text-centered">

        <div style="padding-bottom: 10px">
          <katex-element :expression="'f('+root.x + ') = ' + root.fx"/>
        </div>

        <b-field :label="'Iteración ' + (selectedIteration) + '/' + (fixedPoint.iterations.length)"
                 v-if="fixedPoint.iterations.length !== 1">
          <b-slider v-model="selectedIteration" :min="1" :max="fixedPoint.iterations.length" ticks/>
        </b-field>
        <div>
          <katex-element :expression="'x='+currentIteration.x"/>
        </div>
        <div>
          <katex-element :expression="'f('+currentIteration.x+')='+currentIteration.fx"/>
        </div>
        <div>
          <katex-element :expression="'g('+currentIteration.x+')='+currentIteration.gx"/>
        </div>
      </div>
    </template>

    <template #plot>
      <AppPlot name="fixed-point" v-model="plot" :callback="updateGraph"/>
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

import FixedPoint, {FixedPointIteration} from '@/methods/FixedPoint'
import {Point, Root} from '@/methods/NumericalMethod'

@Component({
  components: {AppRow, AppContentAndPlot, AppHero, AppPlot, AppNumberInput}
})

export default class FixedPointPage extends Vue {

  inputFunctionFx: string = "x^2-2*x-3"
  inputFunctionGx: string = "(2*x+3)^(1/2)"
  initialPoint: number = 4
  precision: number = 4

  selectedIteration: number = 1
  plot: Window | null = null

  get fixedPoint(): FixedPoint | null {

    return FixedPoint.create(this.inputFunctionFx, this.inputFunctionGx, this.initialPoint, this.precision)
  }

  get root(): Root | null {
    if (!this.fixedPoint) {
      return null
    }

    return {
      x: FixedPoint.round(this.fixedPoint.root.x, this.precision),
      fx: FixedPoint.round(this.fixedPoint.root.fx, this.precision),
    }
  }

  get currentIteration(): FixedPointIteration | null {
    if (!this.fixedPoint) {
      return null
    }

    const iteration = this.fixedPoint.iterations[this.selectedIteration - 1]
    return {
      x: FixedPoint.round(iteration.x, this.precision + 1),
      fx: FixedPoint.round(iteration.fx, this.precision + 1),
      gx: FixedPoint.round(iteration.gx, this.precision + 1)
    }
  }

  get currentLinePattern(): Point[] | null {
    if (!this.linePattern) {
      return null
    }

    if (this.selectedIteration === this.fixedPoint?.iterations.length) {
      return this.linePattern
    }

    return this.linePattern.slice(0, this.selectedIteration * 2 + 1)
  }

  get parsedFunctionFx(): MathNode | null {
    return FixedPoint.getParsedFunction(this.inputFunctionFx)
  }

  get parsedFunctionGx(): MathNode | null {
    return FixedPoint.getParsedFunction(this.inputFunctionGx)
  }

  updateGraph() {
    if (!this.plot)
      return

    let message: any = {}
    message["functionFx"] = this.parsedFunctionFx ? "f(x)=" + this.parsedFunctionFx.toTex() : ""
    message["functionGx"] = this.parsedFunctionGx ? "f(x)=" + this.parsedFunctionGx.toTex() : ""

    if (this.currentLinePattern) {
      const xValues = this.currentLinePattern.map((item) => item.x.toString())
      const yValues = this.currentLinePattern.map((item) => item.y.toString())

      message["table"] = {x: xValues, y: yValues}
    }

    this.plot.postMessage(message, "*")
  }

  get linePattern(): Point[] | null{

    function getLinePatternIteration(fixedPointIterations: FixedPointIteration[]): Point[] {
      if (fixedPointIterations.length == 1) {
        return [{x: fixedPointIterations[0].gx, y: fixedPointIterations[0].gx}]
      }

      return [
        {x: fixedPointIterations[0].gx, y: fixedPointIterations[0].gx},
        {x: fixedPointIterations[0].gx, y: fixedPointIterations[1].gx}
      ].concat(getLinePatternIteration(fixedPointIterations.slice(1)))
    }

    if (!this.fixedPoint) {
      return null
    }

    const fixedPointIterations = this.fixedPoint.iterations

    let init = [
      {x: fixedPointIterations[0].x, y: 0},
      {x: fixedPointIterations[0].x, y: fixedPointIterations[0].gx}
    ]

    return init.concat(getLinePatternIteration(fixedPointIterations))
  }

  @Watch("parsedFunctionFx")
  onParsedFunctionFx() {
    this.updateGraph()
  }

  @Watch("parsedFunctionGx")
  onParsedFunctionGx() {
    this.updateGraph()
  }

  @Watch("selectedIteration")
  onSelectedIteration() {
    this.updateGraph()
  }

}
</script>

<style scoped>

</style>