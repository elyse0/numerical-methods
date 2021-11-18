<template>
  <AppContentLayout>

    <section class="hero">
      <div class="hero-body">
        <p class="title">
          Métodos numéricos
        </p>
        <p class="subtitle">
          FES Aragón 2022-I
        </p>
      </div>
    </section>

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