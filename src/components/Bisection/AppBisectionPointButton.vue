<template>
  <div>
    <b-tooltip position="is-bottom" type="is-light">
      <b-button  :type="buttonType" outlined expanded>
        <AppRow>
          <b>x: </b> {{pointUsingPrecision.x}}
        </AppRow>
        <AppRow>
          <b>fx: </b> {{pointUsingPrecision.fx}}
        </AppRow>
      </b-button>
      <template v-slot:content>
        <p><b>fx: </b> {{point.fx}}</p>
      </template>
    </b-tooltip>
  </div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator'

import AppRow from '@/components/common/AppRow.vue'

import {Bisection, BisectionIterationPoint} from '@/methods/Bisection'

@Component({
  components: {AppRow}
})

export default class AppBisectionPointButton extends Vue {

  @Prop({required: true, type: Object as () => BisectionIterationPoint}) point!: BisectionIterationPoint
  @Prop({default: 4, type: Number}) precision!: number

  get pointUsingPrecision(): object {

    return {
      x: Bisection.round(this.point.x, this.precision).toString(),
      fx: Bisection.round(this.point.fx, this.precision).toString()
    }
  }

  get buttonType(): string {
    if (!this.point)
      return ""

    if (this.point.sign === 1)
      return "is-danger"

    if (this.point.sign === -1)
      return "is-info"

    return "is-success"
  }
}

</script>

<style scoped>

</style>