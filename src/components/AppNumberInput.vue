<template>
  <b-field :label="label" :label-position="labelPosition">
    <b-input type="number" v-model="stringNumber" :step="step" expanded/>
  </b-field>
</template>

<script lang="ts">
import {Component, Prop, VModel, Vue, Watch} from 'vue-property-decorator'

@Component
export default class AppNumberInput extends Vue {

  @VModel() validatedNumber!: number

  @Prop({required: true}) readonly label!: string
  @Prop({default: "inside"}) readonly labelPosition!: string
  @Prop({default: 0.0001}) readonly step!: number

  stringNumber: string = "0"

  validateNumber() {
    this.validatedNumber = Number(this.stringNumber)
  }

  @Watch("stringNumber")
  onStringNumber() {
    this.validateNumber()
  }

  mounted() {
    this.stringNumber = Number(this.validatedNumber).toString();
    this.validateNumber()
  }
}
</script>

<style scoped>

</style>