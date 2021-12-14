<template>
    <div class="xu-box h100">
      <div class="xu-box-title">
        <span>报警信息</span>
        <ul class="search-wrapper">
          <li>记录查询:</li>
          <li><input type="text" placeholder="请输入设备uuid" v-model="searchUuid"></li>
          <li><button class="xu-btn-sm xu-btn-success" @click="searchAlarmInfos">查询</button></li>
        </ul>
      </div>
      <div class="xu-box-content xu-flex">
        <div class="unhandle-infos-wrapper xu-add-scrollBar">
          <table class="xu-table xu-table-sm xu-table-center xu-table-hover">
            <thead>
              <tr>
                <th>设备uuid</th>
                <th>项目位置</th>
                <th>设备位置</th>
                <th>内容</th>
                <th>时间</th>
                <th>操作</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(unhandleInfo,index) in unhandleAlarmInfos" :key="index">
                <td>{{ unhandleInfo.uuid }}</td>
                <td>{{ unhandleInfo.projectLocation }}</td>
                <td>{{ unhandleInfo.deviceLocation }}</td>
                <td><span class="xu-badge xu-badge-danger xu-ellipse-border">{{ unhandleInfo.alarmMessage }}</span></td>
                <td>{{ unhandleInfo.gmtCreate }}</td>
                <td>
                  <button class="xu-btn xu-btn-sm xu-btn-primary" @click="showModal(unhandleInfo)">
                    <span class="fa fa fa-line-chart"/>
                  </button>
                  <button class="xu-btn xu-btn-sm xu-btn-success" @click="handleInfo(unhandleInfo)">
                    <span class="fa fa-check">已处理</span>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
          <div class="no-warnings" v-show="unhandleAlarmInfos.length === 0">
            <span class="no-warnings-info">暂无未处理的报警信息</span>
          </div>
        </div>
        <div class="handle-infos-wrapper xu-add-scrollBar">
          <table class="xu-table xu-table-sm xu-table-center xu-table-hover">
            <thead>
              <tr>
                <th>设备uuid</th>
                <th>报警内容</th>
                <th>处理时间</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(info,index) in handleAlarmInfos" :key="index">
                <td>{{ info.uuid }}</td>
                <td><span class="xu-badge xu-badge-danger xu-ellipse-border">{{ info.alarmMessage }}</span></td>
                <td>{{ info.gmtModified }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <!-- 显示弹窗 -->
      <history-data-modal 
      :device="infoNow"
      v-if="isHistoryModalShow" 
      @close="isHistoryModalShow = false">
      </history-data-modal>
    </div>
</template>

<script>
import HistoryDataModal from '@/components/share-components/HistoryDataModal.vue'
export default {
    components:{HistoryDataModal},
    data(){
      return {
        handleAlarmInfos:[],
        unhandleAlarmInfos:[],
        handleAlarmInfosCache:[],//对处理过的报警记录的缓存
        searchUuid:'',
        isHistoryModalShow:false,
        infoNow:{},
        timer:null
      }
    },
    methods:{
      //获取未处理的报警信息
      getUnhandleData:function(){
        this.$http['getUnprocessAlarm']()
        .then(res => {
          let {msg} = res
          if(!msg) {
            msg = []
          }
          this.unhandleAlarmInfos = msg.map(ele => {
            ele.gmtCreate = this.$util.getFormatterDate(ele.gmtCreate*1000).YYYYMMDDHHMM
            return ele
          })
          // console.log(this.unhandleAlarmInfos)
          clearInterval(this.timer)
          this.timer = setInterval(()=>{
            console.log('定时获取报警信息')
            this.getUnhandleData()
          },10000)
        })
      },
      //获取已经处理的报警信息
      getHandleData:function(){
        this.handleAlarmInfos = []
        this.$http['getDevAlarmInfos']()
        .then(res => {
          const {msg} = res
          // console.log(res)
          msg.forEach(ele => {
            ele.gmtModified = this.$util.getFormatterDate(ele.gmtModified*1000).YYYYMMDDHHMM
            this.handleAlarmInfos.push(ele)
          })
          this.handleAlarmInfosCache = this.handleAlarmInfos
        })
      },
      //报警记录查询
      searchAlarmInfos:function(){
        this.handleAlarmInfos = this.handleAlarmInfosCache.filter(ele => 
          ele.uuid.includes(this.searchUuid)
        )
      },
      showModal(info){
        this.infoNow = info
        this.isHistoryModalShow = true
      },
      handleInfo(info){
        this.$http['editOneDev']({projectId:info.projectId,uuid:info.uuid,isEnable:true})
        .then(res => {
          this.getUnhandleData()
          this.getHandleData()
        })
      }
    },
    watch:{
      searchUuid:function(newVal,oldVal){
        if(newVal === ''){
          this.handleAlarmInfos = this.handleAlarmInfosCache
        }
      }
    },
    created(){
      this.getUnhandleData()
      this.getHandleData()
    },
    beforeDestroy(){
      clearInterval(this.timer)
    }
}
</script>

<style scoped>
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

.unhandle-infos-wrapper {
  flex:2;
  margin-right: 10px;
  height: 260px;
}
.handle-infos-wrapper {
  flex:1;
  margin-left: 10px;
  height: 260px;
}
.handle-infos-wrapper td {
  font-size: 12px;
}
.no-warnings {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;
}
.no-warnings-info {
  font-size: 15px;
  color: #cccccc;
  line-height: 1;
}
</style>