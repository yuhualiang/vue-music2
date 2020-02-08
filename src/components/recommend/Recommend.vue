<template>
  <div>
    <ul>
      <li v-for="item in slider" :key="item.id">{{item.picUrl}}</li>
    </ul>
  </div>
</template>

<script>
import { getTopBanner } from 'api/recommend'
import { ERR_OK } from 'api/config'
export default {
  name: 'Recommend',
  data() {
    return {
      slider: []
    }
  },
  created() {
    this._getTopBanner()
  },
  methods: {
    _getTopBanner() {
      getTopBanner().then((res) => {
        if (res.code === ERR_OK) {
          this.slider = res.data.slider
        }
      })
    }
  }
}
</script>