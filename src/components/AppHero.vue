<template>
  <section :class="classType" :style="cssVars">
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
  @Prop({default: false}) readonly centered!: boolean
  @Prop({default: 3}) readonly padding!: number

  get classType(): string{
    return this.centered ? "hero has-text-centered" : "hero"
  }

  get cssVars() {
    return {
      "--padding": `${this.padding}rem ${this.padding}rem`
    }
  }

}
</script>

<style scoped>
.hero-body {
  padding: var(--padding);
}
</style>