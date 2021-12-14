<template>
  <div class="xu-box h100">
    <baidu-map 
       class="bm-view"
       ak="HMsRLrPGidU6hIisM4HYgx0APRKhpm6p"
       @click="getProjectLngAndLat($event)"
       :scroll-wheel-zoom="true"
       :zoom="10"
       :center="mapCenter"
       :mapStyle="require('@/assets/map-style.js')"
      >
      <bm-local-search 
      :keyword="location" 
      :panel='false' 
      :forceLocal='true'>
      </bm-local-search>
    </baidu-map>
  </div>
</template>

<script>
import BaiduMap from 'vue-baidu-map/components/map/Map.vue'
import BmLocalSearch from 'vue-baidu-map/components/search/LocalSearch'
export default {
  components:{BaiduMap,BmLocalSearch},
  props:{
    mapCenter:{
      type:String,
      default:'重庆'
    },
    location:{
      type:String
    }
  },
  methods: {
    getProjectLngAndLat(event){
      const lngAndLat = {
        lng:event.point.lng.toFixed(4),
        lat:event.point.lat.toFixed(4)
      }
      this.$emit('selLngAndLat',lngAndLat)
    }
  }
}
</script>

<style scoped>
.bm-view {
  height: 100%;
}
</style>