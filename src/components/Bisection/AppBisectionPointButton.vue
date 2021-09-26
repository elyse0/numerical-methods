<template>
  <div>
    <b-tooltip position="is-bottom" type="is-light">
      <b-button :label="label" :type="buttonType" outlined expanded/>
      <template v-slot:content>
        <p><b>fx: </b> {{point.fx}}</p>
      </template>
    </b-tooltip>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import {BisectionIterationPoint} from '@/methods/Bisection'

export default Vue.extend({
  name: "AppBisectionPointButton",
  props: {
    point: {type: Object as () => BisectionIterationPoint},
    precision: {type: Number}
  },
  computed: {
    label(): String {
      return "x: " + parseFloat(this.point.x.toString()).toFixed(this.precision)
    },
    buttonType(): String {
      if (!this.point)
        return ""

      if (this.point.sign === 1)
        return "is-danger"

      if (this.point.sign === -1)
        return "is-info"

      return "is-success"
    }
  }
})
</script>

<style scoped>

</style>