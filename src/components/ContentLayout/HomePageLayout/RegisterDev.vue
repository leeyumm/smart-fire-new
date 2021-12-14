<template>
    <div class="xu-box h100">
      <div class="xu-box-title">
        <span>项目注册设备</span>
        <ul class="search-wrapper">
          <li>项目查询:</li>
          <li><input type="text" placeholder="请输入项目名称" v-model="projectName" @keyup.enter="searchProjects"></li>
          <li><button @click="searchProjects" class="xu-btn-sm xu-btn-success">查询</button></li>
        </ul>
      </div>
      <div class="xu-box-content">
        <table class="xu-table xu-table-sm xu-table-center xu-table-hover">
          <thead>
            <tr>
              <th>项目名称</th>
              <th>产品数量</th>
              <th>项目地址</th>
              <th>完工日期</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(project,index) in projectList.slice((pageNow-1)*MAX_NUM,pageNow*MAX_NUM)" 
                :key="index">
              <td>
                <span :class="{'link':project.deviceNumber > 0}" 
                      @click="project.deviceNumber > 0 && showModal(project)">
                  {{ project.projectName }}
                </span>
              </td>
              <td>{{ project.deviceNumber }}</td>
              <td>{{ project.location }}</td>
              <td>{{ project.projectFinishDate }}</td>
            </tr>
          </tbody>
        </table>       
      </div>
        <!-- 分页器 -->
        <div class="pager-wrapper">
          <xu-pager 
                  :pageNum="Math.ceil(projectList.length / MAX_NUM)" 
                  @hasSelectedPage="togglePage">
          </xu-pager>
        </div>
        <!-- 显示弹框 -->
        <sensor-data-modal 
          :project="projectNow"
          @close='isModalShow = false' 
          v-if='isModalShow'>
        </sensor-data-modal>
    </div>
</template>

<script>
import XuPager from '@/xu-view/XuPager.vue'
import SensorDataModal from '@/components/share-components/SensorDataModal.vue'
export default {
    components:{
      XuPager,
      SensorDataModal
    },
    data(){
      return {
        projectList: [],
        projectListCache: [],
        MAX_NUM:10, //每页显示的数目
        pageNow:1,
        projectName:'',//用于查询的项目名称,
        projectNow:null,
        isModalShow:false,
      }
    },
    methods:{
      getData:function(){
        this.projectList = []
        this.$http['getAllProjectsInfos']()
        .then(res => {
          const {msg} = res
          this.projectList = msg
          this.projectListCache = this.projectList
        })
      },
      //切换页码
      togglePage:function(page){
        this.pageNow = page
      },
      //查询项目
      searchProjects:function(){
        if(this.projectName !== ''){
          this.projectList = this.projectList.filter(ele => 
            ele.projectName.includes(this.projectName)
          )
        }
      },
      //显示弹框
      showModal:function(project){
        this.projectNow = project
        this.isModalShow = true
        this.$store.commit('changeProjectNow',project)
        this.$store.commit('changeMapCenter',{mapCenter:{lng:project.longitude,lat:project.latitude}})
        this.$store.commit('changeInfoWindowPos',{lng:project.longitude,lat:project.latitude})
        this.$store.commit('showInfoWindow')
      }
    },
    watch:{
      projectName:function(newVal,oldVal){
        if(newVal === ''){
          this.projectList = this.projectListCache
        }
      }
    },
    created(){
      this.getData()
    }

}
</script>

<style scoped>
.pager-wrapper {
  position: absolute;
  right: 10px;
  bottom: 10px;
}
.search-wrapper {
  position: absolute;
  right: 10px;
  top:12px;
  font-size: 14px;

}
.search-wrapper > li {
  display: inline-block;
}
.search-wrapper > li:nth-child(2){
  margin: 0 10px;
}
.search-wrapper  input {
  border: 1px solid #3a9fd3;
  border-radius: 3px;
  padding: 2px 4px;
}
</style>