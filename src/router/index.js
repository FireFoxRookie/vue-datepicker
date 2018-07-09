import Vue from 'vue'
import Router from 'vue-router'
import datePick from '@/components/datepick.vue'
Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '/',
      name: 'datepick',
      component: datePick
    }
  ]
})