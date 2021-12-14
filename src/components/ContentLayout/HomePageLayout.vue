<template>
    <div class="content-wrapper">
        <div class="xu-row h500">
            <div class="xu-col-2 h100">
                <increase-dev></increase-dev>
            </div>
            <div class="xu-col-5 h100">
                <map-wrapper></map-wrapper>
            </div>
            <div class="xu-col-5 h100">
                <register-dev></register-dev>
            </div>
        </div>
        <div class="xu-row h320 mt15">
            <div class="xu-col-7 h100">
                <alert-infos></alert-infos>
            </div>
            <div class="xu-col-5 h100">
                <pie-charts></pie-charts>
            </div>
        </div>
    </div>
</template>

<script>
import IncreaseDev from './HomePageLayout/IncreaseDev.vue'
import Map from './HomePageLayout/Map.vue'
import RegisterDev from './HomePageLayout/RegisterDev.vue'
import AlertInfos from './HomePageLayout/AlertInfos.vue'
import PieCharts from './HomePageLayout/PieCharts.vue'

export default {
    components:{
        IncreaseDev,
        'map-wrapper':Map,
        RegisterDev,
        AlertInfos,
        PieCharts
    }
}
</script>

<style scoped>
.content-wrapper {
    padding: 0 15px;
}
.h500 {
    height: 500px;
}
.h320 {
    height: 320px;
}
.mt15 {
    margin-top: 15px;
}
</style>

