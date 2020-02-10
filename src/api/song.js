import axios from 'axios'
import { commonParams } from './config'
export function getSongVkey(songmid) {
  const url = '/api/getSongVkey'
  const data = Object.assign({}, {
    '-': 'getplaysongvkey025929556475057458',
    g_tk: 5381,
    loginUin: 1547719290,
    hostUin: 0,
    format: 'json',
    inCharset: 'utf8',
    outCharset: 'utf-8',
    notice: 0,
    platform: 'yqq.json',
    needNewCode: 0,
    data: {
      'req': {
        'module': 'CDN.SrfCdnDispatchServer',
        'method': 'GetCdnDispatch',
        'param': {
          'guid': '2358261808',
          'calltype': 0,
          'userip': ''
        }
      },
      'req_0': {
        'module': 'vkey.GetVkeyServer',
        'method': 'CgiGetVkey',
        'param': {
          'guid': '2358261808',
          'songmid': ['002zfxmN2e1vLQ'],
          'songtype': [0],
          'uin': '1547719290',
          'loginflag': 1,
          'platform': '20'
        }
      },
      'comm': {
        'uin': 1547719290,
        'format': 'json',
        'ct': 24,
        'cv': 0
      }
    }
  })

  // return jsonp(url, data)
  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
export function getPurlUrl(songmid) {
  const url = '/api/getPurlUrl'
  const data = Object.assign({}, commonParams, {
    g_tk: 5381,
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
        'songmid': ['003y8dsH2wBHlo', '000DMpJ73yeITP', '000dcZ9I1nzO62', '000QgFcm0v8WaF', '000dcZ9I1nzO62'],
        'songtype': [0, 0, 0, 0, 0],
        'uin': '0',
        'loginflag': 0,
        'platform': '23'
      }
    }
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
