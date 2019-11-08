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
等待
*/
var wait_load = (function (_super) {
    __extends(wait_load, _super);
    function wait_load(msg) {
        var _this = _super.call(this) || this;
        _this.loadTip = msg;
        return _this;
    }
    wait_load.prototype.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    wait_load.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.Load_Label.text = this.loadTip ? this.loadTip : '请稍等...';
        egret.Tween.get(this.Load_Icon, { loop: true }).to({ rotation: 360 }, 800);
    };
    return wait_load;
}(eui.Component));
__reflect(wait_load.prototype, "wait_load", ["eui.UIComponent", "egret.DisplayObject"]);
