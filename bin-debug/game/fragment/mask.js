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
var mask = (function (_super) {
    __extends(mask, _super);
    function mask() {
        return _super.call(this) || this;
    }
    mask.prototype.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    mask.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.height = this.stage.stageHeight;
        this.width = this.stage.stageWidth;
    };
    return mask;
}(eui.Component));
__reflect(mask.prototype, "mask", ["eui.UIComponent", "egret.DisplayObject"]);
