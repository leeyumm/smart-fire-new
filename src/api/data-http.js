import axios from "axios";
import router from "../router/index";
import homePageApi from "./home-page-api";
import infoPageApi from "./info-page-api";
import showAlert from "@/xu-view/tips/alert/XuAlert";
import showToastr from "@/xu-view/tips/toastr/XuToastr.js";

// baseURL:'http://www.zhxf.yuhualab.com:8080',
let dataPool = axios.create({
  baseURL: "http://www.zhxf.yuhualab.com:8080",
});
// const isDevelopmentMode = true
// let dataPool = axios.create({
//   baseURL:isDevelopmentMode ? 'http://172.20.29.91:8888' : 'http://www.zhxf.yuhualab.com:8080',
// });

//请求拦截器
dataPool.interceptors.request.use(
  (config) => {
    // console.log(config.headers)
    const { method } = config;
    config.headers.common["token"] = window.sessionStorage["token"];
    if (method === "delete") {
      return new Promise((resolve) => {
        showToastr("确定删除吗？", () => resolve(config));
      });
    } else {
      return config;
    }
  },
  (error) => {
    console.log(error);
    return Promise.reject(error);
  }
);

//响应拦截器
dataPool.interceptors.response.use(
  (res) => {
    // console.log(res);
    //1.reqConfig    -HTTP请求的配置
    //2.resData      -HTTP请求响应的数据
    //3.resStatus    -HTTP请求的状态
    //4.reqMethod    -HTTP请求的方法
    //5.reqData      -HTTP请求过程中上传的数据(放在请求体中)
    //6.reqParams    -HTTP请求过程中上传的数据(放在url中)
    const { config: reqConfig, data: resData, status: resStatus } = res;
    const { method: reqMethod, data: reqData, params: reqParams } = reqConfig;
    // console.log(`请求方法为${reqMethod}`,`请求数据为${reqData}`,'请求参数为',reqParams);
    // console.log(reqConfig);
    const { code, msg } = resData;
    // console.log(resData)
    if (code === 401) {
      showToastr("登录已过时,请重新登录", () => {
        router.push("/login");
      });
      throw new Error("登录过时");
      // return
    }
    switch (reqMethod) {
      //1.获取数据，不进行统一处理
      case "get":
        if (code === 200) {
          return resData;
        }

      //2.提交数据，对反馈信息进行统一处理
      case "post":
        if (code === 200) {
          showAlert("提交成功");
          return resData;
        } else {
          // XuAlert('提交失败-'+msg,'error');
          return resData;
        }

      //3.删除数据，成功删除返回空字符串，否则返回提示字符串
      case "delete":
        if (code === 200) {
          showAlert("删除成功");
          return resData;
        } else {
          // XuAlert('删除失败-'+msg,'error');
          return resData;
        }

      //4.修改数据,目前没有做任何限制
      case "put":
        if (code === 200) {
          showAlert("修改成功");
          return resData;
        } else {
          // XuAlert('修改失败-'+msg,'error');
          return resData;
        }
      default:
        return res;
    }
  },
  (error) => {
    console.log(error);
    return Promise.reject(error);
  }
);

// let allApi = {};
let Http = {}; //存放所有请求api的方法
const allApi = Object.assign({}, homePageApi, infoPageApi);

for (let key in allApi) {
  let method = allApi[key]["method"];
  let url = allApi[key]["url"];

  switch (method) {
    case "get":
      Http[key] = function(config = {}) {
        return dataPool[method](url, config);
      };
      break;
    case "delete":
      Http[key] = function(config = {}) {
        return dataPool[method](url, config);
      };
      break;
    case "post":
      Http[key] = function(data = [], config = {}) {
        return dataPool[method](url, data, config);
      };
      break;
    case "put":
      Http[key] = function(data = [], config = {}) {
        return dataPool[method](url, data, config);
      };
      break;
    default:
      Http[key] = null;
  }
}

export default Http;
