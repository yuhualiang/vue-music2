<template>
  <scroll class="suggest"
          :data="result"
          ref="suggest"
          :pullup="pullup"
          :beforeScroll="beforeScroll"
          @beforeScroll="listScroll"
          @scrollToEnd="searchMore">
    <ul class="suggest-list">
      <li class="suggest-item" :key="index"
          v-for="(item, index) in result"
          @click="selectItem(item)">
        <div class="icon">
          <i :class="getIconCls(item)"></i>
        </div>
        <div class="name">
          <p class="text" v-html="getDisplayName(item)"></p>
        </div>
      </li>
      <loading v-show="hasMore" title=""></loading>
    </ul>
    <div v-show="!hasMore && !result.length" class="no-result-wrapper">
      <no-result title="抱歉，暂无搜索结果"></no-result>
    </div>
  </scroll>
</template>

<script>
import {search} from 'api/search'
import {ERR_OK} from 'api/config'
import {createSong} from 'common/js/song'
import {getPurlUrl} from 'api/song' /* 获取歌曲的播放地址 */
import Scroll from 'base/scroll/Scroll'
import Loading from 'base/loading/Loading'
import Singer from 'common/js/singer'
import {mapMutations, mapActions} from 'vuex'
import NoResult from 'base/no-result/no-result'

const TYPE_SINGER = 'singer'
const perpage = 20

export default {
  props: {
    query: {
      type: String,
      default: '桥边姑娘'
    },
    showSinger: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      page: 1,
      result: [],
      pullup: true,
      hasMore: true,
      beforeScroll: true
    }
  },
  methods: {
    refresh() {
      this.$refs.suggest.refresh()
    },
    listScroll() {
      this.$emit('listScroll')
    },
    selectItem(item) {
      if (item.type === TYPE_SINGER) {
        const singer = new Singer({
          id: item.singermid,
          name: item.singername
        })
        this.$router.push({
          path: `/search/${singer.id}`
        })
        this.setSinger(singer)
      } else {
        this.insertSong(item)
      }
      this.$emit('select')
    },
    getIconCls(item) {
      if (item.type === TYPE_SINGER) {
        return 'icon-mine'
      } else {
        return 'icon-music'
      }
    },
    getDisplayName(item) {
      if (item.type === TYPE_SINGER) {
        return item.singername
      } else {
        return `${item.name}-${item.singer}`
      }
    },
    _search() {
      this.hasMore = true
      this.page = 1
      this.$refs.suggest.scrollTo(0, 0)
      search(this.query, this.page, this.showSinger, perpage).then((res) => {
        if (res.code === ERR_OK) {
          let data = res.data
          let ret = []
          if (data.zhida && data.zhida.singerid) {
            ret.push({...data.zhida, ...{type: TYPE_SINGER}})
          }
          if (data.song) {
            this._normalizeSongs(data.song.list).then((res) => {
              ret = ret.concat(res)
              this.result = ret
              this._checkMore(data)
            })
          }
        }
      })
    },
    _checkMore(data) {
      const song = data.song
      if (!song.list.length || (song.curnum + song.curpage * perpage) >= song.totalnum) {
        this.hasMore = false
      }
    },
    searchMore() {
      if (!this.hasMore) {
        return
      }
      this.page++
      search(this.query, this.page, this.showSinger, perpage).then((res) => {
        if (res.code === ERR_OK) {
          let data = res.data
          let ret = []
          if (data.zhida && data.zhida.singerid) {
            ret.push({...data.zhida, ...{type: TYPE_SINGER}})
          }
          if (data.song) {
            this._normalizeSongs(data.song.list).then((res) => {
              ret = ret.concat(res)
              this.result = this.result.concat(ret)
              this._checkMore(data)
            })
          }
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
      return new Promise((resolve, reject) => {
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
            resolve(retUrls)
          } else {
            reject(new Error('no no'))
          }
        })
      })
    },
    ...mapMutations({
      setSinger: 'SET_SINGER'
    }),
    ...mapActions([
      'insertSong'
    ])
  },
  watch: {
    query() {
      this._search()
    }
  },
  components: {
    Scroll, Loading, NoResult
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"

  .suggest
    height: 100%
    overflow: hidden
    .suggest-list
      padding: 0 30px
      .suggest-item
        display: flex
        align-items: center
        padding-bottom: 20px
      .icon
        flex: 0 0 30px
        width: 30px
        [class^="icon-"]
          font-size: 14px
          color: $color-text-d
      .name
        flex: 1
        font-size: $font-size-medium
        color: $color-text-d
        overflow: hidden
        .text
          no-wrap()
    .no-result-wrapper
      position: absolute
      width: 100%
      top: 50%
      transform: translateY(-50%)
</style>