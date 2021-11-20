<template>
  <AppContentLayout>
    <div class="has-text-centered">
      <img :src="imageUrl" alt="404">
    </div>
  </AppContentLayout>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator'

import AppContentLayout from '@/components/layout/AppContentLayout.vue'

@Component({
  components: {AppContentLayout}
})

export default class Page404 extends Vue {

  imageUrl = process.env.BASE_URL + "404.svg"
}
</script>

<style scoped>
img {
  height: 85vh;
}
</style>