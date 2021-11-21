<template>
  <AppContentLayout>
    <div class="columns">
      <div class="column">

      </div>

      <div class="column">
        <vue-iframe :src="plotUrl" @load="onLoadIframe"/>
      </div>
    </div>
  </AppContentLayout>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator'

import AppContentLayout from '@/components/layout/AppContentLayout.vue'

import TrapezoidalIntegration from '@/methods/TrapezoidalIntegration'

@Component({
  components: {AppContentLayout}
})

export default class TrapezoidalIntegrationPage extends Vue {


  plot: Window | null = null
  plotUrl = `${process.env.BASE_URL}/plot/least-squares.html`

  updatePlot() {
    if (!this.plot) {
      return
    }

    let message: any = {}
    this.plot.postMessage(message, "*")
  }

  onLoadIframe(frame: HTMLFrameElement) {
    const window = frame.contentWindow

    if (window)
      this.plot = window
  }

  mounted() {

    const inputFunction = "1/(x^2+16)"
    const parsedFunction = TrapezoidalIntegration.getParsedFunction(inputFunction)

    if (parsedFunction) {
      TrapezoidalIntegration.method(parsedFunction.compile(), {x0: 0, x1: 3}, 6)
    }
  }

}
</script>

<style scoped>

</style>