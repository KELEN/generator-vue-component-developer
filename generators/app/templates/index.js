
<% if (componentType == 1) { %>
	import <%= extendNamePascalCase %> from './src/components/<%= extendNamePascalCase %>.vue';

	<%= extendNamePascalCase %>.install = function (Vue) {

		Vue.component(<%= extendNamePascalCase %>.name, <%= extendNamePascalCase %>)
	};
	
	export default <%= extendNamePascalCase %>;
<% } %>

<% if (componentType == 2) { %>
	// 指令
	export default {
		install(Vue) {
			// 指令
			Vue.directive('<%= extendNameParamCase %>', {
				bind (el, binding, vnode, oldVnode) {
					el.style.fontSize = "40px";
				}
			})
		}
	}
	
<% } %>
  


