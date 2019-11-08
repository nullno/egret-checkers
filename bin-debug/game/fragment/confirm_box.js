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
消息确认框
*/
var confirm_box = (function (_super) {
    __extends(confirm_box, _super);
    function confirm_box(msginfo, OK, CANCEL) {
        var _this = _super.call(this) || this;
        _this.msginfo = msginfo;
        _this.OK = OK;
        _this.CANCEL = CANCEL;
        return _this;
    }
    confirm_box.prototype.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    confirm_box.prototype.childrenCreated = function () {
        var _this = this;
        _super.prototype.childrenCreated.call(this);
        this.msg.text = this.msginfo;
        Tool.touchBtn(this.btn_ok, function () {
            _this.OK();
        });
        Tool.touchBtn(this.btn_cancel, function () {
            if (_this.CANCEL)
                _this.CANCEL();
            SceneManager.instance.MainScene.removeChild(_this.parent);
        });
    };
    return confirm_box;
}(eui.Component));
__reflect(confirm_box.prototype, "confirm_box", ["eui.UIComponent", "egret.DisplayObject"]);
