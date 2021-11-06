<template>
  <div class="layout">
    <div class="container is-fluid">
      <slot/>
    </div>
  </div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator'

@Component
export default class AppLayout extends Vue {

}
</script>

<style scoped>

</style>