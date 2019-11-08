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
var step_award_tip = (function (_super) {
    __extends(step_award_tip, _super);
    function step_award_tip(msg, callback, tit) {
        var _this = _super.call(this) || this;
        _this.label_tit = tit;
        _this.label_msg = msg;
        _this.ok = callback;
        return _this;
    }
    step_award_tip.prototype.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    step_award_tip.prototype.childrenCreated = function () {
        var _this = this;
        _super.prototype.childrenCreated.call(this);
        this.Msg_tip.text = this.label_msg;
        this.Title_tip.text = this.label_tit ? this.label_tit : '恭喜您';
        egret.Tween.get(this.AwardTip_group).to({ scaleX: 1, scaleY: 1 }, 200, egret.Ease.circIn).call(function () {
            egret.Tween.removeTweens(_this.AwardTip_group);
        });
        //确认事件
        Tool.touchBtn(this.Btn_get, function () {
            _this.ok();
            _this.close_this();
        });
        //关闭此项 
        Tool.touchBtn(this.Close_AwardTip, function () {
            _this.close_this();
        });
    };
    step_award_tip.prototype.close_this = function () {
        var _this = this;
        egret.Tween.get(this.AwardTip_group).to({ scaleX: 0, scaleY: 0 }, 200, egret.Ease.circIn).call(function () {
            egret.Tween.removeTweens(_this.AwardTip_group);
            SceneManager.instance.MainScene.removeChild(_this.parent);
        });
    };
    return step_award_tip;
}(eui.Component));
__reflect(step_award_tip.prototype, "step_award_tip", ["eui.UIComponent", "egret.DisplayObject"]);
