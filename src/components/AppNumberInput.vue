<template>
  <b-field :label="label" :label-position="labelPosition">
    <b-numberinput v-model="number"
                   :step="step"
                   :min="min"
                   :max="max"
                   :controls="false"
                   @input="input"
                   expanded/>
  </b-field>
</template>

<script lang="ts">
import {Component, Emit, Prop, VModel, Vue} from 'vue-property-decorator'

@Component
export default class AppNumberInput extends Vue {

  @VModel() number!: number

  @Prop({required: true}) readonly label!: string
  @Prop({default: "inside"}) readonly labelPosition!: string
  @Prop({default: 0.0001}) readonly step!: number
  @Prop({default: 0}) readonly min!: number
  @Prop({default: Number.MAX_SAFE_INTEGER}) readonly max!: number

  @Emit()
  input(value: number) {
    return value
  }
}
</script>

<style>
div.field.is-floating-in-label.has-numberinput > label {
  margin-left: 0.2rem!important;
}
</style>