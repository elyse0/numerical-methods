<template>
  <AppContentLayout>

    <AppHero title="Métodos numéricos" subtitle="FES Aragón 2022-I"/>

    <footer class="footer">
      <div class="content has-text-centered">
        <h1 class="title is-5">
          💗️ Creado por <a href="https://github.com/elyse0" target="_blank">Kevin Olvera (@elyse0)</a>
        </h1>
      </div>
    </footer>

  </AppContentLayout>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator'

import AppContentLayout from '@/components/layout/AppContentLayout.vue'
import AppHero from '@/components/AppHero.vue'

@Component({
  components: {AppHero, AppContentLayout}
})

export default class Mainpage extends Vue {

}
</script>

<style scoped>

</style>