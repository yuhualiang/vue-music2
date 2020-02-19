import {mapGetters} from 'vuex'
// import {createSong} from 'common/js/song'
// import {getPurlUrl} from 'api/song' /* 获取歌曲的播放地址 */
// import { ERR_OK } from 'api/config'

export const playlistMixin = {
  computed: {
    ...mapGetters([
      'playlist'
    ])
  },
  mounted() {
    this.handlePlaylist(this.playlist)
  },
  activated() {
    this.handlePlaylist(this.playlist)
  },
  watch: {
    playlist(newVal) {
      this.handlePlaylist(newVal)
    }
  },
  methods: {
    handlePlaylist() {
      throw new Error('component must implement handlePlaylist method!')
    }
  }
}
