<template>
  <div>
    Matrix!!!

    <div class="columns">
      <div class="column has-text-centered" v-for="column in columns" :key="column">
        <div class="row" v-for="row in rows" :key="row" style="padding-bottom: 10px">
          <b-numberinput :controls="false" v-model="matrix[row - 1][column - 1]">
          </b-numberinput>
        </div>
      </div>
    </div>


    Valid: {{valid}}
  </div>
</template>

<script lang="ts">
import {Component, Prop, VModel, Vue, Watch} from 'vue-property-decorator'

@Component
export default class AppMatrix extends Vue {

  @Prop({default: 3}) readonly columns!: number
  @Prop({default: 3}) readonly rows!: number

  @VModel() matrix: number[][] = Array(this.rows).fill(0).map(() => new Array(this.columns).fill(0))

  get valid(): boolean {
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