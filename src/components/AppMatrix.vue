<template>
  <div v-if="matrix">
    <div class="columns">
      <div class="column has-text-centered" v-for="column in matrix[0].length" :key="column">
        <div class="row" v-for="row in matrix.length" :key="row" style="padding-bottom: 10px">
          <AppNumberInput v-model="matrix[row - 1][column - 1]" label=""/>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {Component, VModel, Vue, Watch} from 'vue-property-decorator'

import AppNumberInput from '@/components/AppNumberInput.vue'

@Component({
  components: {AppNumberInput}
})

export default class AppMatrix extends Vue {

  @VModel({
    required: true,
    type: Array as () => (Array<Array<number | null>> | null)
  }) matrix!: Array<Array<number | null>>

  @Watch("matrix")
  onMatrix() {
    console.log(this.matrix)
  }
}
</script>

<style scoped>

</style>