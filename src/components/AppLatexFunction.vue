<template>
  <katex-element :expression="parsedFunction"/>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator'

import NumericalMethod from '@/methods/NumericalMethod'

@Component
export default class AppLatexFunction extends Vue {

  @Prop({required: true, type: String}) readonly inputFunction!: string
  @Prop({default: false, type: Boolean}) readonly fx!: boolean
  @Prop({default: null, type: String}) readonly x!: string | null

  get parsedFunction(): string {
    const parsedFunction = NumericalMethod.getParsedFunction(this.inputFunction)
    if (!parsedFunction) {
      return ""
    }
    const parsedFunctionTex = parsedFunction.toTex()
    if (!this.fx) {
      return parsedFunctionTex
    }
    if (!this.x) {
      return `f(x)=${parsedFunctionTex}`
    }
    return `f(${this.x})=${parsedFunctionTex}`
  }
}
</script>

<style scoped>

</style>