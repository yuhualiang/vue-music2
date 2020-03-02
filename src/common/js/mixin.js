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

// export const searchMixin = {
//   data() {
//     return {
//       query: '',
//       refreshDelay: 120
//     }
//   },
//   computed: {
//     ...mapGetters([
//       'searchHistory'
//     ])
//   },
//   methods: {
//     onQueryChange(query) {
//       this.query = query
//     },
//     blurInput() {
//       this.$refs.searchBox.blur()
//     },
//     addQuery(query) {
//       this.$refs.searchBox.setQuery(query)
//     },
//     saveSearch() {
//       this.saveSearchHistory(this.query)
//     },
//     ...mapActions([
//       'saveSearchHistory',
//       'deleteSearchHistory'
//     ])
//   }
// }
