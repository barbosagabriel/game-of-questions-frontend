<template>
  <v-dialog
    id="dialog"
    v-model="showDialog"
    :persistent="options.persistent"
    dark
    eager
    :max-width="500"
  >
    <v-card id="dialog-content">
      <v-card-title
        id="title"
        class="title"
        primary-title
      >
        {{ options.title }}
      </v-card-title>

      <v-card-text
        id="text"
        v-html="options.text"
      >
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>

        <v-btn
          id="reject"
          color="red"
          text
          v-if="options.textReject"
          @click.native="toReject"
        >
          {{ options.textReject }}
        </v-btn>

        <v-btn
          id="confirm"
          color="primary"
          text
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
import { DialogOptions } from '@/models/dialog/DialogOptions'

@Component({})
export default class Dialog extends Vue {
  @Prop()
  private options!: DialogOptions;

  public get showDialog (): boolean {
    return this.options.show
  }

  public toConfirm () {
    this.$emit('confirm')
  }

  public toReject () {
    this.$emit('reject')
  }
}
</script>
