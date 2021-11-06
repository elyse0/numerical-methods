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
          <b-field label="a" label-position="inside">
            <b-input v-model="initialPoints.p1" type="number" step="0.0001" expanded/>
          </b-field>
          <b-field label="b" label-position="inside">
            <b-input v-model="initialPoints.p2" type="number" step="0.0001" expanded/>
          </b-field>
        </b-field>

        <div v-if="parsedFunction" class="has-text-centered">
          <katex-element :expression="'f(x)='+parsedFunction.toTex()"/>
        </div>

        <div v-if="bisectionMethod" class="container">
          Raíz: {{ root }}

          <b-field :label="'Iteración ' + this.selectedIteration" v-if="bisectionMethod.length !== 1">
            <b-slider v-model="selectedIteration" :min="0" :max="bisectionMethod.length - 1" ticks></b-slider>
          </b-field>
          <br>
          <AppBisectionIterationButtons :iteration="bisectionMethod[selectedIteration]"
                                        :precision="precision + 2"/>
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
import {Component, Vue, Watch} from 'vue-property-decorator'
import {MathNode, parse} from 'mathjs'

import AppLayout from '@/components/layout/AppLayout.vue'
import AppBisectionIterationButtons from '@/components/Bisection/AppBisectionIterationButtons.vue'

import {Bisection, BisectionInitialPoints, BisectionIteration} from '@/methods/Bisection'

@Component({
  components: {AppLayout, AppBisectionIterationButtons}
})

export default class BisectionPage extends Vue {

  inputFunction: string = ""
  initialPoints: BisectionInitialPoints = {p1: 0, p2: 0}
  precision: number = 4
  selectedIteration: number = 0
  myIframe: Window | null = null

  onLoadIframe(frame: HTMLFrameElement) {
    const window = frame.contentWindow

    if (window)
      this.myIframe = window
  }

  updateGraph() {
    if (!this.myIframe)
      return

    if (!this.parsedFunction) {
      this.myIframe.postMessage({mathFunction: ""})
    } else {
      this.myIframe.postMessage({mathFunction: "f(x)=" + this.parsedFunction.toTex()})
    }

    if (!this.bisectionMethod) {
      this.myIframe.postMessage({p1: ''})
      this.myIframe.postMessage({p2: ''})
      this.myIframe.postMessage({p3: ''})
    } else {
      this.myIframe.postMessage({p1: this.bisectionMethod[this.selectedIteration].p1})
      this.myIframe.postMessage({p2: this.bisectionMethod[this.selectedIteration].p2})
      this.myIframe.postMessage({p3: this.bisectionMethod[this.selectedIteration].p3})
    }
  }

  get bisectionMethod(): BisectionIteration[] | null {

    if (!this.parsedFunction) {
      return null
    }

    if (!this.isIntervalValid) {
      return null
    }

    console.log("Method ready")

    return Bisection.method(this.parsedFunction.compile(), this.initialPoints)

    /*try {

    } catch (e) {
      console.log(e)
      this.$buefy.toast.open({
        duration: 2500,
        message: "La función ingresada no es valida",
        position: 'is-bottom',
        type: 'is-danger'
      })
      // eslint-disable-next-line vue/no-async-in-computed-properties
      setTimeout(() => {
        location.reload()
      }, 1000)
      return null
    }*/
  }

  get root(): number | null {
    if (!this.bisectionMethod){
      return null
    }

    const lastIteration = this.bisectionMethod[this.bisectionMethod.length - 1]
    return lastIteration.p3.x.toFixed(this.precision + 2)
  }

  get parsedFunction(): MathNode | null {
    try {
      const parsedFunction = parse(this.inputFunction)

      if (parsedFunction.equals(parse(""))) {
        return null
      }

      return parsedFunction
    } catch (e) {
      console.log("Error parsing function")
      return null
    }
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
}
</script>

<style>
iframe {
  height: 600px !important;
}
</style>