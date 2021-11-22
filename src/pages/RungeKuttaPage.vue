<template>
  <AppContentLayout>
    <div class="columns">
      <div class="column">

      </div>

      <div class="column">
        <AppPlot name="least-squares" v-model="plot"/>
      </div>
    </div>
  </AppContentLayout>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator'

import AppContentLayout from '@/components/layout/AppContentLayout.vue'
import AppPlot from '@/components/AppPlot.vue'
import AppPointsList from '@/components/AppPointsList.vue'

import RungeKutta from '@/methods/RungeKutta'

@Component({
  components: {AppPlot, AppPointsList, AppContentLayout}
})

export default class RungeKuttaPage extends Vue {

  plot: Window | null = null

  updatePlot() {
    if (!this.plot) {
      return
    }

    let message: any = {}
    this.plot.postMessage(message, "*")
  }

  mounted() {

    RungeKutta.create("x*y^(1/2)", {x: 1, y: 4}, 0.2)
  }

}
</script>

<style scoped>

</style>