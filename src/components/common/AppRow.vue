<template>
  <div class="is-row">
    <slot/>
  </div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator'

@Component
export default class AppRow extends Vue {

}

</script>

<style scoped>
.is-row div {
  display: inline-block;
  vertical-align: top;
  margin-bottom: 20px;
  /*text-overflow: ellipsis;*/
  /*overflow: hidden;*/
}
</style>