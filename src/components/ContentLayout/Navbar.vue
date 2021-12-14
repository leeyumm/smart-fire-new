<template>
    <div class="navbar-wrapper">
        <div class="logo">
                <img src="../../assets/login/company_logo.jpg" alt="" height="40px">
        </div>
        <ul>
            <router-link tag="li" active-class="active" exact to="/home">
                <span class="fa fa-home"> 首页</span>
            </router-link>
            <router-link tag="li" active-class="active" exact to="/info">
                <span class="fa fa-edit"> 信息</span>
            </router-link>
            <li @click="logout">
                <span class="fa fa-arrow-left"> 退出</span>
            </li>
        </ul>
    </div>
</template>
<script>
export default {
    data(){
        return {
           
        }
    },
    methods:{
        logout:function(){
            this.$router.push('/')
        },
    }
}
</script>

<style scoped>
.navbar-wrapper {
    height: 100%;
    background-color: rgba(36, 70, 98, 0.7);
    color: rgb(170, 169, 169)
}
.logo {
    float: left;
    padding: 5px 15px
}
.navbar-wrapper > ul {
    float: left;
    height: 50px;
    width: 1776px;
    /* padding: 10px 0; */
}
.navbar-wrapper > ul > li{
    display: inline-block;
    line-height: 50px;
    box-sizing: content-box;
    font-size: 20px;
    font-weight: 900;
    height: 100%;
    box-sizing: border-box;
    padding: 0 10px;
    cursor: pointer;
}

.navbar-wrapper > ul > li:hover {
    color: #fff
}

.navbar-wrapper > ul > li:nth-child(2){
     margin: 0 15px;
}
.navbar-wrapper > ul > li:nth-child(3){
    float: right;
}

.active {
    border-bottom: 2px solid #ffffff;
    color: #fff;
}
</style>

