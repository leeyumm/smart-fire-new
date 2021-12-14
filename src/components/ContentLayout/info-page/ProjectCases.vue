<template>
  <div class="xu-box h100">
    <div class="xu-box-title">项目概况</div>
    <div class="xu-box-content">
      <table class="xu-table xu-table-center xu-table-hover">
        <thead>
          <tr>
            <!-- <th style="width:50px">#ID</th> -->
            <th style="width:250px">项目名称</th>
            <th style="width:250px">项目地址</th>
            <th style="width:150px">经纬度</th>
            <th style="width:100px">消防设备数量</th>
            <th style="width:100px">完工日期</th>
            <th style="width:180px">备注</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="project in projectList.slice((pageNow-1)*MAX_NUM,pageNow*MAX_NUM)" :key="project.projectId">
            <!-- <td>{{ project.projectId }}</td> -->
            <td>{{ project.projectName }}</td>
            <td>{{ project.location }}</td>
            <td>({{project.longitude}}，{{project.latitude}})</td>
            <td>{{project.deviceNumber}}</td>
            <td>{{project.projectFinishDate}}</td>
            <td>{{project.remark | formatterRemark}}</td>
            <td>
               <button 
               class="xu-btn xu-btn-sm xu-btn-cancel"
               :class="{'xu-invalid-btn':project.deviceNumber > 0}" 
               @click="del(project)">
               删除
               </button>            
               <button 
               class="xu-btn xu-btn-sm xu-btn-primary"
               @click="showAddDevModal(project)">
               添加设备
               </button>            
               <button 
               class="xu-btn xu-btn-sm xu-btn-info" 
               :class="{'xu-invalid-btn':project.deviceNumber === 0}"
               @click="showLookDevModal(project)">
               查看设备
               </button>            
               <button 
               class="xu-btn xu-btn-sm xu-btn-success" 
               @click="showEditModal(project)">
               编辑
               </button>            
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <!-- 编辑弹框 -->
    <edit-modal 
    @close="isEditModalShow = false"
    @editSuccess="getData(),isEditModalShow = false"
    :project="projectNow" 
    v-if="isEditModalShow">
    </edit-modal>
    <!-- 添加设备弹框 -->
    <add-dev-modal
     @close='isAddDevModalShow = false'
     @addSuccess="getData(),isAddDevModalShow = false"
     :project="projectNow"
     v-if="isAddDevModalShow">
    </add-dev-modal>
    <!-- 查看设备弹窗 -->
    <look-dev-modal 
    @close='isLookDevModalShow = false'
    @delSuccess="getData()"
    :project="projectNow"
    v-if="isLookDevModalShow">
    </look-dev-modal>
    <!-- 分页器 -->
    <div class="pager-wrapper">
      <xu-pager 
              :pageNum="Math.ceil(projectList.length / MAX_NUM)" 
              @hasSelectedPage="togglePage">
      </xu-pager>
    </div>
  </div>
</template>

<script>
import EditModal from './ProjectCasesComp/EditModal.vue'
import AddDevModal from './ProjectCasesComp/AddDevModal.vue'
import LookDevModal from './ProjectCasesComp/LookDevModal.vue'
import XuPager from '@/xu-view/XuPager.vue'
export default {
  components: {
    EditModal,
    AddDevModal,
    LookDevModal,
    XuPager
  },
  data(){
    return {
      projectList:[],
      projectNow:{},
      isEditModalShow:false,
      isAddDevModalShow:false,
      isLookDevModalShow:false,
      MAX_NUM:14, //每页显示的数目
      pageNow:1,
    }
  },
  methods: {
    getData(){
      this.projectList = []
      this.$http['getAllProjectsInfos']()
      .then(res => {
        const {msg} = res
        this.projectList = msg
        this.projectListCache = this.projectList
      })
    },
    //2.删除一个项目
    del(project){
      this.projectNow = project
      const{projectId:id} = project
      this.$http['delOneProject']({data:{projectId:id}})
      .then(res => {
        this.getData()
      })
    },
    //3.编辑项目弹窗
    showEditModal(project){
      // console.log(project)
      this.projectNow = project
      this.isEditModalShow = true
    },
    //4.添加设备弹窗
    showAddDevModal(project){
      this.projectNow = project
      this.isAddDevModalShow = true
    },
    //5.查看设备
    showLookDevModal(project){
      this.projectNow = project
      this.isLookDevModalShow = true
    },
    //6.切换页码
    togglePage:function(page){
      this.pageNow = page
    },
  },
  filters:{
    formatterRemark(value){
      const res = value === ''?'无':value
      return res
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
</style>