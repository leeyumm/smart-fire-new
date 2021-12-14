import axios from 'axios'
import authApi from './auth-api'


// baseURL:'http://www.zhxf.yuhualab.com:8080'
let pagePool = axios.create({
  baseURL:'http://www.zhxf.yuhualab.com:8080',
})
// const isDevelopmentMode = true
// let pagePool = axios.create({
//   baseURL:isDevelopmentMode ? 'http://172.20.29.91:8888' : 'http://www.zhxf.yuhualab.com:8080',
// })

const Http = {}
const allApi = Object.assign({},authApi)

for (let key in allApi){
  let method = allApi[key]['method'];
  let url = allApi[key]['url'];

  switch (method) {
    case 'get':
      Http[key] = function(config={}) {
        return pagePool[method](url,config)
      };
      break;
    case 'delete':
      Http[key] = function(config={}) {
        return pagePool[method](url,config)
      };
      break;
    case 'post':
      Http[key] = function (data=[],config={}) {
        return pagePool[method](url,data,config)
      };
      break;
    case 'put':
      Http[key] = function (data=[],config={}) {
        return pagePool[method](url,data,config)
      };
      break;
    default:
      Http[key] = null;
  }
}

export default Http