function pluralize(time, label) {
  if (time === 1) {
    return time + label;
  }
  return time + label + 's';
}

export function timeAgo(time) {
  const between = Date.now() / 1000 - Number(time);
  if (between < 3600) {
    return pluralize(~~(between / 60), ' minute');
  } else if (between < 86400) {
    return pluralize(~~(between / 3600), ' hour');
  } else {
    return pluralize(~~(between / 86400), ' day');
  }
}

export function formatTimestamp(time) {
  if (time != undefined && time != null) {
    let date = new Date(time);
    return parseTime(date, '{y}-{m}-{d} {h}:{i}:{s}');
  }
}

export function formatDate(time) {
  if (time != undefined && time != null) {
    let date = new Date(time);
    return parseTime(date, '{y}-{m}-{d}');
  }
}

export function orderDate(time) {
  if (time != undefined && time != null) {
    let date = new Date(time);
    return parseTime(date, '{m}-{d} {h}:{i}');
  }
}

export function parseTime(time, cFormat) {
  if (arguments.length === 0) {
    return null;
  }

  if ((time + '').length === 10) {
    time = +time * 1000;
  }

  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}';
  let date;
  if (typeof time === 'object') {
    date = time;
  } else {
    date = new Date(parseInt(time));
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  };
  const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key];
    if (key === 'a') return ['一', '二', '三', '四', '五', '六', '日'][value - 1];
    if (result.length > 0 && value < 10) {
      value = '0' + value;
    }
    return value || 0;
  });
  return time_str;
}

export function formatTime(time, option) {
  time = +time * 1000;
  const d = new Date(time);
  const now = Date.now();

  const diff = (now - d) / 1000;

  if (diff < 30) {
    return '刚刚';
  } else if (diff < 3600) { // less 1 hour
    return Math.ceil(diff / 60) + '分钟前';
  } else if (diff < 3600 * 24) {
    return Math.ceil(diff / 3600) + '小时前';
  } else if (diff < 3600 * 24 * 2) {
    return '1天前';
  }
  if (option) {
    return parseTime(time, option);
  } else {
    return d.getMonth() + 1 + '月' + d.getDate() + '日' + d.getHours() + '时' + d.getMinutes() + '分';
  }
}

/* 数字 格式化*/
export function nFormatter(num, digits) {
  const si = [
    {value: 1E18, symbol: 'E'},
    {value: 1E15, symbol: 'P'},
    {value: 1E12, symbol: 'T'},
    {value: 1E9, symbol: 'G'},
    {value: 1E6, symbol: 'M'},
    {value: 1E3, symbol: 'k'}
  ];
  for (let i = 0; i < si.length; i++) {
    if (num >= si[i].value) {
      return (num / si[i].value + 0.1).toFixed(digits).replace(/\.0+$|(\.[0-9]*[1-9])0+$/, '$1') + si[i].symbol;
    }
  }
  return num.toString();
}

export function html2Text(val) {
  const div = document.createElement('div');
  div.innerHTML = val;
  return div.textContent || div.innerText;
}

export function toThousandslsFilter(num) {
  return (+num || 0).toString().replace(/^-?\d+/g, m => m.replace(/(?=(?!\b)(\d{3})+$)/g, ','));
}


export function getMonth(type, months) {
  var d = new Date();
  var year = d.getFullYear();
  var month = d.getMonth() + 1;
  if (Math.abs(months) > 12) {
    months = months % 12;
  }
  if (months != 0) {
    if (month + months > 12) {
      year++;
      month = (month + months) % 12;
    } else if (month + months < 1) {
      year--;
      month = 12 + month + months;
    } else {
      month = month + months;
    }
  }
  month = month < 10 ? "0" + month: month;
  var firstday = year + "-" + month + "-" + "01";
  var lastday = "";
  if (month == "01" || month == "03" || month == "05" || month == "07" || month == "08" || month == "10" || month == "12") {
    lastday = year + "-" + month + "-" + 31 + " " + "23" + ":" + "59" + ":" + "59";
  } else if (month == "02") {
    if ((year % 4 == 0 && year % 100 != 0) || (year % 100 == 0 && year % 400 == 0)) {
      lastday = year + "-" + month + "-" + 29 + " " + "23" + ":" + "59" + ":" + "59";
    } else {
      lastday = year + "-" + month + "-" + 28 + " " + "23" + ":" + "59" + ":" + "59";
    }
  } else {
    lastday = year + "-" + month + "-" + 30 + " " + "23" + ":" + "59" + ":" + "59";
  }
  var day = "";
  if (type == "s") {
    day = firstday;
  } else {
    day = lastday;
  }
  return day;
}

export function getWeekStartDate() {
  var now = new Date();                    //当前日期
  var nowDayOfWeek = now.getDay();         //今天本周的第几天
  var nowDay = now.getDate();              //当前日
  var nowMonth = now.getMonth();           //当前月
  var nowYear = now.getYear();             //当前年
  nowYear += (nowYear < 2000) ? 1900 : 0;  //
  var weekStartDate = new Date(nowYear, nowMonth, nowDay - nowDayOfWeek);
  return weekStartDate;
}

export function getWeekEndDate() {
  var now = new Date();                    //当前日期
  var nowDayOfWeek = now.getDay();         //今天本周的第几天
  var nowDay = now.getDate();              //当前日
  var nowMonth = now.getMonth();           //当前月
  var nowYear = now.getYear();             //当前年
  nowYear += (nowYear < 2000) ? 1900 : 0;  //
  var weekStartDate = new Date(nowYear, nowMonth, nowDay + (6 - nowDayOfWeek),23,59,59);
  return weekStartDate;
}
