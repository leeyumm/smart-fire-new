import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    map:{
      mapCenter:'重庆',
      infoWindowPos:{},
      infoWindowShow:false,
      projectNow:{}
    },
    auth:{
      token:''
    }
  },
  mutations: {
    changeMapCenter:function(state,payload){
      state.map.mapCenter = payload.mapCenter
    },
    changeInfoWindowPos:function(state,payload){
      state.map.infoWindowPos = payload
    },
    showInfoWindow:function(state){
      state.map.infoWindowShow = true
    },
    closeInfoWindow:function(state){
      state.map.infoWindowShow = false
    },
    changeProjectNow:function(state,payload){
      state.map.projectNow = payload
    },
    changeToken:function(state,payload){
      state.auth.token = payload
    }
  },
  actions: {
  },
  modules: {
  }
})
