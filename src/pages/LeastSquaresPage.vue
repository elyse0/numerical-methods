<template>
  <AppLayout>
    <br>
    <div class="columns">
      <div class="column">
        <AppPointsList></AppPointsList>
      </div>
      <div class="column">
        <vue-iframe :src="plotUrl" @load="onLoadPlot"/>
      </div>
    </div>

  </AppLayout>
</template>

<script lang="ts">
import AppPointsList from '@/components/AppPointsList.vue'
import {Component, Vue} from 'vue-property-decorator'

import AppLayout from '@/components/layout/AppLayout.vue'

@Component({
  components: {AppPointsList, AppLayout}
})

export default class LeastSquaresPage extends Vue {

  selectedIteration: number = 1
  plot: Window | null = null

  plotUrl = `${process.env.BASE_URL}/plot/fixed-point.html`

  onLoadPlot(frame: HTMLFrameElement) {
    const window = frame.contentWindow

    if (window)
      this.plot = window
  }
}
</script>

<style scoped>

</style>