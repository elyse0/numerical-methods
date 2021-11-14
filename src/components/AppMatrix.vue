<template>
  <div>
    Matrix!!!
    <b-numberinput :controls="false"></b-numberinput>
  </div>
</template>

<script lang="ts">

import {Component, Vue} from 'vue-property-decorator'

@Component
export default class AppMatrix extends Vue {

  columns: number =  2
  rows: number =  2
}
</script>

<style scoped>

</style>