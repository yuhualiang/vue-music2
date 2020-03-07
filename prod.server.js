var express = require('express')
var config = require('./config/index')
var axios = require('axios')
const bodyParser = require('body-parser')

var app = express()

const apiRoutes = express.Router()

var port = process.env.PORT || config.build.port

app.use('api/', apiRoutes)

app.use(bodyParser.urlencoded({extended: true}))

app.use(express.static('./dist'))

app.get('/api/search', (req, res) => {
  var url = 'http://ustbhuangyi.com/music/api/search'

  axios.get(url, {
    headers: {
      referer: 'http://ustbhuangyi.com/music/',
      host: 'ustbhuangyi.com'
    },
    params: req.query
  }).then((response) => {
    var ret = response.data
    if (typeof ret === 'string') {
      var reg = /^\w+\(({[^()]+})\)$/
      var matches = ret.match(reg)
      if (matches) {
        ret = JSON.parse(matches[1])
      }
    }
    res.json(ret)
  }).catch((e) => {
    console.log(e)
  })
})

app.get('/api/getCdInfo', (req, res) => {
  var url = 'http://ustbhuangyi.com/music/api/getCdInfo'
  axios.get(url, {
    headers: {
      referer: 'http://ustbhuangyi.com/music/',
      host: 'ustbhuangyi.com'
    },
    params: req.query
  }).then((response) => {
    res.json(response.data)
  }).catch((e) => {
    console.log(e)
  })
})

app.get('/api/getTopBanner', (req, res) => {
  var url = 'http://ustbhuangyi.com/music/api/getTopBanner'
  axios.get(url, {
    headers: {
      referer: 'http://ustbhuangyi.com/music/',
      host: 'ustbhuangyi.com'
    },
    params: req.query
  }).then((response) => {
    res.json(response.data)
  }).catch((e) => {
    console.log(e)
  })
})
app.get('/api/getLyric', (req, res) => {
  var url = 'http://ustbhuangyi.com/music/api/lyric'
  axios.get(url, {
    headers: {
      referer: 'http://ustbhuangyi.com/music/',
      host: 'ustbhuangyi.com'
    },
    params: req.query
  }).then((response) => {
    res.json((response.data))
  }).catch((e) => {
    console.log(e)
  })
})
app.get('/api/lyric', function (req, res) {
  var url = 'https://c.y.qq.com/lyric/fcgi-bin/fcg_query_lyric_new.fcg'

  axios.get(url, {
    headers: {
      referer: 'https://c.y.qq.com/',
      host: 'c.y.qq.com'
    },
    params: req.query
  }).then((response) => {
    var ret = response.data
    if (typeof ret === 'string') {
      var reg = /^\w+\(({[^()]+})\)$/
      var matches = ret.match(reg)
      if (matches) {
        ret = JSON.parse(matches[1])
      }
    }
    res.json(ret)
  }).catch((e) => {
    console.log(e)
  })
})
// 获取歌曲播放地址
app.post('/api/getPurlUrl', bodyParser.json(), function (req, res) {
  const url = 'https://u.y.qq.com/cgi-bin/musicu.fcg'
  axios.post(url, req.body, {
    headers: {
      referer: 'http://ustbhuangyi.com/music/',
      origin: 'http://ustbhuangyi.com',
      'Content-type': 'application/x-www-form-urlencoded'
    }
  }).then((response) => {
    res.json(response.data)
  }).catch((e) => {
    console.log(e)
  })
})
app.get('/api/getDiscList', (req, res) => {
  var url = 'http://ustbhuangyi.com/music/api/getDiscList'
  axios.get(url, {
    headers: {
      referer: 'http://ustbhuangyi.com',
      host: 'ustbhuangyi.com'
    },
    params: req.query
  }).then((response) => {
    res.json(response.data)
  }).catch((e) => {
    console.log(e)
  })
})



module.exports = app.listen(port, function (err) {
  if (err) {
    console.log(err)
    return
  }
  console.log('Listening at http://localhost:' + port + '\n')
})