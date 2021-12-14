<template>
    <div class="xu-box h100">
      <baidu-map 
       class="bm-view"
       ak="HMsRLrPGidU6hIisM4HYgx0APRKhpm6p"
       :scroll-wheel-zoom="true"
       :zoom="10"
       :center="mapCenter"
       :mapStyle="require('@/assets/map-style.js')"
      >
        <!-- 比例尺 -->
        <bm-scale anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-scale>
        <!-- 坐标点 -->
        <bm-marker 
         v-for="(project,index) in projectList"
         @mouseover="infoWindowShow(project)"
         @click="project.deviceNumber > 0 && showModal(project)" 
         :key="index"
         :icon="selIcon(project.deviceNumber)"
         :position="{lng:project.longitude,lat:project.latitude}"
        >
        </bm-marker>
        <!-- 信息窗口 -->
        <bm-info-window 
         :show="isInfoWindowShow"
         :position="infoWindowPos"
         title="项目概览"
         @open="showInfoWindow"
         @close="closeInfoWindow"
        >
          <div class="info-window-content">
            <p><span class="info-window-item"></span>项目名称：{{projectNow.projectName}}</p>
            <p><span class="info-window-item"></span>项目位置：{{projectNow.location}}</p>
            <p><span class="info-window-item"></span>产品数量：{{projectNow.deviceNumber}}</p>
            <p><span class="info-window-item"></span>完工日期：{{projectNow.projectFinishDate}}</p>
          </div>
        </bm-info-window>
      </baidu-map>
      <!-- 右下角的图例 -->
      <div class="icon-legend">
        <div class="icon-item">
          <span class="bg-icon-blue"></span>
          <span>有消防设备</span>
        </div>
        <div class="icon-item">
          <span class="bg-icon-red"></span>
          <span>无消防设备</span>
        </div>
      </div>
      <!-- 弹框 -->
      <sensor-data-modal 
        :project="projectNow"
        @close='isModalShow = false' 
        v-if='isModalShow'>
      </sensor-data-modal>
    </div>
</template>

<script>
import BaiduMap from 'vue-baidu-map/components/map/Map.vue'
import BmScale from 'vue-baidu-map/components/controls/Scale.vue'
import BmMarker from 'vue-baidu-map/components/overlays/Marker.vue'
import BmInfoWindow from 'vue-baidu-map/components/overlays/InfoWindow.vue'
import SensorDataModal from '@/components/share-components/SensorDataModal.vue'

export default {
    components:{
      BaiduMap,
      BmScale,
      BmMarker,
      BmInfoWindow,
      SensorDataModal
    },
    data(){
      return {
        projectList: [],
        isModalShow:false,
      }
    },
    methods:{
      //1. 组件挂载前加载数据
      getData:function(){
        this.$http['getAllProjectsInfos']()
        .then(res => {
          const {msg} = res
          this.projectList = []
          msg.forEach(ele => {
            this.projectList.push(ele)
          })
        })
      },
      //2. 显示信息窗口
      infoWindowShow:function(project){
        this.$store.commit('changeProjectNow',project)
        this.$store.commit('changeInfoWindowPos',{lng:project.longitude,lat:project.latitude})
        this.$store.commit('showInfoWindow')
        
      },
      closeInfoWindow:function(){
        this.$store.commit('closeInfoWindow')
      },
      showInfoWindow:function(){
        this.$store.commit('showInfoWindow')
      },
      //4.选择合适的定位图标
      selIcon:function(deviceNumber){
        if(deviceNumber > 0){
          return {
            url:require('../../../assets/map/loc_blue.png'),
            size:{width: 35, height: 35}
          }
        } else {
          return {
            url:require('../../../assets/map/loc_red.png'),
            size:{width: 35, height: 35}
          }
        }
      },
      //显示弹框
      showModal:function(project){
        this.isModalShow = true
      }
      //
    },
    computed:{
      mapCenter(){
        return this.$store.state.map.mapCenter
      },
      isInfoWindowShow(){
        return this.$store.state.map.infoWindowShow
      },
      infoWindowPos(){
        return this.$store.state.map.infoWindowPos
      },
      projectNow(){
        return this.$store.state.map.projectNow
      }
    },
    created(){
      this.getData()
    }
}
</script>

<style scoped>
.bm-view {
  height: 100%;
}
.info-window-content {
    border-radius: 5px;
    font-size: 14px;
    color: #3a4460;
    margin-bottom: 5px;
  }
  .info-window-content > p {
    line-height: 1.5;
  }
  .info-window-item {
    display: inline-block;
    margin-right: 5px;
    height: 12px;
    width: 12px;
    border-radius: 5px;
    background-color: #019b4c;
  }
  .icon-legend {
    position: absolute;
    background-color: rgba(0, 0, 0, 0.8);
    right: 1px;
    bottom: 1px;
  }
  .icon-item {
    margin: 5px 15px;
  }
  .icon-item > span {
    display: inline-block;
    height: 25px;
    line-height: 25px;
    font-size: 16px;
  }
  .icon-item > span:first-child {
    width: 25px;
    margin-right: 15px;
    vertical-align: bottom;
  }
  .bg-icon-blue ~ span {
    color: #1296db;
  }
  .bg-icon-blue {
    background-image: url('../../../assets/map/loc_blue.png');
    background-size: cover;
  }
  .bg-icon-red ~ span {
    color: #e62229;
  }
  .bg-icon-red {
    background-image: url('../../../assets/map/loc_red.png');
    background-size: cover;
  }
</style>