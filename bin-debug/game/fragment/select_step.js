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
/*
 选择步数
*/
var select_step = (function (_super) {
    __extends(select_step, _super);
    function select_step(getStepNum) {
        var _this = _super.call(this) || this;
        _this.selectNum = 1;
        _this.getStep = getStepNum;
        return _this;
    }
    select_step.prototype.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    select_step.prototype.childrenCreated = function () {
        var _this = this;
        _super.prototype.childrenCreated.call(this);
        egret.Tween.get(this.SelectStep_group).to({ scaleX: 1, scaleY: 1 }, 200, egret.Ease.circIn).call(function () {
            egret.Tween.removeTweens(_this.SelectStep_group);
        });
        //点击色子
        var Dice = this.DiceStep_group.$children;
        Dice.forEach(function (item, index) {
            Tool.touchBtn(item, function () {
                _this.selectNum = Number(index + 1);
                egret.Tween.get(_this.Select_Rect).to({ x: item.x, y: item.y }, 100, egret.Ease.circIn).call(function () {
                    egret.Tween.removeTweens(_this.Select_Rect);
                });
            });
        });
        //确认选择
        Tool.touchBtn(this.DiceStep_go, function () {
            _this.close_this();
            _this.getStep(_this.selectNum);
        });
        //关闭此项 
        Tool.touchBtn(this.Close_selectStep, function () {
            _this.close_this();
        });
    };
    select_step.prototype.close_this = function () {
        var _this = this;
        egret.Tween.get(this.SelectStep_group).to({ scaleX: 0, scaleY: 0 }, 200, egret.Ease.circIn).call(function () {
            egret.Tween.removeTweens(_this.SelectStep_group);
            SceneManager.instance.MainScene.removeChild(_this.parent);
        });
    };
    return select_step;
}(eui.Component));
__reflect(select_step.prototype, "select_step", ["eui.UIComponent", "egret.DisplayObject"]);
