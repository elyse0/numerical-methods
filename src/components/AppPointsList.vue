<template>
  <div>
    Lista
    <div>
      <b-field v-for="index in array.length" :key="index" style="padding-bottom: 10px">
        <b-numberinput class="dropdown-number-input" :controls="false"
                       v-model="array[index - 1]"
        />
        <p class="control">
          <b-button type="is-danger" icon-right="close" outlined
                    @click="removeItem(index - 1)"
          />
        </p>
      </b-field>

      <b-field style="opacity: 30%">
        <b-numberinput placeholder="Agregar"
                       :controls="false"
                       @focus="addItem"
        />
        <p class="control">
          <b-button type="is-success" icon-right="open" outlined/>
        </p>
      </b-field>

    </div>
  </div>
</template>

<script lang="ts">
import {Component, Vue, Watch} from 'vue-property-decorator'

@Component
export default class AppPointsList extends Vue {

  array: number[] = [5, 3]

  addItem() {
    this.array.push(0)
  }

  removeItem(item: number) {
    const left = this.array.slice(0, item)
    const right = this.array.slice(item + 1)

    this.array = left.concat(right)
  }

  @Watch("array")
  onArray() {
    setTimeout(() => {
      const inputs = document.querySelectorAll("div.b-numberinput input")
      // @ts-ignore
      inputs[inputs.length - 2].focus()
    }, 50)
  }
}
</script>

<style scoped>

</style>