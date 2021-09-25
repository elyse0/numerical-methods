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
              <b-input v-model="firstPoint" type="number" step="0.0001" expanded></b-input>
            </b-field>
            <b-field label="b" label-position="inside">
              <b-input v-model="secondPoint" type="number" step="0.0001" expanded></b-input>
            </b-field>
          </b-field>


          <p><b>Función:</b> {{ parsedFunction }}</p>
          <p><b>Latex de función:</b> {{parsedFunction.toTex()}}</p>
          <p><b>Punto inicial:</b> {{ firstPoint }}</p>

          {{isIntervalValid}}
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
import {parse, simplify, derivative, evaluate} from 'mathjs'

export default Vue.extend({
  name: 'App',
  components: {},
  data: function () {
    return {
      input: '',
      firstPoint: 0,
      secondPoint: 0,
      myIframe: any ,
      msg: ''
    }
  },
  methods: {
    onLoadIframe(frame: HTMLFrameElement) {
      console.log("Iframe loaded")

      const window = frame.contentWindow

      if (window)
        this.myIframe = window
    },
    bisectionMethod() {
    }
  },
  computed: {
    parsedFunction() {
      try {
        return parse(this.input)
      } catch (e) {
        console.log("Error parsing function")
        return simplify('0')
      }
    },
    derivative() {
      return derivative(this.parsedFunction, 'x')
    },
    isIntervalValid(){
      const f1 = evaluate(this.parsedFunction.toString(), {x: this.firstPoint})
      const f2 = evaluate(this.parsedFunction.toString(), {x: this.secondPoint})
      return (f1 * f2) < 0
    }
  },
  watch: {
    parsedFunction: function (value) {

      const latex =  value.toTex().toString()
      console.log(latex)
      this.myIframe.postMessage({function: latex})
    }
  }
})
</script>

<style>
iframe{
  height: 600px !important;
}
</style>
