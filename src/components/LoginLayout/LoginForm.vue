<template>
    <div class="form-wrapper">
        <div class="username">请输入用户名:</div>
        <div>
            <input type="text"  placeholder="用户名" v-model="username">
        </div>
        <div class="password">请输入密码:</div>
        <div>
            <input type="password" placeholder="密码" v-model="password" @keydown.enter="login">
        </div>
        <div class="btn-wrapper">
            <input type="button" value="登录" @click="login">
            <p>没有账号？注册一个</p>
        </div>
    </div>
</template>

<script>
import showAlert from '@/xu-view/tips/alert/XuAlert.js'
export default {
    name:'LoginForm',
    data(){
        return {
            username:'',
            password:''
        }
    },
    methods:{
        login:function(){
            this.$pageHttp['login']({username:this.username,password:this.password})
            .then(res => {
                const { data:{code,msg} } = res
                if(code === 200){
                    const {expire,token} = msg
                    // console.log(token)
                    window.sessionStorage['token'] = token
                    this.$router.push('/home')
                } else {
                    showAlert(msg,'failure')
                }
            })
        }
    }
}
</script>

<style scoped>
.form-wrapper {
    margin: 80px 50px;
    background-color: rgba(255, 255, 255, 0.6);
    border-radius: 20px;
    padding: 40px 20px;
}
.password {
    margin-top: 20px;
}
.form-wrapper input{
    width: 100%;
    box-sizing: border-box;
    padding: 10px;
    border-radius: 5px;
    border: 1px solid #cccccc;
    font-size: 16px;
}
.form-wrapper input:hover,
.form-wrapper input:focus{
    border-color: #3a9fd3;
}
.btn-wrapper {
    margin-top: 20px;
}
.btn-wrapper > input {
    background-color: #29a745;
    color: #ffffff;
    font-size: 17px;
    cursor: pointer;
}
.btn-wrapper > input:hover {
    background-color: #269e40;
}
.btn-wrapper > p {
    cursor: pointer;
    font-size: 14px;
    color: cornflowerblue;
}
</style>


