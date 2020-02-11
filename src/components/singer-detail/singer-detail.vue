<template>
  <transition name="slide" appear>
    <music-list :title="title"
      :bg-image="bgImage" :songs="songs">
    </music-list>
  </transition>
</template>

<script>
import {mapGetters} from 'vuex'
import {getSingerDetail} from 'api/singer'
import {ERR_OK} from 'api/config'
import {createSong} from 'common/js/song'
import {getPurlUrl} from 'api/song' /* 获取歌曲的播放地址 */
import MusicList from 'components/music-list/music-list'
export default {
  name: 'SingerDetail',
  computed: {
    ...mapGetters([
      'singer'
    ]),
    title() {
      return this.singer.name
    },
    bgImage() {
      return this.singer.avatar
    }
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
          this.songs = this._normalizeSongs(res.data.list)
          console.log(this.songs)
        }
      })
    },
    _normalizeSongs(list) {
      let ret = []
      let songmid = []
      list.forEach((item) => {
        let {musicData} = item
        if (musicData.songid && musicData.albummid) {
          ret.push(musicData)
          songmid.push(musicData.songmid)
        }
      })
      const retUrls = []
      getPurlUrl(songmid).then((res) => {
        if (res.code === ERR_OK) {
          let urls = res.req_0.data.midurlinfo
          for (let i = 0; i < ret.length; i++) {
            ret[i].purl = urls[i].purl
            retUrls.push(createSong(ret[i]))
          }
        }
      })
      return retUrls
    }

  },
  components: {
    MusicList
  }
}
</script>

<style lang="stylus" scoped>
  .slide-enter-active, .slide-leave-active
    transition: all 0.3s

  .slide-enter, .slide-leave-to
    transform: translate3d(100%, 0, 0)
</style>