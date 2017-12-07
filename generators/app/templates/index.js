import <%= componentName %> from './src/components/<%= componentName %>.vue'

<%= componentName %>.install = function (Vue) {
  Vue.component(<%= componentName %>.name, <%= componentName %>)
};
export default <%= componentName %>;
