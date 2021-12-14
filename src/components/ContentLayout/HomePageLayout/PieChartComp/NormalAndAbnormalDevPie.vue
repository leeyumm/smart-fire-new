<template>
  <div ref="chart" class="chart"></div>
</template>

<script>
import echarts from 'echarts/lib/echarts'
import 'echarts/lib/chart/pie'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/legend'
const option = {
    dataset:{
        source:{}
    },
    color:['#019b4c','#e62229','#e0a800'],
    legend:{
        orient: 'vertical',
        top:0,
        right:0,
        textStyle: {
            fontSize: 13,
            color:'#fff'
        },
        selectedMode: true 
    },
    series:[
        {
            type:'pie',
            radius:['0%','75%'],
            center:['50%','60%'],
            hoverAnimation:false,
            label:{
                position:'inside',
                fontWeight:100,
                formatter:'{c}',
            },
            encode:{
                itemName:'x',
                value:'y'
            }  
        }
    ]
}
export default {
    data(){
        return {
            timer:null
        }
    },
    methods: {
        getData:function(){
            this.$http['getUsingAndUsedDevNum']()
            .then(res => {
                const {msg} = res
                option.dataset.source['x'] = ['有效设备','失效设备','未知设备']
                option.dataset.source['y'] = [msg['valid'],msg['invalid'],msg['unknown']]
                echarts.init(this.$refs['chart']).setOption(option)
                this.$emit('receivedData',{normal:msg['valid'],abnormal:msg['unknown']+msg['invalid']})

                clearInterval(this.timer)
                this.timer = setInterval(()=>{
                    this.getData()
                },10000)
            })
        }
    },
    created(){
        this.getData()
    },
    beforeDestroy(){
        clearInterval(this.timer)
    }
}
</script>

<style scoped>
.chart {
  height: 100%;
}
</style>