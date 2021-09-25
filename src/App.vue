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

<script>
import {create, all} from 'mathjs'
const config = {}

const math = create(all, config)

export default {
  name: 'App',
  components: {},
  data: function () {
    return {
      input: '',
      firstPoint: 0,
      secondPoint: 0,
      myIframe: null,
      msg: ''
    }
  },
  methods: {
    onLoadIframe(frame) {
      console.log("Iframe loaded")
      this.myIframe = frame.contentWindow
    },
    bisectionMethod() {
    }
  },
  computed: {
    parsedFunction() {
      try {
        return math.parse(this.input)
      } catch (e) {
        console.log("Error parsing function")
        return math.simplify('0')
      }
    },
    derivative() {
      return math.derivative(this.parsedFunction, 'x')
    },
    isIntervalValid(){
      const f1 = math.evaluate(this.parsedFunction.toString(), {x: this.firstPoint})
      const f2 = math.evaluate(this.parsedFunction.toString(), {x: this.secondPoint})
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
}
</script>

<style>
iframe{
  height: 600px !important;
}
</style>
