<template>
  <AppContentLayout>
    <div class="columns">
      <div class="column">

      </div>

      <div class="column">
        <vue-iframe :src="plotUrl" @load="onLoadIframe"/>
      </div>
    </div>
  </AppContentLayout>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator'

import AppContentLayout from '@/components/layout/AppContentLayout.vue'
import AppPointsList from '@/components/AppPointsList.vue'

import RungeKutta from '@/methods/RungeKutta'

@Component({
  components: {AppPointsList, AppContentLayout}
})

export default class RungeKuttaPage extends Vue {


  plot: Window | null = null
  plotUrl = `${process.env.BASE_URL}/plot/least-squares.html`

  updatePlot() {
    if (!this.plot) {
      return
    }

    let message: any = {}
    this.plot.postMessage(message, "*")
  }

  onLoadIframe(frame: HTMLFrameElement) {
    const window = frame.contentWindow

    if (window)
      this.plot = window
  }

  mounted() {

    RungeKutta.create("x*y^(1/2)", {x: 1, y: 4}, 0.2)
  }

}
</script>

<style scoped>

</style>