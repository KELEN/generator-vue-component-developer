import Vue from 'vue'
import App from './App.vue'
import <%= extendNamePascalCase %> from '../index';

Vue.use(<%= extendNamePascalCase %>);

new Vue({
  el: '#app',
  render: h => h(App)
})
