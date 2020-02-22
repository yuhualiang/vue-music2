<template>
  <transition name="slide">
    <music-list :rank="rank" :title="title" :bg-image="bgImage" :songs="songs"></music-list>
  </transition>
</template>

<script>
import MusicList from 'components/music-list/music-list'
import {mapGetters} from 'vuex'
import {ERR_OK} from 'api/config'
import {getMusicList} from 'api/rank'
import {createSong} from 'common/js/song'
import {getPurlUrl} from 'api/song' /* 获取歌曲的播放地址 */

export default {
  name: 'TopList',
  data() {
    return {
      songs: [],
      rank: true
    }
  },
  computed: {
    title() {
      return this.topList.topTitle
    },
    bgImage() {
      if (this.songs.length) {
        return this.songs[0].image
      }
      return ''
    },
    ...mapGetters([
      'topList'
    ])
  },
  created() {
    this._getMusicList()
  },
  methods: {
    _getMusicList() {
      getMusicList(this.topList.id).then((res) => {
        if (!this.topList.id) {
          this.$router.push('/rank')
          return
        }
        if (res.code === ERR_OK) {
          this.songs = this._normalizeSongs(res.songlist)
        }
      })
    },
    _normalizeSongs(list) {
      let ret = []
      let songmid = []
      list.forEach((item) => {
        let musicData = item.data
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
            if (!urls[i]) {
              continue
            }
            if (!urls[i].purl) {
              continue
            }
            ret[i]['purl'] = urls[i].purl
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
  transition all 0.3s ease
.slide-enter, .slide-leave-to
  transition transform(100%, 0, 0)
</style>
