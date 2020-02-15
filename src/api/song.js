import axios from 'axios'
import { commonParams } from './config'

export function getLyric(songmid) {
  const url = 'api/lyric'
  const data = Object.assign({}, commonParams, {
    g_tk: 1928093487,
    notice: 0,
    format: 'json',
    songmid: songmid,
    // platform: 'yqq',
    platform: 'yqq.json',
    hostUin: 0,
    loginUin: 0,
    needNewCode: 0,
    inCharset: 'utf8',
    // categoryId: 10000000,
    pcachetime: +new Date(),
    '-': 'MusicJsonCallback_lrc'
  })
  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
export function getPurlUrl(songmid) {
  const url = '/api/getPurlUrl'
  const songtype = []
  for (let i = 0; i < songmid.length; i++) {
    songtype.push(0)
  }
  const data = Object.assign({}, commonParams, {
    format: 'json',
    platform: 'h5',
    needNewCode: 1,
    uin: 0
  })
  return axios.post(url, {
    'comm': data,
    'req_0': {
      'module': 'vkey.GetVkeyServer',
      'method': 'CgiGetVkey',
      'param': {
        'guid': '5764862861',
        'songmid': songmid,
        'songtype': songtype,
        'uin': '0',
        'loginflag': 0,
        'platform': '23'
      }
    }
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
