<template>
  <div class="recommend">
    <scroll ref="scroll" :data="discList" class="recommend-content">
      <div>
        <div v-if="sliderData.length" class="slider-wrapper">
          <slider>
            <div v-for="item in sliderData" :key="item.id">
              <a :href="item.linkUrl">
                <img @load="loadImage" :src="item.picUrl" class="needsclick">
              </a>
            </div>
          </slider>
        </div>
        <div class="recommend-list">
          <h1 class="list-title">热门歌单推荐</h1>
          <ul>
            <li v-for="item in discList" :key="item.dissid" class="item">
              <div class="icon">
                <img v-lazy="item.imgurl" width="60" height="60">
              </div>
              <div class="text">
                <h2 class="name" v-html="item.creator.name"></h2>
                <p class="desc" v-html="item.dissname"></p>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <loading v-show="!discList.length"></loading>
    </scroll>
  </div>
</template>

<script>
import { getTopBanner, getDiscList } from 'api/recommend'
import { ERR_OK } from 'api/config'
import Slider from 'base/slider/Slider'
import Scroll from 'base/scroll/Scroll'
import Loading from 'base/loading/Loading'

export default {
  name: 'Recommend',
  data() {
    return {
      sliderData: [],
      discList: []
    }
  },
  created() {
    setTimeout(() => {
      this._getTopBanner()
    }, 1000)
    this._getDiscList()
  },
  components: { Slider, Scroll, Loading },
  methods: {
    _getDiscList() {
      getDiscList().then((res) => {
        if (res.code === ERR_OK) {
          this.discList = res.data.list
        }
      })
    },
    _getTopBanner() {
      getTopBanner().then((res) => {
        if (res.code === ERR_OK) {
          this.sliderData = res.data.slider
        }
      })
    },
    loadImage() {
      if (!this.checkLoaded) {
        this.$refs.scroll.refresh()
        this.checkLoaded = true
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
  @import '~common/stylus/variable'
  .recommend
    position fixed
    width 100%
    top 88px
    bottom 0
    .recommend-content
      height 100%
      overflow hidden
      .slider-wrapper
        position relative
        width 100%
        overflow hidden
      .recommend-list
        .list-title
          height 65px
          line-height 65px
          text-align center
          font-size $font-size-medium
          color $color-theme
        .item
          display flex
          box-sizing border-box
          align-items center
          padding 0 20px 20px 20px
        .icon
          flex 0 0 60px
          width 60px
          padding-right 20px
        .text
          display flex
          flex-direction column
          justify-content center
          flex 1
          line-height 20px
          overflow hidden
          font-size $font-size-medium
          .name
            margin-bottom 10px
            color: $color-text
          .desc
            color: $color-text-d
</style>