<template>
  <AppContentAndPlot>

    <template #header>
      <AppHero title="Método de Jacobi" :padding="1"/>
    </template>

    <template #content>
      <AppMatrix/>
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

@Component({
  components: {AppContentAndPlot, AppPlot, AppHero, AppMatrix}
})

export default class JacobiPage extends Vue {

  selectedIteration: number = 1
  plot: Window | null = null

}
</script>

<style scoped>

</style>