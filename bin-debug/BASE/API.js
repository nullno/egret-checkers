var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/*
数据接口
*/
var API = (function () {
    function API() {
    }
    /* ----------------- 功能接口 -------------------*/
    /**
     * 用户是否已经选择过性别
     */
    API.isSelectSex = function (mobile, icon, name) {
        return new Promise(function (resolve, reject) {
            API.requestUtil.requestPost('/login', {
                mobile: mobile,
                icon: icon,
                name: name,
            }).then(function (res) {
                resolve(res);
            }).catch(function (err) { });
        });
    };
    /**
    * 登录
    */
    API.login = function (pet_id, sex, mobile, icon, name) {
        if (pet_id === void 0) { pet_id = 'C1'; }
        if (sex === void 0) { sex = 1; }
        if (mobile === void 0) { mobile = ''; }
        if (icon === void 0) { icon = ''; }
        if (name === void 0) { name = ''; }
        return new Promise(function (resolve, reject) {
            API.requestUtil.requestPost('/login', {
                pet_id: pet_id,
                sex: sex,
                mobile: mobile,
                icon: icon,
                name: name,
            }).then(function (res) {
                resolve(res);
            }).catch(function (err) { });
        });
    };
    /**
    * 获取道具卡
    */
    API.getPropCards = function () {
        return new Promise(function (resolve, reject) {
            API.requestUtil.requestGet('/infoList').then(function (res) {
                resolve(res);
            }).catch(function (err) { });
        });
    };
    /**
    * 存储体力相关信息
    * countdown_status: 0、定时器停止，1、定时器初次启动，不传、定时器进行中
    */
    API.setPowerInfo = function (power, countdown_status) {
        return new Promise(function (resolve, reject) {
            API.requestUtil.requestPost('/timer', {
                power: power,
                countdown_status: countdown_status
            }).then(function (res) {
                resolve(res);
            }).catch(function (err) { });
        });
    };
    /**
    * 获取体力相关信息
    */
    API.getPowerInfo = function () {
        return new Promise(function (resolve, reject) {
            API.requestUtil.requestGet('/powerInfo').then(function (res) {
                resolve(res);
            }).catch(function (err) { });
        });
    };
    /**
     * 保存经验和坐标
     * mapPosition: '2557/1254/北京/0/-',exp:增加的经验值,expBuffStatus:当前是否有经验值 +10% buff
     */
    API.updateExpInfo = function (mapPosition, exp, expBuffStatus) {
        return new Promise(function (resolve, reject) {
            API.requestUtil.requestPost('/updateInfo', {
                mapPosition: mapPosition,
                exp: exp,
                expBuffStatus: expBuffStatus
            }).then(function (res) {
                resolve(res);
            }).catch(function (err) { });
        });
    };
    /**
    * 更新道具卡数据
    * prop_type: 道具卡类型,prop_num: 当前已拥有指定类型道具卡数量
    */
    API.updatePropCardInfo = function (prop_type, prop_num) {
        return new Promise(function (resolve, reject) {
            API.requestUtil.requestPost('/updateProp', {
                prop_type: prop_type,
                prop_num: prop_num
            }).then(function (res) {
                resolve(res);
            }).catch(function (err) { });
        });
    };
    /**
     * 更新宠物卡数据
     * collect_pets: 当前已拥有宠物卡字符串集合
     */
    API.updatePetCardInfo = function (collect_pets) {
        return new Promise(function (resolve, reject) {
            API.requestUtil.requestPost('/updatePet', {
                collect_pets: collect_pets
            }).then(function (res) {
                resolve(res);
            }).catch(function (err) { });
        });
    };
    API.requestUtil = new RequestUtil(); // 接口请求类
    return API;
}());
__reflect(API.prototype, "API");
