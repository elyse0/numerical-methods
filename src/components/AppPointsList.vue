<template>
  <div>
    <b-field v-for="index in pointsArray.length" :key="index" style="padding-bottom: 10px">
      <b-field>
        <b-numberinput class="dropdown-number-input"
                       icon="alpha-x-box"
                       placeholder="x"
                       :controls="false"
                       v-model="pointsArray[index - 1].x"
                       @keydown.native.space.prevent
                       :use-html5-validation="false"
                       @input="update"
        />
        <b-numberinput icon="alpha-y-box"
                       placeholder="y"
                       :controls="false"
                       v-model="pointsArray[index - 1].y"
                       @keydown.native.space.prevent
                       :use-html5-validation="false"
                       @input="update"
        />
        <p class="control">
          <b-button type="is-danger" icon-right="close" outlined
                    @click="removeItem(index - 1)"
          />
        </p>
      </b-field>
    </b-field>

    <b-field v-if="showButton">
      <p class="control">
        <b-button type="is-success"
                  icon-left="plus"
                  label="Agregar punto"
                  outlined
                  @click="addItem"
        />
      </p>
    </b-field>
    <div v-show="false">{{pointsArrayLength}}</div>
  </div>
</template>

<script lang="ts">
import {Component, Emit, Prop, VModel, Vue} from 'vue-property-decorator'
import {Point} from '@/methods/NumericalMethod'

@Component
export default class AppPointsList extends Vue {

  @VModel({default: () => [{}]}) pointsArray!: Partial<Point>[]
  @Prop({default: true}) showButton!: boolean

  addItem() {
    if (!this.pointsArray) {
      return
    }
    this.pointsArray.push({})
  }

  removeItem(item: number) {
    if (!this.pointsArray) {
      return
    }

    const left = this.pointsArray.slice(0, item)
    const right = this.pointsArray.slice(item + 1)

    this.pointsArray = left.concat(right)
    this.focusLastItem()
  }

  focusLastItem() {
    setTimeout(() => {
      const inputs = document.querySelectorAll("div.b-numberinput input")
      // @ts-ignore
      inputs[inputs.length - 1].focus()
    }, 50)
  }

  get pointsArrayLength(): number {
    if (!this.pointsArray.length) {
      this.addItem()
    }

    return this.pointsArray.length
  }

  @Emit()
  update() {
    return true
  }
}
</script>

<style scoped>

</style>