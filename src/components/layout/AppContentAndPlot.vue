<template>
  <AppContentLayout class="content plot">
    <slot name="header"/>

    <div class="columns">
      <div :class="`column ${contentClass}`">
        <slot name="content"/>
      </div>
      <div class="column">
        <slot name="plot"/>
      </div>
    </div>

  </AppContentLayout>
</template>

<script lang="ts">
import AppContentLayout from '@/components/layout/AppContentLayout.vue'
import {Component, Prop, Vue} from 'vue-property-decorator'

@Component({
  components: {AppContentLayout}
})

export default class AppContentAndPlot extends Vue {

  @Prop({default: ""}) readonly contentClass!: string
}
</script>

<style scoped>
div.layout.content.plot {
  background-image: url('/numerical-methods/background-plot.svg');
  background-position: center center;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-size: cover;
}
</style>