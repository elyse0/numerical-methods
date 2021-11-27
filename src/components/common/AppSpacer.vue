<template>
  <div class="padding"></div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator'

@Component
export default class AppSpacer extends Vue {

}
</script>

<style scoped>
.padding {
  padding-right: 20px;
}
</style>