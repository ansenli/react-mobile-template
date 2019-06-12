import request from '@/utils/request';

export default {
  // 模拟查询列表数据
  // getPolicyList(data){
  //   return request({
  //     url: '/policy/policyList',
  //     method: 'get',
  //     params:data,
  //   });
  // },
  // 获取政策列表
  getPolicyList(data) {
    return request({
      url: '/customer/policy/getPolicyList',
      method: 'get',
      params: data,
    });
  },
  // 查字典
  findDictionaryByParentCode(data) {
    return request({
      url: '/custom/findDictionaryByParentCode',
      method: 'get',
      params: data,
    });
  },
  // 获取政策全部模板
  findPolicyTemplate(data) {
    return request({
      url: '/customer/policy/findPolicyTemplate',
      method: 'get',
      params: data,
    });
  },
  // 通过政策对象获取可用模板
  findPolicyTemplateByTarget(data) {
    return request({
      url: '/customer/policy/findPolicyTemplateByTarget',
      method: 'get',
      params: data,
    });
  },
  // 通过模板编码获取模板字段列表
  getTemplatePropertiesByCode(data) {
    return request({
      url: '/customer/policy/getTemplatePropertiesByCode',
      method: 'get',
      params: data,
    });
  },
  // 暂存政策
  savePolicy(data) {
    console.log("data.....zanc...", data);
    return request({
      url: '/customer/policy/savePolicy',
      method: 'POST',
      data: data,
    });
  },
  // 通过政策id返还政策信息
  getPolicyInfoById(data) {
    return request({
      url: '/customer/policy/getPolicyInfoById',
      method: 'get',
      params: data,
    });
  },
  // 政策提交
  saveBatchPolicy(data) {
    return request({
      url: '/customer/policy/saveBatchPolicy',
      method: 'get',
      params: data,
    });
  },
  // 获取带分页的组织结构
  getOrgsByPage(data) {
    return request({
      url: '/customer/policy/getOrgsByPage',
      method: 'get',
      params: data,
    });
  },
  // 下载导入模板
  policyTplDownLoad(data) {
    return request({
      url: '/customer/policy/policyTplDownLoad',
      method: 'get',
      params: data,
      responseType: 'blob'
    });
  },
  // 导入模板
  importPolicyExcel(data) {
    return request({
      url: '/customer/policy/importPolicyExcel',
      method: 'POST',
      data: data,
      headers: {
        'Content-Type': 'multipart/form-data; charset=utf-8'
      }
    });
  },
  // 审核通过
  approvalOk(data){
    return request({
      url: '/customer/policy/approvalOk',
      method: 'get',
      params: data,
    });
  },
  // 审核驳回
  approvalNo(data){
    return request({
      url: '/customer/policy/approvalNo',
      method: 'get',
      params: data,
    });
  },
}
