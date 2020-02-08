<template>
  <div class="recommend">
    <div v-if="sliderData.length" class="slider-wrapper">
      <slider>
        <div v-for="item in sliderData" :key="item.id">
          <a href="item.linkUrl">
            <img :src="item.picUrl" class="needsclick">
          </a>
        </div>
      </slider>
    </div>
  </div>
</template>

<script>
import { getTopBanner } from 'api/recommend'
import { ERR_OK } from 'api/config'
import Slider from 'base/slider/Slider'
export default {
  name: 'Recommend',
  data() {
    return {
      sliderData: []
    }
  },
  created() {
    this._getTopBanner()
  },
  components: { Slider },
  methods: {
    _getTopBanner() {
      getTopBanner().then((res) => {
        if (res.code === ERR_OK) {
          this.sliderData = res.data.slider
        }
      })
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
    .slider-wrapper
      position relative
      width 100%
      overflow hidden
</style>