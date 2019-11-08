// 用户数据
class UserData {
    // 用户手机号
    static mobile: string = '';
    // 用户头像
    static icon: string = '';
    // 用户名字
    static user_name: string = '';
    // 用户id
    static ucode: string = '';
    //性别
    static sex: number = 1;
    // 宠物id
    static pet_id: string = '';
    // 体力值
    static power: number = 3;
    //用户等级
    static level: number = 1;
    // 当前经验值
    static exp: number = 0;
    // 总经验值
    static expTotal: number = 1;
    //MapsData.LIST 1:中国 ，2：澳大利亚 ，3：待定 ，4：待定 
    static country: number = 1;
    //PetsData.LIST 已获得宠物 
    static petList: string[] = ['C1'];
    //已解锁地图
    static havaMaps: number[] = [1];
    //消费金额
    static consumption: number = 0;
    //加入天数
    static jionDays: number = 1;
    // PropsData 已获得道具 卡牌id/数量
    static haveProps: any[] = [];
    // 归属地
    static location: string = '';
    //默认坐标
    static defaultMapPosition: string = '';//
    //当前位置
    static mapPosition: string = '';//
    // 体力值倒计时状态
    static countdownStatus: number = 0;
    // 当天成长值+10%buff状态
    static expBuffStatus: number = 0;
    // 当天获得的成长值
    static todayExp: number = 0;
    // 当天获得成长值限制（最大值为130）
    static todayExpLimit: number = 130;
}