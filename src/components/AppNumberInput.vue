<template>
  <b-field :label="label" :label-position="labelPosition">
    <b-numberinput v-model="unsafeNumber"
                   :step="step"
                   :min="min"
                   :max="max"
                   :controls="false"
                   :lazy="lazy"
                   @input="input"
                   expanded/>
  </b-field>
</template>

<script lang="ts">
import {Component, Emit, Prop, VModel, Vue, Watch} from 'vue-property-decorator'

@Component
export default class AppNumberInput extends Vue {

  @VModel() number!: number

  @Prop({required: true}) readonly label!: string
  @Prop({default: "inside"}) readonly labelPosition!: string
  @Prop({default: 0.0001}) readonly step!: number
  @Prop({default: null}) readonly min!: number | null
  @Prop({default: null}) readonly max!: number | null
  @Prop({default: false, type: Boolean}) readonly lazy!: boolean

  unsafeNumber: number | null | boolean = null

  @Watch("unsafeNumber")
  onUnsafeNumber() {
    if (this.unsafeNumber === null) {
      this.number = 0
      return
    }

    if (typeof this.unsafeNumber === 'boolean') {
      this.number = 0
      return
    }

    if (this.max) {
      if (this.unsafeNumber > this.max) {
        this.number = this.max
        return
      }
    }

    if (this.min) {
      if (this.unsafeNumber < this.min) {
        this.number = this.min
        return
      }
    }

    this.number = this.unsafeNumber
  }

  mounted() {
    this.unsafeNumber = this.number
  }

  @Emit()
  input() {
    return null
  }
}
</script>

<style>
div.field.is-floating-in-label.has-numberinput > label {
  margin-left: 0.2rem!important;
}
</style>