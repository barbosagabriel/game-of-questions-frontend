<template>
  <v-dialog
    v-model="options.show"
    scrollable
    persistent
    dark
    eager
    :max-width="500"
  >
    <v-card
      id="dynamic-dialog"
      ref="dynamic-dialog"
    >
      <v-card-title
        :class="getFontStyle"
        primary-title
      >
        {{ options.title }}
      </v-card-title>

      <v-card-text style="max-height: 300px">
        <component
          :is="DynamicComponent"
          :model="options.ComponentModel"
        >
        </component>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          id="Cancel"
          color="red"
          flat
          v-if="options.textCancel"
          @click.native="toReject"
        >
          {{ options.textCancel }}
        </v-btn>

        <v-btn
          id="confirm"
          color="primary"
          flat
          v-if="options.textConfirm"
          @click.native="toConfirm"
        >
          {{ options.textConfirm }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang='ts'>
import { Component, Prop, Vue } from 'vue-property-decorator'
import { DynamicDialogOptions } from '@/models/dialog/DynamicDialogOptions'

@Component({})
export default class DynamicDialog extends Vue {
  @Prop()
  public options!: DynamicDialogOptions;

  private get componenteDinamico (): any {
    return () => import(`@/components/${this.options.component}`)
  }

  private get getFontStyle (): string {
    return this.options.fontStyleTitle
  }

  public toConfirm () {
    this.$emit('confirm')
  }

  public toReject () {
    this.$emit('reject')
  }
}
</script>
