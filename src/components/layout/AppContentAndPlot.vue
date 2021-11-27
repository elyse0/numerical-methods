<template>
  <AppContentLayout>
    <slot name="header"/>

    <div class="columns">
      <div class="column">
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
import {Component, Vue} from 'vue-property-decorator'

@Component({
  components: {AppContentLayout}
})

export default class AppContentAndPlot extends Vue {

}
</script>

<style scoped>

</style>