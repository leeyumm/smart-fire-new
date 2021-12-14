

//时间格式化，
//如果没有参数，默认格式化当前时间
//可以接受一个以毫秒记录的时间戳数字
const getFormatterDate = function () {
    let now;
  
    if (arguments[0]){
      now = new Date(arguments[0]);
    }else {
      now = new Date()
    }
  
    let nowYear = now.getFullYear();
    let nowMonth = now.getMonth() + 1;
    let nowDay = now.getDate();
    let nowHour = now.getHours();
    let nowMinute = now.getMinutes();
    let nowSecond = now.getSeconds();
  
  
    nowMonth < 10 ? nowMonth = '0' + nowMonth : nowMonth = '' + nowMonth;
    nowDay >= 10 ? nowDay = '' + nowDay : nowDay = '0' + nowDay;
  
    nowHour >= 10 ? nowHour = '' + nowHour : nowHour = '0' + nowHour;
    nowMinute >= 10 ? nowMinute = '' + nowMinute : nowMinute = '0' + nowMinute;
    nowSecond >= 10 ? nowSecond = '' + nowSecond : nowSecond = '0' + nowSecond;
  
    return {
      YYYYMMDD:nowYear+'-'+nowMonth+'-'+nowDay,
      YYYY:nowYear,
      HHMMSS:nowHour+':'+nowMinute+':'+nowSecond,
      YYYYMMDDHHMMSS:nowYear+'-'+nowMonth+'-'+nowDay+' '+nowHour+':'+nowMinute+':'+nowSecond,
      MMDDHHMMSS:nowMonth+'-'+nowDay+' '+nowHour+':'+nowMinute+':'+nowSecond,
      MMDDHHMM:nowMonth+'-'+nowDay+' '+nowHour+':'+nowMinute,
      YYYYMMDDHHMM:nowYear+'-'+nowMonth+'-'+nowDay+' '+nowHour+':'+nowMinute,
    }
};


//数组求和，不是数组返回undefined
const sum = function (array) {
    if (Array.isArray(array)){
        let sum = array[0];
        for (let i=1;i<array.length;i++){
        sum = sum + array[i]
        }
        return sum;
    } else {
        return undefined
    }
};

export default {
    sum,
    getFormatterDate,
}