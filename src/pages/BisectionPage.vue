<template>
  <AppLayout>
    <br>
    <div class="columns">

      <div class="column">

        <b-field label="Función" label-position="inside">
          <b-input v-model="inputFunction"/>
        </b-field>

        <b>Intervalo [a, b] en donde encuentra la raiz</b>
        <b-field grouped>
          <AppNumberInput label="a" v-model="initialPoints.p1"/>
          <AppNumberInput label="b" v-model="initialPoints.p2"/>
        </b-field>

        <div v-if="parsedFunction" class="has-text-centered" style="padding-bottom: 10px">
          <katex-element :expression="'f(x)='+parsedFunction.toTex()"/>
        </div>

        <div v-if="bisectionMethod && isIntervalValid" class="container has-text-centered" >
          <div style="padding-bottom: 10px">
            <katex-element :expression="'f(0)='+root"/>
          </div>

          <b-field :label="'Iteración ' + this.selectedIteration" v-if="bisectionMethod.bisectionIterations.length !== 1">
            <b-slider v-model="selectedIteration" :min="0" :max="bisectionMethod.bisectionIterations.length - 1" ticks></b-slider>
          </b-field>
          <br>
          <AppBisectionIterationButtons :iteration="bisectionMethod.bisectionIterations[selectedIteration]"
                                        :precision="precision + 1"/>
        </div>

      </div>

      <div class="column">
        <vue-iframe
            src="/plot/plot.html"
            @load="onLoadIframe"
        />
      </div>

    </div>
  </AppLayout>
</template>

<script lang="ts">
import AppNumberInput from '@/components/AppNumberInput.vue'
import {Component, Vue, Watch} from 'vue-property-decorator'
import {MathNode} from 'mathjs'

import AppLayout from '@/components/layout/AppLayout.vue'
import AppBisectionIterationButtons from '@/components/Bisection/AppBisectionIterationButtons.vue'

import {Bisection, BisectionInitialPoints} from '@/methods/Bisection'

@Component({
  components: {AppNumberInput, AppLayout, AppBisectionIterationButtons}
})

export default class BisectionPage extends Vue {

  inputFunction: string = ""
  initialPoints: BisectionInitialPoints = {p1: 0, p2: 0}
  precision: number = 4

  selectedIteration: number = 0
  myIframe: Window | null = null

  get bisectionMethod(): Bisection | null {

    console.log("Computing bisection method")
    if (this.parsedFunction && this.isIntervalValid)
      return Bisection.create(this.inputFunction, this.initialPoints)

    return null
  }

  get root(): number | null {
    if (!this.bisectionMethod){
      return null
    }

    return Bisection.round(this.bisectionMethod.root)
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

  @Watch("parsedFunction")
  onParsedFunction() {
    this.updateGraph()
  }

  @Watch("selectedIteration")
  onSelectedIteration() {
    this.updateGraph()
  }

  @Watch("bisectionMethod")
  onBisectionMethod() {
    this.updateGraph()
  }

  onLoadIframe(frame: HTMLFrameElement) {
    const window = frame.contentWindow

    if (window)
      this.myIframe = window
  }

  updateGraph() {
    if (!this.myIframe)
      return

    if (!this.parsedFunction) {
      this.myIframe.postMessage({mathFunction: ""}, "*")
    } else {
      this.myIframe.postMessage({mathFunction: "f(x)=" + this.parsedFunction.toTex()}, "*")
    }

    if (!this.bisectionMethod) {
      this.myIframe.postMessage({p1: ''}, "*")
      this.myIframe.postMessage({p2: ''}, "*")
      this.myIframe.postMessage({p3: ''}, "*")
    } else {
      this.myIframe.postMessage({p1: this.bisectionMethod.bisectionIterations[this.selectedIteration].p1}, "*")
      this.myIframe.postMessage({p2: this.bisectionMethod.bisectionIterations[this.selectedIteration].p2}, "*")
      this.myIframe.postMessage({p3: this.bisectionMethod.bisectionIterations[this.selectedIteration].p3}, "*")
    }
  }

}
</script>

<style>
iframe {
  height: 600px !important;
}
</style>