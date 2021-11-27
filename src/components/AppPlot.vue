<template>
  <vue-iframe :src="plotUrl" @load="onLoadIframe"/>
</template>

<script lang="ts">
import {Component, Prop, VModel, Vue} from 'vue-property-decorator'

@Component
export default class AppPlot extends Vue {

  @VModel({default: null}) plot!: Window | null

  @Prop({required: true}) name!: string
  @Prop({required: false, type: Function}) callback!: () => {}

  plotUrl = `${process.env.BASE_URL}/plot/${this.name}.html`

  onLoadIframe(frame: HTMLFrameElement) {
    const window = frame.contentWindow

    console.log("Plot loaded")

    if (window) {
      this.plot = window

      // Wait for plot to be fully loaded and call callback
      new Promise(() => setTimeout(this.callback, 1000));
    }
  }
}
</script>

<style>
iframe {
  height: 600px !important;
}
</style>