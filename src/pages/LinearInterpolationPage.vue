<template>
  <AppContentLayout>
    <div class="columns">
      <div class="column">
        <AppPointsList v-model="pointsList" @update="updatePlot"/>

        <!--{{pointsList}}
        {{linearInterpolation}}-->

        <div v-if="interpolationLine" class="has-text-centered" style="padding-bottom: 10px">
          <katex-element :expression="interpolationLine"/>
        </div>

      </div>

      <div class="column">
        <vue-iframe :src="plotUrl" @load="onLoadIframe"/>
      </div>
    </div>
  </AppContentLayout>
</template>

<script lang="ts">
import {Point} from '@/methods/NumericalMethod'
import {Component, Vue, Watch} from 'vue-property-decorator'

import AppContentLayout from '@/components/layout/AppContentLayout.vue'
import AppPointsList from '@/components/AppPointsList.vue'

import LinearInterpolation from '@/methods/LinearInterpolation'

@Component({
  components: {AppPointsList, AppContentLayout}
})

export default class LinearInterpolationPage extends Vue {

  pointsList: Partial<Point>[] = [{}, {}]

  plot: Window | null = null
  plotUrl = `${process.env.BASE_URL}/plot/least-squares.html`

  get linearInterpolation(): LinearInterpolation | null {
    if (!this.isPointsListValid) {
      return null
    }

    return LinearInterpolation.create(this.pointsList as Point[])
  }

  get interpolationLine(): string | null {
    if (!this.linearInterpolation) {
      return null
    }

    const point = this.linearInterpolation.point
    const slope = this.linearInterpolation.slope

    return LinearInterpolation.getLineEquationPointSlope(point, slope)
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

  onLoadIframe(frame: HTMLFrameElement) {
    const window = frame.contentWindow

    if (window)
      this.plot = window
  }

  @Watch("linearInterpolation")
  onLinearInterpolation() {
    this.updatePlot()
  }
}
</script>

<style scoped>

</style>