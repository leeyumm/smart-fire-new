<template>
  <div ref="chart-container" id="chart-container"></div>
</template>

<script>
import echarts from 'echarts/lib/echarts'
import 'echarts/lib/chart/pie'
import 'echarts/lib/chart/bar'
import 'echarts/lib/chart/line'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/legend'
import 'echarts/lib/component/title'

// const echarts = require('echarts/lib/echarts');
// require('echarts/lib/chart/pie');
// require('echarts/lib/chart/bar');
// require('echarts/lib/chart/line');
// require('echarts/lib/component/tooltip');
// require('echarts/lib/component/legend');
// require('echarts/lib/component/title')
export default {
    props:{
        //0.绘图类型(只有三种)
        type:{
            type:String
        },
        //1.接收数据项颜色
        color:{
            type:Array,
            default:() => ['#339ca8','#005eaa','#2b821d','#0098d9','#e6b600','#c12e34'],
        },
        //2.接收图例配置，默认不显示
        legend:{
            type: Object,
            default:null
        },
        //3.配置tooltip（鼠标放在曲线上的弹框）
        tooltip:{
            type:Object,
            default:() => {return {trigger: 'item'}}
        },
        //4.配置Y轴
        yAxis:{
            type:Object,
            default:() => {return {type:'value'}}
        },
        //5.配置X轴
        xAxis:{
            type:Object,
            default:() => {return {type:'category'}}
        },
        //6.配置网格
        grid:{
            type:Object,
            default:() => {return  {containLabel: true, left:'5px', right:'5px', top:'5px', bottom:'5px'}}
        },
        //7.数据集 格式{x:[],y:[]}
        source:{
            type:Object
        },

    },
    data(){
        return {
            option:{},
            chartInst:null
        }
    },
    methods: {
       initOption(){
           this.option.series = []
           this.option.title = this.title
           this.option.dataset = {};
           this.option.dataset.source = this.source
           this.option.color = this.color;
           this.option.tooltip = this.tooltip;
           this.option.grid = this.grid;
           this.option.yAxis = this.yAxis;
           this.option.xAxis = this.xAxis;
           this.option.legend = this.legend;
           switch(this.type){
                case 'line':
                   this.option.series[0] = {
                       type:'line',
                       encode: {
                           x:'x',
                           y:'y'
                       }
                   }
                break;
                case 'bar':
                    this.option.series[0] = {
                       type:'bar',
                       encode: {
                           x:'x',
                           y:'y'
                       }
                   }
                break;
                case 'pie':
                    this.option.yAxis = null;
                    this.option.xAxis = null;
                    this.option.legend = {
                        orient: 'vertical',
                        top:0,
                        left:0,
                        textStyle: {
                            fontSize: 13,
                            color:'#fff'
                        },
                        selectedMode: true
                    }
                    this.option.series[0] = {
                        type:'pie',
                        radius:['0%','65%'],
                        center:['50%','50%'],
                        hoverAnimation:false,
                        label:{
                            // show:false,
                            position:'inside',
                            formatter:'{c}'
                        },
                        encode:{
                            itemName:'x',
                            value:'y'
                        }
                    };
                break;
                }

        }
       
    },
    mounted(){
        this.chartInst = echarts.init(this.$refs['chart-container'])
        this.initOption()
        // console.log(this.option)
        this.chartInst.setOption(this.option)
        // console.log(this.dataset)
    },
    // watch:{
    //     dataset:function(){
    //         console.log(this.dataset)
    //         this.initOption()
    //         this.chartInst.setOption(this.option)
    //     }
    // }
}
</script>

<style scoped>
#chart-container {
    height: 100%;
    /* background-color: transparent; */
}
</style>
