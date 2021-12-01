<template>
  <AppContentAndPlot>

    <template #header>
      <AppHero title="Interpolación por minimos cuadrados" :padding="1"/>
    </template>

    <template #content>
      <AppPointsList v-model="pointsList"/>

      <div v-if="leastSquaresInterpolation" style="display: block">
        <katex-element style="display: block"
            :expression="`r = ${leastSquaresInterpolation.correlationCoefficient.toFixed(4)}`"/>
        <katex-element style="display: block"
            :expression="`m = ${leastSquaresInterpolation.slope.toFixed(4)}`"/>
        <katex-element style="display: block"
            :expression="`b = ${leastSquaresInterpolation.yIntercept.toFixed(4)}`"/>
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

import LeastSquaresInterpolation from '@/methods/LeastSquaresInterpolation'
import {Point} from '@/methods/NumericalMethod'

@Component({
  components: {AppContentAndPlot, AppHero,  AppPlot, AppPointsList}
})

export default class LeastSquaresPage extends Vue {

  pointsList: Partial<Point>[] = [{x: 1, y: 0.5}, {x: 3, y: 4}, {x: 4, y: 2}]
  plot: Window | null = null

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
    return LeastSquaresInterpolation.isPointsListValid(this.pointsList)
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
        if (LeastSquaresInterpolation.isPoint(point)) {
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