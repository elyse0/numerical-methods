<template>
  <AppContentAndPlot>

    <template #header>
      <AppHero title="Método de Jacobi" :padding="1"/>
    </template>

    <template #content>

      Sistema de ecuaciones
      <AppRow>
        <AppMatrix v-model="matrix"/>
        <AppSpacer/>
        <AppMatrix :columns="1" :rows="3"
                   v-model="vector"
                   style="
                   border-left: 3px solid #bbb;
                   padding-left: 20px;"
        />
      </AppRow>

      <div v-if="linearSystemSolution">
        <katex-element :expression="'x='+linearSystemSolution[0].toFixed(4)"/>
        <AppSpacer/>
        <katex-element :expression="'y='+linearSystemSolution[1].toFixed(4)"/>
        <AppSpacer/>
        <katex-element :expression="'z='+linearSystemSolution[2].toFixed(4)"/>
      </div>

      <b-button @click="update3dPlot">3D Plot</b-button>
    </template>

    <template #plot>
      <AppPlot name="jacobi" v-model="plot" :callback="update3dPlot"/>
    </template>

  </AppContentAndPlot>
</template>

<script lang="ts">
import {Component, Vue, Watch} from 'vue-property-decorator'

import AppContentAndPlot from '@/components/layout/AppContentAndPlot.vue'
import AppHero from '@/components/AppHero.vue'
import AppPlot from '@/components/AppPlot.vue'
import AppMatrix from '@/components/AppMatrix.vue'
import AppRow from '@/components/common/AppRow.vue'
import AppSpacer from '@/components/common/AppSpacer.vue'

import Jacobi from '@/methods/Jacobi'

@Component({
  components: {AppContentAndPlot, AppPlot, AppHero, AppMatrix, AppSpacer, AppRow}
})

export default class JacobiPage extends Vue {

  matrix: Array<Array<number | null>> = [[17, -2, -3], [-5, -21, -2], [-5, -5, 22]]
  vector: Array<Array<number | null>> = [[5], [2], [3]]

  plot: Window | null = null

  get jacobi(): Jacobi | null {

    return Jacobi.create(this.matrix, this.vector.flat(1))
  }

  get linearSystemSolution(): number[] | null{
    if (!this.jacobi) {
      return null
    }

    return this.jacobi.iterations[this.jacobi.iterations.length - 1]
  }

  getEquation(row: number): string | null {
    const matrixRow = this.matrix[row]

    for (let column = 0; column < matrixRow.length; column++) {
      if (typeof matrixRow[column] !== 'number') {
        return null
      }
    }

    const columnVectorValue = this.vector.flat(1)[row]
    if (typeof columnVectorValue !== "number") {
      return null
    }

    return `${matrixRow[0]}x+${matrixRow[1]}y+${matrixRow[2]}z=${columnVectorValue}`
  }

  update3dPlot() {
    if (!this.plot) {
      return
    }

    let message: any = {}
    message['plot'] =
        `${this.getEquation(0)}
        ${this.getEquation(1)}
        ${this.getEquation(2)}`

    this.plot.postMessage(message, "*")
  }

  @Watch("jacobi")
  onJacobi() {
    this.update3dPlot()
  }

}
</script>

<style>
div.b-numberinput.field.is-grouped {
  width: 100px;
}
</style>