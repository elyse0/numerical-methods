<template>
  <AppContentLayout>
    <AppHero title="Guía de inicio"/>
  </AppContentLayout>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator'

import AppContentLayout from '@/components/layout/AppContentLayout.vue'
import AppHero from '@/components/AppHero.vue'

@Component({
  components: {AppHero, AppContentLayout}
})

export default class GettingStarted extends Vue {

}
</script>

<style scoped>

</style>