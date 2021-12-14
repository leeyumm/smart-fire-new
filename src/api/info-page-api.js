const INFO_INPUT_PAGE_API = {
  //1.删除一个项目
  delOneProject:{
    method:'delete',
    url:'/caracara/info/project',
  },

  //2.新建一个项目
  addOneProject:{
    method:'post',
    url:'/caracara/info/project',
  },

  //3.添加一台设备
  addOneDev:{
    method: 'post',
    url:'/caracara/info/device',
  },

  //4.获取一个项目中的设备表
  getAllDevInOneProject:{
    method:'get',
    url:'/caracara/info/device/project/id'
  },

  //5.删除一台设备
  delOneDev:{
    method:'delete',
    url:'/caracara/info/device'
  },

  //6.修改一台设备
  editOneDev:{
    method:'put',
    url:'/caracara/info/device',
  },

  //7.修改一个项目
  editOneProject:{
    method:'put',
    url:'/caracara/info/project'
  }

};

export default INFO_INPUT_PAGE_API