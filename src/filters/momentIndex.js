import moment from 'moment';

// 获取昨天的开始结束时间
export function getYesterday() {
  let date = [];
  let start = moment().subtract('days', 1).format('YYYY-MM-DD 00:00:00');
  let end = moment().subtract('days', 1).format('YYYY-MM-DD 23:59:59');
  date.push(new Date(start));
  date.push(new Date(end));
  return date;
}
// 获取明天的开始结束时间
export function getTomorrow() {
  let date = [];
  let start = moment().subtract('days', -1).format('YYYY-MM-DD 00:00:00');
  let end = moment().subtract('days', -1).format('YYYY-MM-DD 23:59:59');
  date.push(new Date(start));
  date.push(new Date(end));
  return date;
}
// 获取最近七天的开始结束时间（不包括今天）
export function getLast7Days() {
  let date = [];
  date.push(moment().subtract('days', 7).format('YYYY-MM-DD 00:00:00'));
  date.push(moment().subtract('days', 1).format('YYYY-MM-DD 23:59:59'));
  return date;
}
// 获取近七天的时间（包括今天）
export function get7Days() {
  let date = [];
  date.push(moment().subtract('days', 6).format('YYYY-MM-DD 00:00:00'));
  date.push(moment().subtract('days', 0).format('YYYY-MM-DD 23:59:59'));
  return date;
}
// 获取最近30天的开始结束时间
export function getLast30Days() {
  let date = [];
  date.push(moment().subtract('days', 30).format('YYYY-MM-DD'));
  date.push(moment().subtract('days', 1).format('YYYY-MM-DD'));
  return date;
}
// 获取上一周的开始结束时间
export function getLastWeekDays() {
  let date = [];
  let weekOfday = parseInt(moment().format('d')); // 计算今天是这周第几天  周日为一周中的第一天
  let start = moment().subtract(weekOfday + 7, 'days').format('YYYY-MM-DD'); // 周一日期
  let end = moment().subtract(weekOfday + 1, 'days').format('YYYY-MM-DD'); // 周日日期
  date.push(start);
  date.push(end);
  return date;
}
// 获取上一个月的开始结束时间
export function getLastMonthDays() {
  let date = [];
  let start = moment().subtract('month', 1).format('YYYY-MM-01 00:00:00');
  let end = moment(start).subtract('month', -1).add(-1,'days').format('YYYY-MM-DD 23:59:59');
  date.push(new Date(start));
  date.push(new Date(end));
  return date;
}
// 获取当前周的开始结束时间
export function getCurrWeekDays() {
  let date = [];
  let weekOfday = parseInt(moment().format('d')); // 计算今天是这周第几天 周日为一周中的第一天
  let start = moment().subtract(weekOfday, 'days').format('YYYY-MM-DD 00:00:00'); // 周一日期
  // let end = moment().add(7 - weekOfday - 1, 'days').format('YYYY-MM-DD 23:59:59'); // 周日日期
  let end = moment().subtract('days', 1).format('YYYY-MM-DD 23:59:59');
  // console.log(weekOfday,start,end)
  date.push(new Date(start));
  date.push(new Date(end));
  return date;
//   let now = new Date()
// // 获取当前星期几
//   let oneWeekDay = now.getDay()
// // 获取当前周第一天的时间戳
//   const currWeekFirstDay = new Date(+now - oneWeekDay * 24 * 60 * 60 * 1000)
// // 获取昨天
//   const yesterday = new Date(+now - 24 * 60 * 60 * 1000)
//   return [moment(currWeekFirstDay).format('YYYY-MM-DD 00:00:00'), moment(yesterday).format('YYYY-MM-DD 23:59:59')]
}
// 获取当前月的开始结束时间
export function getCurrMonthDays() {
  let date = [];
  let start = moment().add(0,'month').format('YYYY-MM-01 00:00:00');
  // let end = moment(start).add(1,'month').add(-1,'days').format('YYYY-MM-DD 23:59:59');
  let end = moment().subtract('days', 1).format('YYYY-MM-DD 23:59:59');
  date.push(new Date(start));
  date.push(new Date(end));
  return date;
}

// 获取一年之内的开始结束时间（这个月不包含）
export function getCurrYear() {
//     let now = new Date()
// // 获取当天前360天的时间戳
//   const currFirstYear = new Date(+now  - 365 * 24 * 60 * 60 * 1000)
//
// // 获取昨天
//   const yesterday = new Date(+now - 24 * 60 * 60 * 1000)
//   return [moment(currFirstYear).format('YYYY-MM-DD 00:00:00'), moment(yesterday).format('YYYY-MM-DD 23:59:59')]
  let nowdays = new Date();
  let year = nowdays.getFullYear();
  let month = nowdays.getMonth();
  if(month==0)
  {
    month=12;
    year=year-1;
  }
  if (month < 10) {
    month = "0" + month;
  }
  let firstDayOfPreMonth = year + "-" + month + "-" + "01";//上个月的第一天
  let lastDay = new Date(year, month, 0);
  let lastDayOfPreMonth = year + "-" + month + "-" + lastDay.getDate();//上个月的最后一天
  let firstDayOfPreYear = year - 1 + "-" + month + "-" + "01";//上年该月的第一天
  return [moment(firstDayOfPreYear).format('YYYY-MM-DD 00:00:00'), moment(lastDayOfPreMonth).format('YYYY-MM-DD 23:59:59')]
}
