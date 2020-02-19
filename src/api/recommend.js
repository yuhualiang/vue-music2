import jsonp from 'common/js/jsonp'
import { commonParams, options } from './config'
import axios from 'axios'

export function getRecommend() {
  const url = 'http://ustbhuangyi.com/music/api/getTopBanner'

  const data = Object.assign({}, commonParams, {
    platform: 'h5',
    uin: 0,
    needNewCode: 1
  })

  return jsonp(url, data, options)
}
export function getCdInfo(disstid) {
  const url = '/api/getCdInfo'

  const data = Object.assign({}, commonParams, {
    g_tk: 1928093487,
    format: jsonp,
    disstid: disstid,
    type: 1,
    json: 1,
    utf8: 1,
    onlysong: 0,
    platform: 'yqq',
    hostUin: 0,
    needNewCode: 0
  })

  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

export function getCdList(disstid) {
  const url = '/api/getCdList'

  const data = Object.assign({}, commonParams, {
    type: 1,
    json: 1,
    utf8: 1,
    onlysong: 0,
    new_format: 1,
    disstid: disstid,
    loginUin: 0,
    hostUin: 0,
    format: 'json',
    inCharset: 'utf8',
    platform: 'yqq.json',
    needNewCode: 0
  })

  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

export function getTopBanner() {
  const url = '/api/getTopBanner'
  const data = {
    g_tk: 1928093487,
    inCharset: 'utf8',
    outCharset: 'utf-8',
    notice: 0,
    format: 'json',
    platform: 'yqq.json',
    hostUin: 0,
    needNewCode: 0,
    '-': 'recom8151706047716907',
    data: {
      'comm': {'ct': 24},
      'category': {'method': 'get_hot_category', 'param': {'qq': ''}, 'module': 'music.web_category_svr'},
      'recomPlaylist': {'method': 'get_hot_recommend', 'param': {'async': 1, 'cmd': 2}, 'module': 'playlist.HotRecommendServer'},
      'playlist': {'method': 'get_playlist_by_category', 'param': {'id': 8, 'curPage': 1, 'size': 40, 'order': 5, 'titleid': 8}, 'module': 'playlist.PlayListPlazaServer'},
      'new_song': {'module': 'newsong.NewSongServer', 'method': 'get_new_song_info', 'param': {'type': 5}},
      'new_album': {'module': 'newalbum.NewAlbumServer', 'method': 'get_new_album_info', 'param': {'area': 1, 'sin': 0, 'num': 10}},
      'new_album_tag': {'module': 'newalbum.NewAlbumServer', 'method': 'get_new_album_area', 'param': {}},
      'toplist': {'module': 'musicToplist.ToplistInfoServer', 'method': 'GetAll', 'param': {}},
      'focus': {'module': 'QQMusic.MusichallServer', 'method': 'GetFocus', 'param': {}}}
  }
  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

export function getDiscList() {
  const url = '/api/getDiscList'
  const data = {
    g_tk: 1928093487,
    inCharset: 'utf-8',
    outCharset: 'utf-8',
    notice: 0,
    format: 'json',
    platform: 'yqq',
    hostUin: 0,
    sin: 0,
    ein: 29,
    sortId: 5,
    needNewCode: 0,
    categoryId: 10000000,
    rnd: Math.random()
  }

  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}