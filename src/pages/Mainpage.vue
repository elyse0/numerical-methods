<template>
  <AppContentLayout class="mainpage">

    <AppHero class="has-text-centered" title="Métodos numéricos" subtitle="FES Aragón 2022-I"/>

    <div>

    </div>

    <footer class="footer">
      <div class="content has-text-centered">

        <h1 class="title is-5">
          💗️ Creado por <a href="https://github.com/elyse0" target="_blank">Kevin Olvera (@elyse0)</a>
        </h1>

        <div class="logos">
          <a href="https://www.typescriptlang.org/" target="_blank">
            <img src="/numerical-methods/icons/typescript-logo.png" alt="Typescript logo"/>
          </a>
          <a href="https://vuejs.org/" target="_blank">
            <img src="/numerical-methods/icons/vuejs-logo.png" alt="Vuejs logo"/>
          </a>
          <a href="https://buefy.org/" target="_blank">
            <img src="/numerical-methods/icons/buefy-logo.png" alt="Buefy logo"/>
          </a>
          <a href="https://mathjs.org/" target="_blank">
            <img src="/numerical-methods/icons/mathjs-logo.png" alt="Math.js logo"/>
          </a>
          <a href="https://katex.org/" target="_blank">
            <img src="/numerical-methods/icons/katex-logo.png" alt="Katex logo"/>
          </a>
          <a href="https://www.desmos.com/" target="_blank">
            <img src="/numerical-methods/icons/desmos-logo.png" alt="Desmos logo"/>
          </a>
          <a href="https://github.com/" target="_blank">
            <img src="/numerical-methods/icons/github-logo.png" alt="Github logo"/>
          </a>
        </div>
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
div.layout.mainpage {
  background-image: url('/numerical-methods/background.svg');
  background-position: center center;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-size: cover;
}

.logos img {
  height: 35px;
  padding-left: 10px;
  padding-right: 10px;
}

footer {
  background-color: transparent;
}
</style>