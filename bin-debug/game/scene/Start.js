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
 开始人物选择页
*/
var StartScene = (function (_super) {
    __extends(StartScene, _super);
    function StartScene() {
        var _this = _super.call(this) || this;
        _this.sexId = 1; //1:男 2:女
        return _this;
    }
    StartScene.prototype.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    StartScene.prototype.childrenCreated = function () {
        var _this = this;
        _super.prototype.childrenCreated.call(this);
        this.height = this.stage.stageHeight;
        this.width = this.stage.stageWidth;
        this.init();
        //引导二：选择性别
        Tool.touchBtn(this.selectboy, function () { _this.setSex(1); });
        Tool.touchBtn(this.selectgirl, function () { _this.setSex(2); });
        //选择性别确认
        Tool.touchBtn(this.btn_sexok, function () {
            Tool.print('性别：' + _this.sexId);
            _this.startGmage();
        });
        //语言选择 
    };
    //初始化数据
    StartScene.prototype.init = function () {
        Tool.print('start init');
        PopUps.topName.innerHTML = '白鹭跳棋小游戏';
        var _thiscanva = document.querySelector('.egret-player').children[0];
        if (_thiscanva.offsetTop < 20) {
            PopUps.topName.style.display = 'none';
        }
        else {
            PopUps.topName.style.cssText += 'height:' + _thiscanva.offsetTop + 'px;line-height:' + _thiscanva.offsetTop + 'px';
        }
        //默认性别选择
        this.setSex(1);
    };
    //登录成功后
    StartScene.prototype.startGmage = function () {
        PopUps.waitLoad(true, '进入小屋...');
        SceneManager.toScene(SceneManager.instance.HomeScene, this);
        PopUps.waitLoad(false);
    };
    //登录
    // private async getUserInfo() {
    // 	PopUps.waitLoad(true, '登录中...');
    // 	this.startGmage()
    // }
    //选择性别
    StartScene.prototype.setSex = function (sex) {
        UserInfo.sex = this.sexId = sex;
        var boybtnbg = this.selectboy.getChildAt(1);
        var girlbtnbg = this.selectgirl.getChildAt(1);
        boybtnbg.strokeAlpha = sex == 1 ? 1 : 0;
        girlbtnbg.strokeAlpha = sex == 2 ? 1 : 0;
    };
    return StartScene;
}(eui.Component));
__reflect(StartScene.prototype, "StartScene", ["eui.UIComponent", "egret.DisplayObject"]);
/*demo:  操作dom元素
                const downbtn  = <HTMLElement> document.querySelector('#app-download-btn');
                    
                            downbtn.style.display='none';
                const gamebody =  <HTMLElement>document.body;
                             let newdom = 	<HTMLElement>document.createElement('div');
                                newdom.style.cssText+='width:1rem;height:1rem;background:red;position:fixed;z-index:99;top:0;';
                              gamebody.appendChild(newdom)
*/
/* 语言选择
        Tool.touchBtn(this.zh_c, () => {
            if (localStorage.getItem('Language') == 'zh_CN') {
                return;
            } else {
                PopUps.confirmBox('语言已重新设置\n是否重启？', () => {
                    localStorage.setItem('Language', 'zh_CN');
                    location.reload();
                })
            }

        })

        Tool.touchBtn(this.zh_h, () => {
            if (localStorage.getItem('Language') == 'zh_HK') {
                return;
            } else {
                PopUps.confirmBox('语言已重新设置\n是否重启？', () => {
                    localStorage.setItem('Language', 'zh_HK');
                    location.reload();
                })
            }
        })
*/ 
