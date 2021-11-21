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
import SimpsonIntegration from '@/methods/SimpsonIntegration'
import {Component, Vue} from 'vue-property-decorator'

import AppContentLayout from '@/components/layout/AppContentLayout.vue'

@Component({
  components: {AppContentLayout}
})

export default class SimpsonIntegrationPage extends Vue {

  plot: Window | null = null
  plotUrl = `${process.env.BASE_URL}/plot/least-squares.html`

  onLoadIframe(frame: HTMLFrameElement) {
    const window = frame.contentWindow

    if (window)
      this.plot = window
  }

  mounted() {
    const inputFunction = "1/(1+x)"
    const parsedFunction = SimpsonIntegration.getParsedFunction(inputFunction)

    if (parsedFunction) {
      console.log(SimpsonIntegration.OneThirdMethod(parsedFunction.compile(), {x0: 0, x1: 1}, 6))
    }
  }

}
</script>

<style scoped>

</style>