<template>
  <xu-modal  @close='close'>
    <div class="title">
      {{yearNow}}年{{monthNow}}月的新增项目情况
    </div>
    <div class="table-wrapper">
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
            <tr v-for="project in projectList" 
                :key="project.projectId">
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
    <!-- 显示弹框 -->
    <sensor-data-modal 
      :project="projectNow"
      @close='isModalShow = false' 
      v-if='isModalShow'>
    </sensor-data-modal>
  </xu-modal>
</template>

<script>
import XuModal from '@/xu-view/modal/XuModal.vue'
import SensorDataModal from '@/components/share-components/SensorDataModal.vue'
export default {
  components:{XuModal,SensorDataModal},
  props:['yearNow','monthNow'],
  data(){
    return {
      projectList:[],
      projectNow:null,
      isModalShow:false
    }
  },
  methods:{
    close:function(){
      this.$emit('close')
    },
    getData:function(){
      this.$http['getProjectsByTime']({params:{year:this.yearNow,month:this.monthNow}})
      .then(res => {
        const {msg} = res
        this.projectList = msg
      })
    },
    showModal:function(project){
      this.projectNow = project
      this.isModalShow = true
      this.$store.commit('changeProjectNow',project)
      this.$store.commit('changeMapCenter',{mapCenter:{lng:project.longitude,lat:project.latitude}})
      this.$store.commit('showInfoWindow')
    }
  },
  created(){
    this.getData()
  }
}
</script>

<style scoped>
.title {
  margin-bottom: 10px;
  color: #05bbca;
}
.table-wrapper {
  max-height: 500px;
  width: 700px;
}
</style>