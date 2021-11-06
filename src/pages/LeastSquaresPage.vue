<template>
  <AppLayout>

    <b-field label="Rounded">
      <b-input placeholder="No label"  rounded></b-input>
    </b-field>

  </AppLayout>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator'

import AppLayout from '@/components/layout/AppLayout.vue'

@Component({
  components: {AppLayout}
})

export default class LeastSquaresPage extends Vue {

}
</script>

<style scoped>

</style>