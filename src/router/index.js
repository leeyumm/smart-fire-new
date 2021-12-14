import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)

const routes = [
 {
   path:'/',
   redirect: '/login'
 },
 {
   path:'/login',
   component: () => import('@/views/LoginLayout.vue'),
   meta:{
     title:'登录页'
   }
 },
 {
   path:'/home',
   component: () => import('@/views/ContentLayout.vue'),
   children: [
     {
       path:'',
       component :() => import('@/components/ContentLayout/HomePageLayout.vue'),
       meta:{
        title:'首页',
        auth:true
      }
     },
     {
       path:'/info',
       component:() => import('@/components/ContentLayout/InfoPageLayout.vue'),
       meta:{
        title:'信息',
        auth:true
      }
     }
   ]
 }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to,from,next) => {
  if(to.meta.title){
    document.title = to.meta.title
  }
  if(to.meta.auth){
    if(sessionStorage['token']){
      next()
    } else {
      next('/login')
    }
  } else {
    next()
  }
})



export default router
