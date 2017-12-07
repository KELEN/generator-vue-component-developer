import Vue from 'vue'
import App from './App.vue'
import <%= componentName %> from '../index';

Vue.use(<%= componentName %>);

new Vue({
  el: '#app',
  render: h => h(App)
})
