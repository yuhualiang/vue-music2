<template>
  <div id="app">
    <m-header></m-header>
    <tab></tab>
    <router-view/>
  </div>
</template>

<script>
import mHeader from 'components/m-header/m-header'
import Tab from 'components/tab/Tab'
export default {
  name: 'App',
  components: { mHeader, Tab }
}
</script>

<style>
</style>
