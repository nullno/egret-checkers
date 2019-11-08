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
var pet_info = (function (_super) {
    __extends(pet_info, _super);
    function pet_info(info) {
        var _this = _super.call(this) || this;
        _this.PetData = info;
        return _this;
    }
    pet_info.prototype.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    pet_info.prototype.childrenCreated = function () {
        var _this = this;
        _super.prototype.childrenCreated.call(this);
        Tool.print('look pet info');
        this.PetCard_Img.source = this.PetData['card_pic'];
        this.Pet_des.text = '       ' + this.PetData['des'];
        egret.Tween.get(this.PetInfo_group).to({ scaleX: 1, scaleY: 1 }, 200, egret.Ease.circIn).call(function () {
            egret.Tween.removeTweens(_this.PetInfo_group);
        });
        //分享
        Tool.touchBtn(this.Btn_sharePet, function () {
            Tool.print('分享' + _this.PetData['pid']);
            // do AppShare...
            // this.close_this()
        });
        //关闭此项 
        Tool.touchBtn(this.Close_petCard, function () {
            _this.close_this();
        });
    };
    pet_info.prototype.close_this = function () {
        var _this = this;
        egret.Tween.get(this.PetInfo_group).to({ scaleX: 0, scaleY: 0 }, 200, egret.Ease.circIn).call(function () {
            egret.Tween.removeTweens(_this.PetInfo_group);
            SceneManager.instance.MainScene.removeChild(_this.parent);
        });
    };
    return pet_info;
}(eui.Component));
__reflect(pet_info.prototype, "pet_info", ["eui.UIComponent", "egret.DisplayObject"]);
