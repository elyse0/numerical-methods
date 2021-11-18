<template>
  <AppLayout>
    <div class="content-layout">
      <main class="layout_main">
        <slot/>
      </main>
    </div>
  </AppLayout>
</template>


<script lang="ts">
import {Component, Vue} from 'vue-property-decorator'

import AppLayout from '@/components/layout/AppLayout.vue'

@Component({
  components: {AppLayout}
})

export default class AppContentLayout extends Vue {

}
</script>

<style scoped>

</style>