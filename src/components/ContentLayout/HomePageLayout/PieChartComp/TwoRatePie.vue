<template>
  <div class="chart">
    <div ref="chart1"></div>
    <div ref="chart2"></div>
  </div>
</template>

<script>
import echarts from 'echarts/lib/echarts'
import 'echarts/lib/chart/pie'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/legend'
import 'echarts/lib/component/title'
const option = {
    dataset:{
        source:{}
    },
    title:{},
    color:['#019b4c','#e62229','#e0a800'],
    legend:{
        orient: 'vertical',
        top:0,
        left:0,
        textStyle: {
            fontSize: 13,
            color:'#fff'
        },
        selectedMode: true 
    },
    series:[
        {
            type:'pie',
            radius:['50%','65%'],
            center:['50%','60%'],
            hoverAnimation:false,
            label:{
                position:'center',
                fontSize:24,
                formatter:param => {
                  if(param.dataIndex === 0){
                    return Math.floor(param.percent) + '%'
                  }
                }
            },
            encode:{
                value:'y'
            }  
        }
    ]
}
export default {
  props:['onOffData','abnorNorData'],
  watch:{
    'onOffData':{
      handler:function(newVal,oldVal){
        option.dataset.source = {
          'y':[newVal['online'],newVal['offline']]
        }
        option.title = {
          text:'设备平均在线率',
          x:'center',
          textStyle:{
            color:'#fff',
            
          }
        }
         echarts.init(this.$refs['chart1']).setOption(option)
      },
      deep:true
    },
    'abnorNorData':{
      handler:function(newVal,oldVal){
        option.dataset.source = {
          'y':[newVal['normal'],newVal['abnormal']]
        }
        option.title = {
          text:'设备平均有效率',
          x:'center',
          textStyle:{
            color:'#fff',
            
          }
        }
         echarts.init(this.$refs['chart2']).setOption(option)
      },
      deep:true
    },
  }
}
</script>

<style scoped>
.chart{
  height: 100%;
}
.chart > div {
  height: 50%;
}
</style>