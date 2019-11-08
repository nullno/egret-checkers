var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
// 用户数据
var UserData = (function () {
    function UserData() {
    }
    // 用户手机号
    UserData.mobile = '';
    // 用户头像
    UserData.icon = '';
    // 用户名字
    UserData.user_name = '';
    // 用户id
    UserData.ucode = '';
    //性别
    UserData.sex = 1;
    // 宠物id
    UserData.pet_id = '';
    // 体力值
    UserData.power = 3;
    //用户等级
    UserData.level = 1;
    // 当前经验值
    UserData.exp = 0;
    // 总经验值
    UserData.expTotal = 1;
    //MapsData.LIST 1:中国 ，2：澳大利亚 ，3：待定 ，4：待定 
    UserData.country = 1;
    //PetsData.LIST 已获得宠物 
    UserData.petList = ['C1'];
    //已解锁地图
    UserData.havaMaps = [1];
    //消费金额
    UserData.consumption = 0;
    //加入天数
    UserData.jionDays = 1;
    // PropsData 已获得道具 卡牌id/数量
    UserData.haveProps = [];
    // 归属地
    UserData.location = '';
    //默认坐标
    UserData.defaultMapPosition = ''; //
    //当前位置
    UserData.mapPosition = ''; //
    // 体力值倒计时状态
    UserData.countdownStatus = 0;
    // 当天成长值+10%buff状态
    UserData.expBuffStatus = 0;
    // 当天获得的成长值
    UserData.todayExp = 0;
    // 当天获得成长值限制（最大值为130）
    UserData.todayExpLimit = 130;
    return UserData;
}());
__reflect(UserData.prototype, "UserData");
