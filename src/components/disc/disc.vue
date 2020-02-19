<template>
  <transition name="slide">
    <music-list :songs="songs" :title="title" :bg-image="bgImage"></music-list>
  </transition>
</template>

<script>
import MusicList from 'components/music-list/music-list'
import { mapGetters } from 'vuex'
import { getCdInfo } from 'api/recommend'
import {createSong} from 'common/js/song'
import {getPurlUrl} from 'api/song' /* 获取歌曲的播放地址 */
import { ERR_OK } from 'api/config'

export default {
  name: 'Disc',
  data() {
    return {
      songs: []
    }
  },
  computed: {
    title() {
      return this.disc.dissname
    },
    bgImage() {
      return this.disc.imgurl
    },
    ...mapGetters([
      'disc'
    ])
  },
  created() {
    this._getCdInfo()
  },
  methods: {
    _getCdInfo() {
      if (!this.disc.dissid) {
        this.$router.push('/recommend')
        return
      }
      getCdInfo(this.disc.dissid).then((res) => {
        if (res.code === ERR_OK) {
          this.songs = this._normalizeSongs(res.cdlist[0].songlist)
        }
      })
    },
    _normalizeSongs(list) {
      let ret = []
      let songmid = []
      list.forEach((item) => {
        if (item.songid && item.albummid) {
          ret.push(item)
          songmid.push(item.songmid)
        }
      })
      const retUrls = []
      getPurlUrl(songmid).then((res) => {
        if (res.code === ERR_OK) {
          let urls = res.req_0.data.midurlinfo
          for (let i = 0; i < ret.length; i++) {
            if (!urls[i].purl) {
              continue
            }
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