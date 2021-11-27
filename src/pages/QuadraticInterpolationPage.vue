<template>
  <AppContentAndPlot>

    <template #header>
      <AppHero title="Interpolación cuadrática" :padding="1"/>
    </template>

    <template #content>
      <AppPointsList v-model="pointsList" :show-button="false" @update="updatePlot"/>

      <!--{{pointsList}}
      {{linearInterpolation}}-->

      <div v-if="interpolationFunction" class="has-text-centered" style="padding-bottom: 10px">
        <katex-element :expression="interpolationFunction"/>
      </div>
    </template>

    <template #plot>
      <AppPlot name="least-squares" v-model="plot"/>
    </template>

  </AppContentAndPlot>
</template>

<script lang="ts">
import {Component, Vue, Watch} from 'vue-property-decorator'

import AppContentAndPlot from '@/components/layout/AppContentAndPlot.vue'
import AppHero from '@/components/AppHero.vue'
import AppPlot from '@/components/AppPlot.vue'
import AppPointsList from '@/components/AppPointsList.vue'

import QuadraticInterpolation from '@/methods/QuadraticInterpolation'
import {Point} from '@/methods/NumericalMethod'

@Component({
  components: {AppContentAndPlot, AppHero, AppPlot, AppPointsList}
})

export default class QuadraticInterpolationPage extends Vue {

  pointsList: Partial<Point>[] = [{x: 0, y: -3}, {x: 1, y: 0}, {x: 3, y: 0}]

  plot: Window | null = null

  get quadraticInterpolation(): QuadraticInterpolation | null {

    return QuadraticInterpolation.create(this.pointsList as Point[])
  }

  get interpolationFunction(): string | null {

    return this.quadraticInterpolation ? this.quadraticInterpolation.interpolationFunction : null
  }

  updatePlot() {
    if (!this.plot) {
      return
    }

    let message: any = {}
    if (this.pointsList) {
      let xValues: number[] = []
      let yValues: number[] = []

      this.pointsList.forEach((point) => {
        if (QuadraticInterpolation.isPoint(point)) {
          xValues.push(point.x)
          yValues.push(point.y)
        }
      })

      message["table"] = {x: xValues, y: yValues}
    }

    if (this.interpolationFunction) {
      message["functionFx"] = this.interpolationFunction
    }

    this.plot.postMessage(message, "*")
  }

  @Watch("linearInterpolation")
  onLinearInterpolation() {
    this.updatePlot()
  }

}
</script>

<style scoped>

</style>