<template>
  <transition name="slide" appear>
    <div class="singer-detail">singer-detail</div>
  </transition>
</template>

<script>
import {mapGetters} from 'vuex'
import {getSingerDetail} from 'api/singer'
import {ERR_OK} from 'api/config'
// import {createSong} from 'common/js/song'
import {getPurlUrl} from 'api/song'
export default {
  name: 'SingerDetail',
  computed: {
    ...mapGetters([
      'singer'
    ])
  },
  data() {
    return {
      songs: []
    }
  },
  created() {
    this._getDetail()
  },
  methods: {
    _getDetail() {
      if (!this.singer.id) {
        this.$router.push('/singer')
        return
      }
      getSingerDetail(this.singer.id).then((res) => {
        if (res.code === ERR_OK) {
          console.log(res.data.list)
          // getPurlUrl(res.data.list).then((respo) => {
          //   console.log(respo)
          // })
          this.songs = this._normalizeSongs(res.data.list)
        }
      })
    },
    _normalizeSongs(list) {
      let ret = []
      let songmid = []
      list.forEach((item) => {
        let {musicData} = item
        songmid.push(musicData.albummid)
      })
      console.log(songmid)
      getPurlUrl(songmid).then((res) => {
        console.log('getPurUrl: ' + res)
      })
      return ret
    }
  }
}
</script>

<style lang="stylus" scoped>
  @import "~common/stylus/variable"
  .singer-detail
    position fixed
    z-index 100
    top 0
    left 0
    right 0
    bottom 0
    background $color-background
  .slide-enter-active, .slide-leave-active
    transition: all 0.3s

  .slide-enter, .slide-leave-to
    transform: translate3d(100%, 0, 0)
</style>