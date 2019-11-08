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
var HomeScene = (function (_super) {
    __extends(HomeScene, _super);
    function HomeScene() {
        var _this = _super.call(this) || this;
        _this.centerStatus = false; //个人中心打开状态
        _this.lastLevel = 0;
        return _this;
    }
    HomeScene.prototype.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    HomeScene.prototype.childrenCreated = function () {
        var _this = this;
        _super.prototype.childrenCreated.call(this);
        this.height = this.stage.stageHeight;
        this.width = this.stage.stageWidth;
        PopUps.tipMsg('欢迎进入游戏！');
        // 图片跨域处理
        egret.ImageLoader.crossOrigin = "anonymous";
        this.init();
        //打开关闭个人中心
        Tool.touchBtn(this.UserPanel, function () {
            _this.centerSwitch();
        });
        Tool.pressBtn(this.Main_group, function () {
            if (_this.centerStatus)
                _this.centerSwitch();
        });
        //去地图页
        Tool.touchBtn(this.btn_trip, function () {
            SceneManager.toScene(SceneManager.instance.MapScene, _this, true);
            // console.log(SceneManager.instance.MainScene.$children[0].$children)
        });
        //活动按钮
        Tool.dargMove(this, this.btn_hot_activity);
        Tool.touchBtn(this.btn_hot_activity, function () {
            PopUps.confirmBox('即将立即游戏前往活动专题页\n确认离开？', function () {
                location.reload();
            });
        });
    };
    //初始化
    HomeScene.prototype.init = function () {
        Tool.print('home init');
        //背景色
        PopUps.topName.innerHTML = '白鹭跳棋小游戏';
        // Tool.print(SceneManager.instance.MainScene.$children[0].$children)
        //数据填充：等级 - 加入天数 - 解锁地图 - 地图数量 - 解锁宠物 - 宠物数量 - 消费金额 
        this.LevelText.text = 'Lv.' + UserInfo.level.toString();
        // 头像
        this.Aavatar.source = UserInfo.avatar;
        this.UsernameText.text = UserInfo.nickname;
        // 经验值进度条
        this.Join_days.text = "\u52A0\u5165\u6E38\u620F" + UserInfo.jionDays + "\u5929";
        this.Maps_haveNum.text = UserInfo.havaMaps.length.toString();
        this.Maps_num.text = (Object.keys(MapsData.LIST).length).toString();
        this.Pets_haveNum.text = UserInfo.havePets.length.toString();
        this.Pets_num.text = this.getPetsAllNum();
        this.Consumption_num.text = UserInfo.consumption.toString();
        //头像圆角处理
        Tool.RoundRect(this.Aavatar, this.UserPanel, 30);
        //添加人物
        this.addRole();
        //宠物动态显示
        this.addPet();
        //egret.Tween.get(RoleImage, { loop:true} ).to({ skewY: 1,}, 1000, egret.Ease.circIn).to({ skewY: 0,}, 1000).to({ skewY: -1,}, 1000, egret.Ease.circIn);
        //数据填充：个人中心面板搜集宠物
        var petList = [];
        var clonePets = Tool.deepCopyObj(PetsData.LIST);
        Object.keys(clonePets).forEach(function (key) {
            clonePets[key].forEach(function (itemA) {
                UserInfo.havePets.forEach(function (itemB) {
                    if (itemA.pid == itemB) {
                        petList.push(itemA);
                    }
                });
            });
        });
        this.CollectPets.dataProvider = new eui.ArrayCollection(petList);
        // 升级动画
        this.upgradeEvent();
    };
    //个人中心面板切换
    HomeScene.prototype.centerSwitch = function () {
        var _this = this;
        this.UserPanel.visible = this.centerStatus ? true : false;
        var styleM = this.centerStatus ? { scaleX: 1, scaleY: 1, x: 0, y: 0 } : { scaleX: 1.5, scaleY: 1.5, x: -this.width * 0.5, y: -this.height * 0.1 };
        var styleC = this.centerStatus ? { y: this.height } : { y: this.height - this.Center_panel.height };
        if (!this.Center_panel.visible) {
            this.Center_panel.visible = true;
        }
        egret.Tween.get(this.Main_group).to(styleM, 500, egret.Ease.circIn).call(function () {
            egret.Tween.removeTweens(_this.Main_group);
        });
        egret.Tween.get(this.Center_panel).to(styleC, 200, egret.Ease.circIn).call(function () {
            _this.centerStatus = !_this.centerStatus;
            if (!_this.centerStatus) {
                _this.Center_panel.visible = false;
            }
            egret.Tween.removeTweens(_this.Center_panel);
        });
    };
    //宠物总量
    HomeScene.prototype.getPetsAllNum = function () {
        var _num = 0;
        Object.keys(PetsData.LIST).forEach(function (key) {
            _num += PetsData.LIST[key].length;
        });
        return _num.toString();
    };
    HomeScene.prototype.addPet = function () {
        var _this = this;
        if (this.petDisplay)
            return;
        this.PetArea.visible = true;
        var PetImage = this.PetArea.getChildAt(0);
        PetImage.height = 0;
        egret.Tween.get(PetImage).to({ height: 224, }, 800, egret.Ease.circIn).to({ y: PetImage.y + 100, scaleY: 0.95 }, 200).to({ scaleY: 1 }, 200).call(function () {
            egret.Tween.removeTweens(PetImage);
            Tool.addArmature({ ske: 'panda_ske_json', tex: 'panda_tex_json', png: 'panda_tex_png', name: '' }, function (armature, armatureDisplay) {
                PetImage.visible = false;
                _this.doPetArmature = armature;
                _this.petDisplay = armatureDisplay;
                _this.doPetArmature.animation.play('stand');
                _this.doPetArmature.animation.timeScale = 0.5;
                _this.petDisplay.x = Math.floor(_this.roleDisplay.width / 3.05);
                _this.petDisplay.y = Math.floor(_this.roleDisplay.height / 2.7);
                _this.petDisplay.touchEnabled = true;
                _this.PetArea.addChild(_this.petDisplay);
            });
            //宠物交互
            Tool.pressBtn(_this.petDisplay, function () {
                _this.doPetArmature.animation.play('talk', 1);
                _this.Pet_Talk.alpha = 0;
                _this.Pet_Talk.visible = true;
                egret.Tween.get(_this.Pet_Talk).to({ alpha: 1 }, 300, egret.Ease.circIn).call(function () {
                    egret.Tween.removeTweens(_this.Pet_Talk);
                });
            });
            _this.petDisplay.addEventListener(egret.Event.COMPLETE, function (e) {
                _this.doPetArmature.animation.fadeIn('stand');
                egret.Tween.get(_this.Pet_Talk).to({ alpha: 0 }, 300, egret.Ease.circIn).call(function () {
                    egret.Tween.removeTweens(_this.Pet_Talk);
                    _this.Pet_Talk.visible = false;
                });
            }, _this);
        });
    };
    HomeScene.prototype.addRole = function () {
        var _this = this;
        if (this.roleDisplay)
            return;
        var sexid = UserInfo.sex, Role;
        if (sexid == 1) {
            Role = this.Role_boy;
            this.Role_boy.visible = true;
        }
        else {
            Role = this.Role_girl;
            this.Role_girl.visible = true;
        }
        var RoleImage = Role.getChildAt(0);
        Tool.addArmature({ ske: 'role_' + sexid + '_ske_json', tex: 'role_' + sexid + '_tex_json', png: 'role_' + sexid + '_tex_png', name: 'Armature' }, function (armature, armatureDisplay) {
            _this.doRoleArmature = armature;
            _this.roleDisplay = armatureDisplay;
            _this.doRoleArmature.animation.play('stand');
            _this.doRoleArmature.animation.timeScale = 0.5;
            RoleImage.visible = false;
            if (sexid == 1) {
                _this.roleDisplay.x = Math.floor(_this.roleDisplay.width / 15);
                _this.roleDisplay.y = Math.floor(_this.roleDisplay.height / 3.7);
            }
            else {
                _this.roleDisplay.x = Math.floor(_this.roleDisplay.width / 4);
                _this.roleDisplay.y = Math.floor(_this.roleDisplay.height / 1.93);
            }
            _this.roleDisplay.touchEnabled = true;
            Role.addChild(_this.roleDisplay);
        });
        //点人物打开个人中心
        Tool.pressBtn(this.roleDisplay, function () {
            _this.centerSwitch();
        });
        this.roleDisplay.addEventListener(egret.Event.COMPLETE, function (e) {
            _this.doRoleArmature.animation.fadeIn('stand');
            _this.doRoleArmature.animation.timeScale = 0.5;
            Tool.print('升级完成ROLE');
        }, this);
    };
    //升级事件
    HomeScene.prototype.upgradeEvent = function () {
        this.doRoleArmature.animation.timeScale = 1;
        this.doRoleArmature.animation.play('upgrade', 1);
        if (this.lastLevel > 0) {
            PopUps.tipMsg('恭喜你又升级啦！');
        }
    };
    return HomeScene;
}(eui.Component));
__reflect(HomeScene.prototype, "HomeScene", ["eui.UIComponent", "egret.DisplayObject"]);
