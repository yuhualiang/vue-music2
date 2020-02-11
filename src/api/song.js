import axios from 'axios'
import { commonParams } from './config'

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
