<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  mounted(){
    document.getElementsByTagName("html")[0].style.fontSize = innerWidth * 0.01 + "px";
  }
}
</script>

<style lang="scss">

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height:100%;
}
*{
  margin:0;
  padding:0;
}
ul,li{
  list-style: none;
}
html,body{
  height:100%;
}
</style>
