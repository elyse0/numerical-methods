<template>
  <AppContentAndPlot>

    <template #header>
      <AppHero title="Método de Bisección" :padding="1"></AppHero>
    </template>

    <template #content>
      <b-field label="Función" label-position="inside">
        <b-input v-model="inputFunction"/>
      </b-field>

      <b>Intervalo [a, b] en donde encuentra la raiz</b>
      <b-field grouped>
        <AppNumberInput label="a" v-model="initialPoints.p1" @input="updateGraph"/>
        <AppNumberInput label="b" v-model="initialPoints.p2" @input="updateGraph"/>
        <AppNumberInput label="Precisión" v-model="precision" step="1" :min="1" :max="8" @input="updateGraph"/>
      </b-field>

      <div v-if="parsedFunction" class="has-text-centered" style="padding-bottom: 10px">
        <AppLatexFunction :input-function="inputFunction" fx/>
      </div>

      <div v-if="bisectionMethod && isIntervalValid" class="container has-text-centered" >
        <div style="padding-bottom: 10px">
          <AppLatexFunction :input-function="root.fx.toString()" :x="root.x.toString()" fx/>
        </div>

        <b-field :label="'Iteración ' + (selectedIteration) + '/' + (bisectionMethod.bisectionIterations.length)"
                 v-if="bisectionMethod.bisectionIterations.length !== 1">
          <b-slider v-model="selectedIteration" :min="1" :max="bisectionMethod.bisectionIterations.length" ticks/>
        </b-field>
        <br>
        <AppBisectionIterationButtons :iteration="currentIteration" :precision="precision + 1"/>
      </div>
    </template>

    <template #plot>
      <AppPlot name="bisection" v-model="plot"/>
    </template>

  </AppContentAndPlot>
</template>

<script lang="ts">
import {Component, Vue, Watch} from 'vue-property-decorator'
import {MathNode} from 'mathjs'

import AppContentAndPlot from '@/components/layout/AppContentAndPlot.vue'
import AppHero from '@/components/AppHero.vue'
import AppPlot from '@/components/AppPlot.vue'
import AppLatexFunction from '@/components/AppLatexFunction.vue'
import AppNumberInput from '@/components/AppNumberInput.vue'
import AppBisectionIterationButtons from '@/components/Bisection/AppBisectionIterationButtons.vue'

import {Bisection, BisectionInitialPoints, BisectionIteration, isBisectionInitialPoints} from '@/methods/Bisection'
import {Root} from '@/methods/NumericalMethod'

@Component({
  components: {
    AppContentAndPlot, AppHero, AppPlot, AppLatexFunction, AppNumberInput, AppBisectionIterationButtons}
})

export default class BisectionPage extends Vue {

  inputFunction: string = ""
  initialPoints: Partial<BisectionInitialPoints> = {p1: 0, p2: 0}
  precision: number = 4

  selectedIteration: number = 0
  plot: Window | null = null

  get bisectionMethod(): Bisection | null {

    return Bisection.create(this.inputFunction, this.initialPoints, this.precision)
  }

  get root(): Root | null {
    if (!this.bisectionMethod){
      return null
    }

    return {
      x: Bisection.round(this.bisectionMethod.root.x),
      fx: Bisection.round(this.bisectionMethod.root.fx)
    }
  }

  get currentIteration(): BisectionIteration | null {
    if (!this.bisectionMethod) {
      return null
    }

    return this.bisectionMethod.bisectionIterations[this.selectedIteration - 1]
  }

  get parsedFunction(): MathNode | null {

    return Bisection.getParsedFunction(this.inputFunction)
  }

  get isIntervalValid(): boolean {
    if (!this.parsedFunction) {
      return false
    }
    return Bisection.isIntervalValid(this.parsedFunction, this.initialPoints)
  }

  updateGraph() {

    if (!this.plot) {
      return
    }

    const message: any = {}
    const parsedFunction = this.parsedFunction

    if (parsedFunction) {
      message["mathFunction"] = Bisection.getFxEquation(parsedFunction.toString())
    }

    if (!this.currentIteration && parsedFunction) {
      if (isBisectionInitialPoints(this.initialPoints)) {
        message["p1"] = {x: this.initialPoints.p1, fx: Bisection.evaluate(parsedFunction.compile(), this.initialPoints.p1)}
        message["p2"] = {x: this.initialPoints.p2, fx: Bisection.evaluate(parsedFunction.compile(), this.initialPoints.p2)}
      }
    }

    if (this.currentIteration) {
      message["p1"] = this.currentIteration.p1
      message["p2"] = this.currentIteration.p2
      message["p3"] = this.currentIteration.p3
    }

    this.plot.postMessage(message, "*")
  }

  @Watch("parsedFunction")
  onParsedFunction() {
    this.updateGraph()
  }

  @Watch("bisectionMethod")
  onBisectionMethod() {
    this.updateGraph()
  }

  @Watch("currentIteration")
  onCurrentIteration() {
    this.updateGraph()
  }

}
</script>

<style>

</style>