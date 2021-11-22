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
        <AppPlot name="integration" v-model="plot"/>
      </div>
    </div>
  </AppContentLayout>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator'

import AppContentLayout from '@/components/layout/AppContentLayout.vue'
import AppPlot from '@/components/AppPlot.vue'

import SimpsonIntegration from '@/methods/SimpsonIntegration'

@Component({
  components: {AppContentLayout, AppPlot}
})

export default class SimpsonIntegrationPage extends Vue {

  plot: Window | null = null

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

}
</script>

<style scoped>

</style>