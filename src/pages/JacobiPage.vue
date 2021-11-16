<template>
  <AppLayout>

    <div class="columns">
      <div class="column">
        <AppMatrix></AppMatrix>
      </div>
      <div class="column">
        <vue-iframe :src="plotUrl" @load="onLoadPlot"/>
      </div>
    </div>

  </AppLayout>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator'

import AppLayout from '@/components/layout/AppLayout.vue'
import AppMatrix from '@/components/AppMatrix.vue'

@Component({
  components: {AppMatrix, AppLayout}
})

export default class JacobiPage extends Vue {

  selectedIteration: number = 1
  plot: Window | null = null

  plotUrl = `${process.env.BASE_URL}/plot/jacobi.html`

  onLoadPlot(frame: HTMLFrameElement) {
    const window = frame.contentWindow

    if (window)
      this.plot = window
  }
}
</script>

<style scoped>

</style>