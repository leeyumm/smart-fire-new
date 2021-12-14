<template>
  <xu-modal @close="close">
    <div class="title">{{ project.projectName }}</div>
    <div class="table-wrapper xu-add-scrollBar">
      <table class="xu-table xu-table-lg xu-table-hover xu-table-no-border xu-table-center xu-table-fix-width">
        <thead>
          <tr>
            <th>uuid</th>
            <th>设备编号</th>
            <th>是否启用</th>
            <th>类型</th>
            <th>安装位置</th>
            <th>通信技术</th>
            <th>通信周期/分钟</th>
            <th>生产日期</th>
            <th>销售日期</th>
            <th>使用年限/年</th>
            <th>备注</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="dev in devList" :key="dev.uuid">
            <td>{{ dev.uuid }}</td>
            <td>{{ dev.simpleNumber }}</td>
            <td>
              <xu-swi v-model='dev.isEnable' @toggle="toggleEnable(dev)"></xu-swi>
            </td>
            <td>{{ dev.type | formatterType}}</td>
            <td>{{ dev.location }}</td>
            <td>{{ dev.communication | formatterCommunication}}</td>
            <td>{{ dev.cycle }}</td>
            <td>{{ dev.productionDate }}</td>
            <td>{{ dev.salesDate }}</td>
            <td>{{ dev.serviceLife }}</td>
            <td>{{ dev.remark }}</td>
            <td>
              <button 
               class="xu-btn xu-btn-sm xu-btn-cancel"
               @click="delDev(dev)">
               删除
               </button>                                    
               <button 
               class="xu-btn xu-btn-sm xu-btn-success"
               @click="showEditDevModal(dev)" 
               >
               编辑
               </button> 
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <!-- 显示编辑弹窗 -->
    <edit-dev-modal 
    :device="devNow"
    :project="project"
    @editSuccess="getData(),isEditDevModalShow = false"
    @close="isEditDevModalShow = false" 
    v-if="isEditDevModalShow">
    </edit-dev-modal>
  </xu-modal>
</template>

<script>
import XuModal from '@/xu-view/modal/XuModal.vue'
import XuSwi from '@/xu-view/form/XuSwi.vue'
import EditDevModal from './EditDevModal.vue'
const TYPE = {
  0:'未知',
  1:'储压',
  2:'非储压'
}
const COMMUNICATION = {
  0:'未知',
  1:'ZigBee',
  2:'NB-IoT'
}
export default { 
  components: {
    XuModal,
    XuSwi,
    EditDevModal
  },
  props:['project'],
  data(){
    return {
      devList:[],
      devNow:{},
      isEditDevModalShow:false
    }
  },
  methods:{
    close(){
      this.$emit('close')
    },
    getData(projectId){
      this.devList = []
      this.$http['getAllDevInOneProject']({params:{projectId:projectId}})
      .then(res => {
        const {msg} = res
        this.devList = msg.reverse()
      })
    },
    delDev(dev){
      this.$http['delOneDev']({data:{projectId:this.project.projectId,uuid:dev.uuid}})
      .then(res => {
        console.log(res)
        this.getData()
        this.$emit('delSuccess')
      })
    },
    toggleEnable(dev){
      const data = dev
      data.projectId = this.project.projectId
      this.$http['editOneDev'](data)
      .then(res => {
        console.log(res)
      })
    },
    showEditDevModal(dev){
      this.devNow = JSON.parse(JSON.stringify(dev)) //有没有好的方法
      this.devNow['type'] = TYPE[dev.type]
      this.devNow['communication'] = COMMUNICATION[dev.communication]
      this.isEditDevModalShow = true
    }
  },
  filters:{
    formatterType(value){
      return TYPE[parseInt(value)]
    },
    formatterCommunication(value){
      return COMMUNICATION[parseInt(value)]
    }
  },
  created(){
    this.getData(this.project.projectId)
  }
}
</script>

<style scoped>
.table-wrapper {
  max-height: 500px;
  min-width: 1200px;
}
.title {
  color: #05bbca;
  margin-bottom: 10px;
}
</style>