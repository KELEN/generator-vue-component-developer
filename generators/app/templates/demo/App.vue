<template>
  <div id="app">
	<% if (componentType == 1) { %>
		<<%= extendNameParamCase %>></<%= extendNameParamCase %>>
	<% } %>
    <% if (componentType == 2) { %>
		<h3 v-<%= extendNameParamCase %>>Hello directive</h3>
	<% } %>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
  	return {}
  }
}
</script>

<style lang="scss">

</style>
