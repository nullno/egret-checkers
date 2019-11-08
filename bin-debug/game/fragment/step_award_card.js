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
var step_award_card = (function (_super) {
    __extends(step_award_card, _super);
    function step_award_card(data, callback) {
        var _this = _super.call(this) || this;
        _this.awardCardData = data;
        _this.ok = callback;
        return _this;
    }
    step_award_card.prototype.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    step_award_card.prototype.childrenCreated = function () {
        var _this = this;
        _super.prototype.childrenCreated.call(this);
        this.AwardPropCard.visible = this.AwardPetCard.visible = false;
        this.Title_tip.text = this.awardCardData['tit'];
        this.Msg_tip.text = this.awardCardData['msg'];
        this.Btn_getLabel = this.awardCardData['bname'] ? this.awardCardData['bname'] : '确 定';
        if (this.awardCardData['cardInfo']['type'] == 1) {
            this.currentCard = this.AwardPropCard;
        }
        if (this.awardCardData['cardInfo']['type'] == 2) {
            this.currentCard = this.AwardPetCard;
        }
        this.currentCard.visible = true;
        var cardBg = this.currentCard.$children[0], cardPic = this.currentCard.$children[1], cardName = this.currentCard.$children[2];
        cardBg.fillColor = this.awardCardData['cardInfo']['themeColor'];
        cardPic.source = this.awardCardData['cardInfo']['pic'];
        cardName.text = this.awardCardData['cardInfo']['name'];
        egret.Tween.get(this.AwardCard_group).to({ scaleX: 1, scaleY: 1 }, 200, egret.Ease.circIn).call(function () {
            egret.Tween.removeTweens(_this.AwardCard_group);
        });
        //确认事件
        Tool.touchBtn(this.Btn_get, function () {
            _this.ok(1);
            _this.close_this();
        });
        // 关闭此项
        Tool.touchBtn(this.Close_AwardCard, function () {
            _this.ok(0);
            _this.close_this();
        });
    };
    step_award_card.prototype.close_this = function () {
        var _this = this;
        egret.Tween.get(this.AwardCard_group).to({ scaleX: 0, scaleY: 0 }, 200, egret.Ease.circIn).call(function () {
            egret.Tween.removeTweens(_this.AwardCard_group);
            SceneManager.instance.MainScene.removeChild(_this.parent);
        });
    };
    return step_award_card;
}(eui.Component));
__reflect(step_award_card.prototype, "step_award_card", ["eui.UIComponent", "egret.DisplayObject"]);
