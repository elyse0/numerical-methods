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
        <AppPlot name="integration" v-model="plot"/>
      </div>
    </div>
  </AppContentLayout>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator'

import AppContentLayout from '@/components/layout/AppContentLayout.vue'
import AppPlot from '@/components/AppPlot.vue'

import TrapezoidalIntegration from '@/methods/TrapezoidalIntegration'

@Component({
  components: {AppContentLayout, AppPlot}
})

export default class TrapezoidalIntegrationPage extends Vue {


  plot: Window | null = null

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

}
</script>

<style scoped>

</style>