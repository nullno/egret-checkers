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
var prop_info = (function (_super) {
    __extends(prop_info, _super);
    function prop_info(info) {
        var _this = _super.call(this) || this;
        _this.PropData = info;
        return _this;
    }
    prop_info.prototype.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    prop_info.prototype.childrenCreated = function () {
        var _this = this;
        _super.prototype.childrenCreated.call(this);
        if (!this.PropData)
            return;
        var cardBg = this.Prop_cardGroup.$children[0], //道具卡背景
        cardName = this.Prop_cardGroup.$children[2], //道具道具名称
        cardBg2 = this.Prop_cardGroup.$children[3], //道具卡背景
        cardIcon = this.Prop_cardGroup.$children[4]; //icon
        cardBg.fillColor = cardBg2.fillColor = this.PropData['themeColor']; //填充色
        cardIcon.source = this.PropData['pic']; //图片
        this.Prop_name.text = cardName.text = this.PropData['name']; //道具名称
        this.Prop_des.text = this.PropData['des']; //道具描述
        egret.Tween.get(this.PropInfo_group).to({ scaleX: 1, scaleY: 1 }, 200, egret.Ease.circIn).call(function () {
            egret.Tween.removeTweens(_this.PropInfo_group);
        });
        //关闭此项 
        Tool.touchBtn(this.PropInfo_ok, function () {
            _this.close_this();
        });
        Tool.touchBtn(this.Close_propInfo, function () {
            _this.close_this();
        });
    };
    prop_info.prototype.close_this = function () {
        var _this = this;
        egret.Tween.get(this.PropInfo_group).to({ scaleX: 0, scaleY: 0 }, 200, egret.Ease.circIn).call(function () {
            egret.Tween.removeTweens(_this.PropInfo_group);
            SceneManager.instance.MainScene.removeChild(_this.parent);
        });
    };
    return prop_info;
}(eui.Component));
__reflect(prop_info.prototype, "prop_info", ["eui.UIComponent", "egret.DisplayObject"]);
