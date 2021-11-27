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

      {{jacobi}}
    </template>

    <template #plot>
      <AppPlot name="jacobi" v-model="plot"/>
    </template>

  </AppContentAndPlot>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator'

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

  matrix: number[][] = [[17, -2, -3], [-5, -21, -2], [-5, -5, 22]]
  vector: number[][] = [[500], [200], [30]]

  selectedIteration: number = 1
  plot: Window | null = null

  get jacobi(): Jacobi | null {

    return Jacobi.create(this.matrix, this.vector.flat(1))
  }

}
</script>

<style>
div.b-numberinput.field.is-grouped {
  width: 100px;
}
</style>