<template>
  <AppLayout>
    <br>
    <div class="columns">
      <div class="column">
        <AppPointsList v-model="pointsList"/>
        {{pointsList}}
        {{isPointsListValid}}
      </div>
      <div class="column">
        <vue-iframe :src="plotUrl" @load="onLoadPlot"/>
      </div>
    </div>
  </AppLayout>
</template>

<script lang="ts">
import AppPointsList from '@/components/AppPointsList.vue'
import LeastSquaresInterpolation from '@/methods/LeastSquaresInterpolation'
import {Point} from '@/methods/NumericalMethod'
import {Component, Vue, Watch} from 'vue-property-decorator'

import AppLayout from '@/components/layout/AppLayout.vue'

@Component({
  components: {AppPointsList, AppLayout}
})

export default class LeastSquaresPage extends Vue {

  pointsList: Partial<Point>[] | null = null
  selectedIteration: number = 1
  plot: Window | null = null

  plotUrl = `${process.env.BASE_URL}/plot/least-squares.html`

  isPoint(point: Partial<Point>): point is Point {
    return typeof point.x === 'number' && typeof point.y === "number"
  }

  get leastSquaresInterpolation(): LeastSquaresInterpolation | null {
    if (!this.isPointsListValid) {
      return null
    }

    return LeastSquaresInterpolation.create(this.pointsList as Point[])
  }

  get isPointsListValid(): boolean {
    if (!this.pointsList) {
      return false
    }

    return !this.pointsList.some((point) => !this.isPoint(point))
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
        if (this.isPoint(point)) {
          xValues.push(point.x)
          yValues.push(point.y)
        }
      })

      message["table"] = {x: xValues, y: yValues}
    }

    if (this.leastSquaresInterpolation) {
      //message["functionFx"] = "f(x)=" + this.parsedFunctionFx.toTex()
      const yIntercept = this.leastSquaresInterpolation.yIntercept
      const slope = this.leastSquaresInterpolation.slope
      const yInterceptWithSign = yIntercept < 0 ? yIntercept : `+${yIntercept}`

      message["functionFx"] = `f(x)=${slope.toFixed(4)}*x${yInterceptWithSign}`
    }
    this.plot.postMessage(message, "*")
  }

  onLoadPlot(frame: HTMLFrameElement) {
    const window = frame.contentWindow

    if (window)
      this.plot = window
  }

  @Watch("pointsList")
  onPointsListChange() {
    this.updatePlot()
  }

  @Watch("leastSquaresInterpolation")
  onleastSquaresInterpolation() {
    this.updatePlot()
  }
}
</script>

<style scoped>

</style>