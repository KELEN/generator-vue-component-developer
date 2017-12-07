<style lang="scss" scoped>
  
</style>
<template>
  <div>
    <h1>{{ title }}</h1>
    <button @click="handleClick">click</button>
  </div>
</template>
<script>
  export default {
    name: "<%= projectName %>",
    data() {
      return {
        title: "<%= projectName %>"
      };
    },
    methods: {
      handleClick: function() {
        alert("<%= projectName %>");
      }
    },
    mounted() {
      
    }
  };
</script>
