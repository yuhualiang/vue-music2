import {mapGetters, mapMutations} from 'vuex'
import {playMode} from 'common/js/config'
import {shuffle} from 'common/js/util'

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

export const playerMixin = {
  computed: {
    iconMode() {
      return this.mode === playMode.sequence ? 'icon-sequence' : this.mode === playMode.loop ? 'icon-loop' : 'icon-random'
    },
    ...mapGetters([
      'sequenceList',
      'playlist',
      'currentSong',
      'mode'
    ])
  },
  methods: {
    changeMode() {
      const mode = (this.mode + 1) % 3
      this.setPlayMode(mode)
      let list = null
      if (mode === playMode.random) {
        list = shuffle(this.sequenceList)
      } else {
        list = this.sequenceList
      }
      this._resetCurrentIndex(list)
      this.setPlayList(list)
    },
    _resetCurrentIndex(list) {
      let index = list.findIndex((item) => {
        return item.id === this.currentSong.id
      })
      this.setCurrentIndex(index)
    },
    ...mapMutations({
      setPlayMode: 'SET_PLAY_MODE',
      setPlayList: 'SET_PLAYLIST',
      setCurrentIndex: 'SET_CURRENT_INDEX',
      setPlayingStage: 'SET_PLAYING_STATE'
    })
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
