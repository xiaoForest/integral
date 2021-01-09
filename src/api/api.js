// 写法一：适合分类导出
import http from '../utils/http'
// 
/**
 *  @parms resquest 请求地址 例如：http://197.82.15.15:8088/request/...
 *  @param '/testIp'代表vue-cil中config，index.js中配置的代理
 */
let resquest = "https://xxxx.xxxx.com/IntegralApi/"

// get请求
// export function getListAPI(params){
//     return http.get(`${resquest}/getIntegralLog.api`,params)
// }
// post请求

//1.获取个人默认信息 请求参数: num 展示标签数量 默认 3
export function getPersonal(params) {
    return http.post(`${resquest}getPersonal/api`, params)
}

//2.展示效果修改状态 请求参数: lid 积分状态id
export function personalEnd(params) {
    return http.post(`${resquest}personalEnd/api`, params)
}

//3.获取积分排行
// 请求参数: QueryType=1-个人 2-团队   QueryMoney=day-当天 month-本月 year-本年(为空或不传返回全部)    page 页码
export function getIntegralLog(params) {
    return http.post(`${resquest}getIntegralLog/api`, params)
}

// 4.获取礼品列表
// 请求参数: page 页码
export function getIntegralGoodsList(params) {
    return http.post(`${resquest}getIntegralGoodsList/api`, params)
}

// 5.兑换记录
// 请求参数: page 页码
export function getPersonalList(params) {
    return http.post(`${resquest}getPersonalList/api`, params)
}

// 6.积分规则
export function rule(params) {
    return http.post(`${resquest}rule/api`, params)
}

// 7.积分规则 (plus)
export function ruleNavigation(params) {
    return http.post(`${resquest}ruleNavigation/api`, params)
}

// 7.签到接口
export function sendSign(params) {
    return http.post(`${resquest}sendSign/api`, params)
}
