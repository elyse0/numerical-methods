<template>
  <AppContentAndPlot>

    <template #header>
      <AppHero title="Integración Simpson" :padding="1"/>
    </template>

    <template #content>
      <div v-if="simpsonIntegration">
        Type: {{simpsonIntegration.type}}
        <katex-element :expression="simpsonIntegration.integralFunction"/>
        {{simpsonIntegration.integral}}
        <b-button @click="updatePlot">Click me</b-button>
      </div>
    </template>

    <template #plot>
      <AppPlot name="integration" v-model="plot"/>
    </template>

  </AppContentAndPlot>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator'

import AppContentAndPlot from '@/components/layout/AppContentAndPlot.vue'
import AppHero from '@/components/AppHero.vue'
import AppPlot from '@/components/AppPlot.vue'

import SimpsonIntegration from '@/methods/SimpsonIntegration'

@Component({
  components: {AppContentAndPlot, AppHero, AppPlot}
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