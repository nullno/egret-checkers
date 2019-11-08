var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
// 弹窗
var PopUps = (function () {
    function PopUps() {
    }
    PopUps.addMaskCenter = function (a, b) {
        SceneManager.instance.MainScene.addChild(a);
        b.x = a.width / 2 - b.width / 2;
        b.y = a.height / 2 - b.height / 2;
    };
    //消息提示
    PopUps.tipMsg = function (msg) {
        var Tip_msg = new tip_msg(msg);
        SceneManager.instance.MainScene.addChild(Tip_msg);
        Tip_msg.x = SceneManager.instance.MainScene.width / 2 - Tip_msg.width / 2;
        Tip_msg.y = SceneManager.instance.MainScene.height / 6;
    };
    //信息确认框
    PopUps.confirmBox = function (msg, ok, cancel) {
        var Mask = new mask();
        var Confirm_box = new confirm_box(msg, ok, cancel ? cancel : null);
        Mask.addChild(Confirm_box);
        this.addMaskCenter(Mask, Confirm_box);
    };
    //等待加载
    PopUps.waitLoad = function (status, msg) {
        if (status) {
            this.WaitMask = new mask();
            var Wait_load = new wait_load(msg);
            this.WaitMask.addChild(Wait_load);
            this.addMaskCenter(this.WaitMask, Wait_load);
        }
        else {
            SceneManager.instance.MainScene.removeChild(this.WaitMask);
        }
    };
    //选择前进步数
    PopUps.selectStep = function (getStep) {
        var Mask = new mask();
        var Select_step = new select_step(getStep);
        Mask.addChild(Select_step);
        this.addMaskCenter(Mask, Select_step);
    };
    //道具卡片信息
    PopUps.propInfo = function (data) {
        var Mask = new mask();
        var Prop_info = new prop_info(data);
        Mask.addChild(Prop_info);
        this.addMaskCenter(Mask, Prop_info);
    };
    //宠物卡片信息
    PopUps.petInfo = function (data) {
        var Mask = new mask();
        var Pet_info = new pet_info(data);
        Mask.addChild(Pet_info);
        this.addMaskCenter(Mask, Pet_info);
    };
    //前进奖励获奖事件
    PopUps.stepAwardTip = function (msg, callback, tit) {
        var Mask = new mask();
        var Step_award_tip = new step_award_tip(msg, callback, tit ? tit : '');
        Mask.addChild(Step_award_tip);
        this.addMaskCenter(Mask, Step_award_tip);
    };
    //前进奖励获得卡片
    PopUps.stepAwardCard = function (data, callback) {
        var Mask = new mask();
        var Step_award_card = new step_award_card(data, callback);
        Mask.addChild(Step_award_card);
        this.addMaskCenter(Mask, Step_award_card);
    };
    PopUps.gameContainer = document.querySelector('.game-container');
    PopUps.topName = document.querySelector('.top-name');
    return PopUps;
}());
__reflect(PopUps.prototype, "PopUps");
