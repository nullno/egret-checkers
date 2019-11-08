/*
游戏设置
 */
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Setting = (function () {
    function Setting() {
    }
    // static Language = Language.zh_CN;//语言设置
    Setting.Debug = location.search.indexOf('dev') !== -1 ? true : false; //调试模式
    Setting.env = location.search.indexOf('dev') !== -1 ? 'dev' : 'pro'; // 环境配置（开发环境时，url后加上?dev=1）
    return Setting;
}());
__reflect(Setting.prototype, "Setting");
