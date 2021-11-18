<template>
  <AppContentLayout>

    Mainpage

  </AppContentLayout>
</template>

<script lang="ts">
import AppMatrix from '@/components/AppMatrix.vue'
import AppContentLayout from '@/components/layout/AppContentLayout.vue'
import {Component, Vue} from 'vue-property-decorator'
@Component({
  components: {AppContentLayout, AppMatrix}
})
export default class Mainpage extends Vue {

}
</script>

<style scoped>

</style>