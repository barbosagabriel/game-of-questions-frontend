import Vue from 'vue'
import DialogInstance from '@/plugins/dialog/DialogInstance'

declare module 'vue/types/vue' {
  interface Vue {
    $dialog: DialogInstance
  }
}
