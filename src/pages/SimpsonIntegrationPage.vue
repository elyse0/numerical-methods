<template>
  <AppContentLayout>
    <div class="columns">
      <div class="column">
        <div v-if="simpsonIntegration">
          Type: {{simpsonIntegration.type}}
          <katex-element :expression="simpsonIntegration.integralFunction"/>
          {{simpsonIntegration.integral}}
          <b-button @click="updatePlot">Click me</b-button>
        </div>
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

import SimpsonIntegration from '@/methods/SimpsonIntegration'

@Component({
  components: {AppContentLayout}
})

export default class SimpsonIntegrationPage extends Vue {

  plot: Window | null = null
  plotUrl = `${process.env.BASE_URL}/plot/integration.html`

  get simpsonIntegration(): SimpsonIntegration | null {

    return SimpsonIntegration.create("1/(1+x)", {x0: 0, x1: 1}, 6)
  }

  updatePlot() {
    if (!this.plot) {
      return
    }

    let message: any = {}
    if (this.simpsonIntegration) {
      message["functionFx"] = this.simpsonIntegration.functionFx
      message["integral"] = this.simpsonIntegration.integralFunction
      message["integrationInterval"] = this.simpsonIntegration.integrationInterval
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