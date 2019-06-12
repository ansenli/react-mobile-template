import request from '../utils/request';

export default {
  // 件量占比
  getChannel(param) {
    return request({
      url: '/order/stats/channel',
      method: 'get',
      params: param
    });
  },
  // 件量趋势
  getTrend(param) {
    return request({
      url: '/order/stats/pastTrend',
      method: 'get',
      params: param
    });
  },
  // 星级
  getStars(param) {
    return request({
      url: '/order/level',
      method: 'get',
      params: param
    });
  },
  getIncreaseOrder(param){
    return request({
      url: '/order/increaseRanking',
      method: 'get',
      params: param
    });
  },

  getReduceOrder(query){
    return request({
      url: '/order/reduceRanking',
      method: 'get',
      params: query
    });
  },
  //获取有K码，无客户编码的订单量
  getOrderCountForNoBasicCode(query){
    return request({
      url: '/order/getOrderCountForNoBasicCode',
      method: 'get',
      params: query
    });
  }
};
