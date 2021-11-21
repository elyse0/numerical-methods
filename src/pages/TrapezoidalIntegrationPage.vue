<template>
  <AppContentLayout>
    <div class="columns">
      <div class="column">
        <div v-if="trapezoidalIntegration">
          <katex-element :expression="trapezoidalIntegration.integralFunction"/>
          {{trapezoidalIntegration.integral}}
        </div>
        <b-button @click="updatePlot">Click me</b-button>
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
  plotUrl = `${process.env.BASE_URL}/plot/integration.html`

  get trapezoidalIntegration(): TrapezoidalIntegration | null {

    return TrapezoidalIntegration.create("x^2+3", {x0: 0, x1: 3}, 6)
  }

  updatePlot() {
    if (!this.plot) {
      return
    }

    let message: any = {}
    if (this.trapezoidalIntegration) {
      message["functionFx"] = this.trapezoidalIntegration.functionFx
      message["integral"] = this.trapezoidalIntegration.integralFunction
      message["integrationInterval"] = this.trapezoidalIntegration.integrationInterval
    }
    this.plot.postMessage(message, "*")
  }

  onLoadIframe(frame: HTMLFrameElement) {
    const window = frame.contentWindow

    if (window)
      this.plot = window
  }

}
</script>

<style scoped>

</style>