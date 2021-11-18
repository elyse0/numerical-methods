<template>
  <div class="layout">
    <AppNavbar/>
    <div class="container is-fluid">
      <slot/>
    </div>
  </div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator'

import AppNavbar from '@/components/layout/AppNavbar.vue'

@Component({
  components: {AppNavbar}
})

export default class AppLayout extends Vue {

}
</script>

<style scoped>

</style>