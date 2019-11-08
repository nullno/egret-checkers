/*
数据接口
*/
class API {
    static requestUtil: RequestUtil = new RequestUtil();  // 接口请求类
    constructor() { }
    /* ----------------- 功能接口 -------------------*/

    /**
     * 用户是否已经选择过性别
     */
    static isSelectSex(mobile: string, icon: string, name: string): Promise<any> {
        return new Promise((resolve, reject) => {
            API.requestUtil.requestPost('/login', {
                mobile,
                icon,
                name,
            }).then(res => {
                resolve(res)
            }).catch(err => { })
        })
    }
    /**
    * 登录
    */
    static login(pet_id: string = 'C1', sex: number = 1, mobile: string = '', icon: string = '', name: string = ''): Promise<any> {
        return new Promise((resolve, reject) => {
            API.requestUtil.requestPost('/login', {
                pet_id,
                sex,
                mobile,
                icon,
                name,
            }).then(res => {
                resolve(res)
            }).catch(err => { })
        })
    }
    /**
    * 获取道具卡
    */
    static getPropCards(): Promise<any> {
        return new Promise((resolve, reject) => {
            API.requestUtil.requestGet('/infoList').then(res => {
                resolve(res)
            }).catch(err => { })
        })
    }
    /**
    * 存储体力相关信息
    * countdown_status: 0、定时器停止，1、定时器初次启动，不传、定时器进行中
    */
    static setPowerInfo(power: number, countdown_status?: number): Promise<any> {
        return new Promise((resolve, reject) => {
            API.requestUtil.requestPost('/timer', {
                power,
                countdown_status
            }).then(res => {
                resolve(res)
            }).catch(err => { })
        })
    }
    /**
    * 获取体力相关信息
    */
    static getPowerInfo(): Promise<any> {
        return new Promise((resolve, reject) => {
            API.requestUtil.requestGet('/powerInfo').then(res => {
                resolve(res)
            }).catch(err => { })
        })
    }
    /**
     * 保存经验和坐标
     * mapPosition: '2557/1254/北京/0/-',exp:增加的经验值,expBuffStatus:当前是否有经验值 +10% buff
     */
    static updateExpInfo(mapPosition: string, exp: number, expBuffStatus: number): Promise<any> {
        return new Promise((resolve, reject) => {
            API.requestUtil.requestPost('/updateInfo', {
                mapPosition,
                exp,
                expBuffStatus
            }).then(res => {
                resolve(res)
            }).catch(err => { })
        })
    }
    /**
    * 更新道具卡数据
    * prop_type: 道具卡类型,prop_num: 当前已拥有指定类型道具卡数量
    */
    static updatePropCardInfo(prop_type: number, prop_num: number): Promise<any> {
        return new Promise((resolve, reject) => {
            API.requestUtil.requestPost('/updateProp', {
                prop_type,
                prop_num
            }).then(res => {
                resolve(res)
            }).catch(err => { })
        })
    }
    /**
     * 更新宠物卡数据
     * collect_pets: 当前已拥有宠物卡字符串集合
     */
    static updatePetCardInfo(collect_pets: string): Promise<any> {
        return new Promise((resolve, reject) => {
            API.requestUtil.requestPost('/updatePet', {
                collect_pets
            }).then(res => {
                resolve(res)
            }).catch(err => { })
        })
    }
}