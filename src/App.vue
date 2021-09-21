<template>
  <div id="app">

    <input v-model="equation">
    {{ derivative }}

    Latex: {{latex}}

    <vue-iframe
        src="/plot/plot.html"
        frame-id="my-iframe"
        name="my-frame"
        @load="onLoadIframe"
        width="700px"
        height="500px"
    />
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
      equation: '',
      myIframe: null
    }
  },
  methods: {
    onLoadIframe(frame) {
      console.log("Iframe loaded")
      this.myIframe = frame.contentWindow
    }
  },
  computed: {
    derivative() {
      try {
        return math.derivative(this.equation, 'x')
      } catch (e) {
        console.log("Error getting derivate")
        return math.parse('0')
      }
    },
    latex() {
      return this.derivative.toTex()
    }
  },
  watch: {
    latex: function (value){
      this.myIframe.postMessage(value.toString())
    },
    derivative: function () {
    },
    equation: function () {
    }
  }
}
</script>

<style>
</style>
