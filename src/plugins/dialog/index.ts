import _Vue from 'vue'
import Router from 'vue-router'
import DialogInstance from './DialogInstance'

export const DialogPlugin = (Vue: typeof _Vue, options?: Router) => {
  Vue.prototype.$dialog = new DialogInstance(options)
}
