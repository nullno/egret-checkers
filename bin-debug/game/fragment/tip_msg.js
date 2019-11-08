/*
消息提示
*/
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var tip_msg = (function (_super) {
    __extends(tip_msg, _super);
    function tip_msg(msg) {
        var _this = _super.call(this) || this;
        _this.MsgStr = msg;
        return _this;
    }
    tip_msg.prototype.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    tip_msg.prototype.childrenCreated = function () {
        var _this = this;
        _super.prototype.childrenCreated.call(this);
        this.Tip_Label.text = this.MsgStr;
        this.M_group.scaleX = 0;
        egret.Tween.get(this.M_group).to({ scaleX: 1 }, 300, egret.Ease.circIn).call(function () {
            egret.Tween.removeTweens(_this.M_group);
        });
        //3后关闭
        var timer = setTimeout(function () {
            _this.close_this();
        }, 2000);
        //点击关闭
        Tool.touchBtn(this.Close_tip, function () {
            clearTimeout(timer);
            _this.close_this();
        });
    };
    tip_msg.prototype.close_this = function () {
        var _this = this;
        egret.Tween.get(this.M_group).to({ scaleX: 0 }, 200, egret.Ease.circIn).call(function () {
            egret.Tween.removeTweens(_this.M_group);
            SceneManager.instance.MainScene.removeChild(_this);
        });
    };
    return tip_msg;
}(eui.Component));
__reflect(tip_msg.prototype, "tip_msg", ["eui.UIComponent", "egret.DisplayObject"]);
