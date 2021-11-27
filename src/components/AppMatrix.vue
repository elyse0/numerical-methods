<template>
  <div v-if="matrix">
    <div class="columns">
      <div class="column has-text-centered" v-for="column in matrix[0].length" :key="column">
        <div class="row" v-for="row in matrix.length" :key="row" style="padding-bottom: 10px">
          <b-numberinput :controls="false" v-model="matrix[row - 1][column - 1]">
          </b-numberinput>
        </div>
      </div>
    </div>
    Valid: {{valid}}
  </div>
</template>

<script lang="ts">
import {Component, VModel, Vue, Watch} from 'vue-property-decorator'

@Component
export default class AppMatrix extends Vue {

  @VModel({
    required: true,
    type: Array as () => (Array<Array<number | null>> | null)
  }) matrix!: Array<Array<number | null>>

  get valid(): boolean {
    if (!this.matrix) {
      return false
    }

    const flat = this.matrix.flat()
    const valid = flat.some((value: number | null) => value === null)

    return !valid
  }

  @Watch("matrix")
  onMatrix() {
    console.log(this.matrix)
  }
}
</script>

<style scoped>

</style>