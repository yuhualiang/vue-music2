<template>
  <div class="loading">
    <img src="./loading.gif">
    <p class="desc">{{title}}</p>
  </div>
</template>

<script>
export default {
  name: 'BaseLoading',
  props: {
    title: {
      type: String,
      default: '正在载入...'
    }
  }
}
</script>
<style lang="stylus" scoped>
  @import '~common/stylus/variable'
  .loading
    width 100%
    text-align center
    .desc
      line-height 20px
      font-size $font-size-small
      color $color-text-l
</style>