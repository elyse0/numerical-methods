<template>
  <section class="hero">
    <div class="hero-body">
      <p class="title" v-if="title">
        {{ title }}
      </p>
      <p class="subtitle" v-if="subtitle">
        {{subtitle}}
      </p>
    </div>
  </section>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator'

@Component
export default class AppHero extends Vue {

  @Prop({default: null}) readonly title!: string | null
  @Prop({default: null}) readonly subtitle!: string | null
}
</script>

<style scoped>

</style>