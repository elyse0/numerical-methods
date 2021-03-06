<template>
  <AppContentAndPlot>

    <template #header>
      <AppHero title="Interpolación lineal" :padding="1"/>
    </template>

    <template #content>
      <AppPointsList v-model="pointsList" @update="updatePlot"/>

      <!--{{pointsList}}
      {{linearInterpolation}}-->

      <div v-if="interpolationLine" class="has-text-centered" style="padding-bottom: 10px">
        <katex-element :expression="interpolationLine"/>
      </div>
    </template>

    <template #plot>
      <AppPlot name="least-squares" v-model="plot" :callback="updatePlot"/>
    </template>

  </AppContentAndPlot>
</template>

<script lang="ts">
import {Component, Vue, Watch} from 'vue-property-decorator'

import AppContentAndPlot from '@/components/layout/AppContentAndPlot.vue'
import AppHero from '@/components/AppHero.vue'
import AppPlot from '@/components/AppPlot.vue'
import AppPointsList from '@/components/AppPointsList.vue'

import LinearInterpolation from '@/methods/LinearInterpolation'
import {Point} from '@/methods/NumericalMethod'

@Component({
  components: {AppContentAndPlot, AppHero, AppPlot, AppPointsList}
})

export default class LinearInterpolationPage extends Vue {

  pointsList: Partial<Point>[] = [{x: 1, y: 1}, {x: 2, y: 2}]

  plot: Window | null = null

  get linearInterpolation(): LinearInterpolation | null {

    return this.isPointsListValid ? LinearInterpolation.create(this.pointsList as Point[]) : null
  }

  get interpolationLine(): string | null {

    return this.linearInterpolation ? this.linearInterpolation.interpolationFunction : null
  }

  get isPointsListValid(): boolean {

    return LinearInterpolation.isPointsListValid(this.pointsList)
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
        if (LinearInterpolation.isPoint(point)) {
          xValues.push(point.x)
          yValues.push(point.y)
        }
      })

      message["table"] = {x: xValues, y: yValues}
    }

    if (this.interpolationLine) {
      message["functionFx"] = this.interpolationLine
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