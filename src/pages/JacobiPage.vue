<template>
  <AppContentLayout>

    <div class="columns">
      <div class="column">
        <AppMatrix></AppMatrix>
      </div>
      <div class="column">
        <AppPlot name="jacobi" v-model="plot"/>
      </div>
    </div>

  </AppContentLayout>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator'

import AppContentLayout from '@/components/layout/AppContentLayout.vue'
import AppPlot from '@/components/AppPlot.vue'
import AppMatrix from '@/components/AppMatrix.vue'

@Component({
  components: {AppContentLayout, AppPlot, AppMatrix}
})

export default class JacobiPage extends Vue {

  selectedIteration: number = 1
  plot: Window | null = null

}
</script>

<style scoped>

</style>