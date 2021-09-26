<template>
  <div id="app">

    <div class="container is-fluid">
      <br>
      <div class="columns">
        <div class="column">

          <b-field label="Función" label-position="inside">
            <b-input v-model="input"></b-input>
          </b-field>

          <b>Intervalo [a, b] en donde encuentra la raiz</b>
          <b-field grouped>
            <b-field label="a" label-position="inside">
              <b-input v-model="initialPoints.p1" type="number" step="0.0001" expanded></b-input>
            </b-field>
            <b-field label="b" label-position="inside">
              <b-input v-model="initialPoints.p2" type="number" step="0.0001" expanded></b-input>
            </b-field>
          </b-field>

          <div class="container" v-if="bisectionMethod">

            Raíz: {{bisectionMethod[bisectionMethod.length - 1].p3.x.toFixed(precision + 2)}}

            <div class="has-text-centered">
              <katex-element :expression="'f(x)='+parsedFunction.toTex()"/>
            </div>

            <b-field :label="'Iteración ' + this.selectedIteration"   v-if="bisectionMethod.length !== 1">
              <b-slider v-model="selectedIteration" :min="0" :max="bisectionMethod.length - 1" ticks></b-slider>
            </b-field>
            <br>
            <AppBisectionIterationButtons :iteration="bisectionMethod[selectedIteration]"
                                          :precision="precision + 2"/>

            {{bisectionMethod[selectedIteration]}}
          </div>
        </div>

        <div class="column">
          <vue-iframe
              src="/plot/plot.html"
              @load="onLoadIframe"
          />
        </div>

      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import {parse, simplify, MathNode} from 'mathjs'

import AppBisectionIterationButtons from '@/components/Bisection/AppBisectionIterationButtons.vue'
import {Bisection, BisectionInitialPoints, BisectionIteration} from '@/methods/Bisection'

export default Vue.extend({
  name: 'App',
  components: {AppBisectionIterationButtons},
  data: function () {
    return {
      input: '' as string,
      initialPoints: {p1: 0, p2: 0} as BisectionInitialPoints,
      myIframe: null as Window | null,
      selectedIteration: 0 as number,
      precision: 4 as number
    }
  },
  methods: {
    onLoadIframe(frame: HTMLFrameElement) {
      console.log("Iframe loaded")

      const window = frame.contentWindow

      if (window)
        this.myIframe = window
    },
    updateGraph() {
      if (!this.myIframe)
        return
      // @ts-ignore
      this.myIframe.postMessage({mathFunction: this.parsedFunction.toTex()})
      if (!this.bisectionMethod){
        // @ts-ignore
        this.myIframe.postMessage({p1: ''})
        // @ts-ignore
        this.myIframe.postMessage({p2: ''})
        // @ts-ignore
        this.myIframe.postMessage({p3: ''})
      } else {
        // @ts-ignore
        this.myIframe.postMessage({p1: this.bisectionMethod[this.selectedIteration].p1})
        // @ts-ignore
        this.myIframe.postMessage({p2: this.bisectionMethod[this.selectedIteration].p2})
        // @ts-ignore
        this.myIframe.postMessage({p3: this.bisectionMethod[this.selectedIteration].p3})
      }
    }
  },
  computed: {
    parsedFunction(): MathNode {
      try {
        return parse(this.input)
      } catch (e) {
        console.log("Error parsing function")
        return simplify('0')
      }
    },
    isIntervalValid(): boolean {
      console.log("Checking interval")
      return Bisection.isIntervalValid(this.parsedFunction, this.initialPoints)
    },
    bisectionMethod(): BisectionIteration[] | null {
      try {
        return Bisection.method(this.parsedFunction.compile(), this.initialPoints)
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
      }
    }
  },
  watch: {
    parsedFunction: function () {
      this.updateGraph()
    },
    selectedIteration: function () {
      this.updateGraph()
    },
    bisectionMethod: function (){
      this.updateGraph()
    }
  }
})
</script>

<style>
iframe{
  height: 600px !important;
}
</style>
