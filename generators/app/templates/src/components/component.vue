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
    name: "<%= extendNameParamCase %>",
    data() {
      return {
        title: "<%= extendNameParamCase %>"
      };
    },
    methods: {
      handleClick: function() {
        alert("<%= extendNameParamCase %>");
      }
    },
    mounted() {
      
    }
  };
</script>
