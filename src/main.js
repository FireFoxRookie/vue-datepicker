import Vue from 'vue'
import router from '@/router'
import 'font-awesome/css/font-awesome.min.css'

new Vue({
  el: '#app',
  data() {
    return {
      message: 'Hello World'
    }
  },
  router: router
})