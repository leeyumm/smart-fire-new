<template>
  <div class="content-wrapper">
    <div class="xu-row h900">
      <div class=" xu-col-3 h100">
        <div class="form-wrapper">
          <add-project-form 
          @selProvince="getMapCenter"
          @selLocation="getLocation"
          @submitSuccess="key===0?key=1:key=0" 
          :lngAndLat="lngAndLat" ></add-project-form>
        </div>
        <div class="map-wrapper">
          <mini-map 
          :mapCenter="mapCenter"
          :location="location" 
          @selLngAndLat="getLngAndLat">
          </mini-map>
        </div>
      </div>
      <div class=" xu-col-9 h100">
        <div class="project-table-wrapper h100">
          <project-cases :key="key"></project-cases>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AddProjectForm from './info-page/AddProjectForm.vue'
import MiniMap from './info-page/MiniMap.vue'
import ProjectCases from './info-page/ProjectCases.vue'
export default {
  components:{AddProjectForm,MiniMap,ProjectCases},
  data(){
    return {
      mapCenter:'重庆',
      location:'',
      lngAndLat:{},
      key:0,
    }
  },
  methods: {
    getMapCenter(mapCenter){
      this.mapCenter = mapCenter
    },
    getLocation(loc){
      this.location = loc
    },
    getLngAndLat(lngAndLat){
      this.lngAndLat = lngAndLat
    }
  }
}
</script>

<style scoped>
.content-wrapper {
  padding: 0 15px;
}
.h900{
  height: 830px;
}
.form-wrapper {
  height: 500px;
  margin-bottom: 30px;
}
.map-wrapper {
  height: 300px;
}
</style>