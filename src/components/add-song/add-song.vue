<template>
  <transition>
    <div class="add-song" v-show="showFlag" @click.stop>
      <div class="header">
        <div class="to-player" @click="toPlayer">
          <i class="icon-back"></i>
          <i class="icon-back"></i>
        </div>
        <h1 class="title">添加歌曲到列表</h1>
        <div class="close" @click="hide">
          <i class="icon-close"></i>
        </div>
      </div>
      <div class="search-box-wrapper">
        <search-box ref="searchBox" @query="onQueryChange" placeholder="搜索歌曲"></search-box>
      </div>
      <div class="shortcut" v-show="!query">
        <switches :switches="switches" :currentIndex="currentIndex" @switch="switchItem"></switches>
        <div class="list-wrapper">
          <scroll ref="songList" class="list-scroll" v-if="currentIndex===0" :data="playHistory">
            <div class="list-inner">
              <song-list @select="selectSong" :songs="playHistory"></song-list>
            </div>
          </scroll>
          <scroll ref="searchList" :refreshDelay="refreshDelay" class="list-scroll" :data="searchHistory" v-if="currentIndex===1">
            <div class="list-inner">
              <search-list
                    @delete="deleteSearchHistory"
                    @select="addQuery"
                    :searches="searchHistory">
              </search-list>
            </div>
          </scroll>
        </div>
      </div>
      <div class="search-result" v-show="query">
        <suggest :query="query" :showSinger="showSinger"
                  @select="selectSuggest" @listScroll="blurInput">
        </suggest>
      </div>
      <top-tip ref="topTip">
        <div class="tip-title">
          <i class="icon-ok"></i>
          <span class="text">1首歌曲已经添加到播放队列</span>
        </div>
      </top-tip>
    </div>
  </transition>
</template>

<script>
import SearchBox from 'base/search-box/search-box'
import {searchMixin} from 'common/js/mixin'
import Suggest from 'components/suggest/suggest'
import Switches from 'base/switches/switches'
import Scroll from 'base/scroll/Scroll'
import {mapGetters, mapActions} from 'vuex'
import SongList from 'base/song-list/song-list'
import SearchList from 'base/search-list/search-list'
import TopTip from 'base/top-tip/top-tip'
import Song from 'common/js/song'

export default {
  name: 'AddSong',
  mixins: [searchMixin],
  data() {
    return {
      showFlag: false,
      showSinger: false,
      currentIndex: 0,
      switches: [
        {
          name: '最近播放'
        },
        {
          name: '搜索历史'
        }
      ]
    }
  },
  computed: {
    ...mapGetters([
      'playHistory'
    ])
  },
  methods: {
    show() {
      this.showFlag = true
      setTimeout(() => {
        if (this.currentIndex === 0) {
          this.$refs.songList.refresh()
        } else {
          this.$refs.searchList.refresh()
        }
      }, 20)
    },
    hide() {
      this.showFlag = false
    },
    toPlayer() {
      this.hide()
      this.$emit('closePlaylist')
    },
    selectSuggest() {
      this.saveSearch()
      this._showTip()
    },
    switchItem(index) {
      this.currentIndex = index
    },
    selectSong(song, index) {
      console.log(song)
      if (index !== 0) {
        this.insertSong(new Song(song))
        this._showTip()
      }
    },
    _showTip() {
      this.$refs.topTip.show()
    },
    ...mapActions([
      'insertSong'
    ])
  },
  components: {
    SearchBox, TopTip, Suggest, Switches, Scroll, SongList, SearchList
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"

  .add-song
    position: fixed
    top: 0
    bottom: 0
    width: 100%
    z-index: 200
    background: $color-background
    &.slide-enter-active, &.slide-leave-active
      transition: all 0.3s
    &.slide-enter, &.slide-leave-to
      transform: translate3d(100%, 0, 0)
    .header
      position: relative
      height: 44px
      text-align: center
      .title
        line-height: 44px
        font-size: $font-size-large
        color: $color-text
      .close
        position: absolute
        top: 0
        right: 8px
        .icon-close
          display: block
          padding: 12px
          font-size: 20px
          color: $color-theme
      .to-player
        position: absolute
        top 0
        left 8px
        font-size 0
        .icon-back
          display: inline-block
          padding: 12px 0
          font-size: 20px
          color: $color-theme
        .icon-back:nth-child(2)
          position relative
          left -8px
    .search-box-wrapper
      margin: 20px
    .shortcut
      .list-wrapper
        position: absolute
        top: 165px
        bottom: 0
        width: 100%
        .list-scroll
          height: 100%
          overflow: hidden
          .list-inner
            padding: 20px 30px
    .search-result
      position: fixed
      top: 124px
      bottom: 0
      width: 100%
    .tip-title
      text-align: center
      padding: 18px 0
      font-size: 0
      .icon-ok
        font-size: $font-size-medium
        color: $color-theme
        margin-right: 4px
      .text
        font-size: $font-size-medium
        color: $color-text
</style>