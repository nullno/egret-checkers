/*
  工具方法
*/
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Tool = (function () {
    function Tool(p) {
        this.p = p;
        console.log(p);
    }
    //打印
    Tool.print = function (msg) {
        if (Setting.Debug)
            console.log(msg);
    };
    //添加龙骨动画
    Tool.addArmature = function (data, op) {
        /**骨骼的实体数据**/
        var armature;
        /**骨骼的可视对象**/
        var armatureDisplay;
        //读取一个骨骼数据,并创建实例显示到舞台
        var skeletonData = RES.getRes(data['ske']);
        var textureData = RES.getRes(data['tex']);
        var texture = RES.getRes(data['png']);
        var factory = new dragonBones.EgretFactory();
        var parseDragonBonesData = factory.parseDragonBonesData(skeletonData);
        factory.addDragonBonesData(parseDragonBonesData);
        factory.addTextureAtlasData(factory.parseTextureAtlasData(textureData, texture));
        armature = factory.buildArmature(parseDragonBonesData.armatureNames[0]);
        armatureDisplay = armature.display;
        factory.clock.add(armature);
        op(armature, armatureDisplay);
        //启动骨骼动画播放
        //armature.animation.gotoAndPlay('stand');
        egret.Ticker.getInstance().register(function (frameTime) { factory.clock.advanceTime(0.0001); }, this);
    };
    Tool.onTicker = function (timeStamp) {
        if (!this._time) {
            this._time = timeStamp;
        }
        var now = timeStamp;
        var pass = now - this._time;
        this._time = now;
        dragonBones.WorldClock.clock.advanceTime(pass / 1000);
        return false;
    };
    //圆角处理
    Tool.RoundRect = function (t, g, r) {
        if (r === void 0) { r = 10; }
        var RoundMask = new egret.Shape();
        RoundMask.graphics.beginFill(0x282828);
        RoundMask.graphics.drawRoundRect(0, 0, t.width, t.height, r, r);
        RoundMask.graphics.endFill();
        RoundMask.y = t.x;
        RoundMask.x = t.y;
        g.addChild(RoundMask);
        t.mask = RoundMask;
    };
    //静态按钮
    Tool.pressBtn = function (btn, callbackUp) {
        btn.addEventListener(egret.TouchEvent.TOUCH_END, function () {
            if (callbackUp)
                callbackUp();
        }, this);
    };
    //弹性按钮
    Tool.touchBtn = function (btn, callbackUp, callbackDown) {
        btn.addEventListener(egret.TouchEvent.TOUCH_BEGIN, function () {
            egret.Tween.get(btn).to({ scaleX: 0.8, scaleY: 0.8 }, 80, egret.Ease.cubicIn).call(function () {
                if (callbackDown)
                    callbackDown();
            });
        }, this);
        btn.addEventListener(egret.TouchEvent.TOUCH_END, function () {
            egret.Tween.get(btn).to({ scaleX: 1, scaleY: 1 }, 100, egret.Ease.cubicIn).call(function () {
                egret.Tween.removeTweens(btn);
                if (callbackUp)
                    callbackUp();
            });
        }, this);
        btn.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, function () {
            egret.Tween.get(btn).to({ scaleX: 1, scaleY: 1 }, 100, egret.Ease.cubicIn).call(function () {
                egret.Tween.removeTweens(btn);
                if (callbackUp)
                    callbackUp();
            });
        });
    };
    //动态列表点击
    Tool.itemTap = function (List, callbackUp) {
        List.addEventListener(eui.ItemTapEvent.ITEM_TAP, function (e) {
            var index = (List.selectedIndex != -1) ? List.selectedIndex : null;
            var itemg = List.$indexToRenderer[index].$children[0];
            egret.Tween.get(itemg).to({ scaleX: 0.9, scaleY: 0.9 }, 80).to({ scaleX: 1, scaleY: 1 }, 50).call(function () {
                if (callbackUp)
                    callbackUp(List.selectedItem, index);
                egret.Tween.removeTweens(itemg);
            });
        }, this);
    };
    //动态列表子元素点击 cIndex:元素索引
    Tool.ListChildClick = function (List, cIndex, callbackUp) {
        var GItems = List.$indexToRenderer;
        GItems.forEach(function (item, index) {
            var gitem = item.$children[0]; //Gitem 包含当组下的所有信息 按索引获取
            var echild = gitem.$children[cIndex]; //当前点击项
            Tool.touchBtn(echild, function () {
                callbackUp(gitem, index);
            });
        });
    };
    //元素拖动 g:可拖动区域，e:拖动目标
    Tool.dargMove = function (g, e, mt, begin, move, end, scale) {
        var _this = this;
        if (mt === void 0) { mt = false; }
        var touchPoints = { names: [] };
        var _touchStatus = false; //当前触摸状态，按下时，值为true
        var _distance = new egret.Point(); //鼠标点击时，鼠标全局坐标与 e 的位置差
        var distance = 0;
        var touchCon = 0; //多点触控
        var op = { x: e.x, y: e.y };
        //TOUCH_BEGIN
        e.addEventListener(egret.TouchEvent.TOUCH_BEGIN, function (evt) {
            if (touchPoints[evt.touchPointID] == null && mt == true) {
                touchPoints[evt.touchPointID] = new egret.Point(evt.stageX, evt.stageY);
                touchPoints["names"].push(evt.touchPointID);
            }
            _touchStatus = true;
            touchCon++;
            if (touchCon == 2) {
                distance = getTouchDistance();
            }
            else {
                _distance.x = evt.stageX - e.x;
                _distance.y = evt.stageY - e.y;
                if (begin)
                    begin(_distance);
            }
            g.addEventListener(egret.TouchEvent.TOUCH_MOVE, pressMove, _this);
        }, this);
        // TOUCH_END
        e.addEventListener(egret.TouchEvent.TOUCH_END, function (evt) {
            _touchStatus = false;
            //  delete  touchPoints[evt.touchPointID];
            touchPoints = { names: [] };
            touchCon = 0;
            if (end)
                end();
            g.removeEventListener(egret.TouchEvent.TOUCH_MOVE, pressMove, _this);
        }, this);
        //TOUCH_MOVE
        function pressMove(evt) {
            if (_touchStatus) {
                if (touchCon == 2) {
                    if (touchPoints['names'].length == 2) {
                        touchPoints[evt.touchPointID].x = evt.stageX;
                        touchPoints[evt.touchPointID].y = evt.stageY;
                        var newdistance = getTouchDistance();
                        if (scale)
                            scale(newdistance / distance, op);
                    }
                }
                else {
                    e.x = evt.stageX - _distance.x;
                    e.y = evt.stageY - _distance.y;
                    op['x'] = e.x;
                    op['y'] = e.y;
                    if (move)
                        move(function (status) {
                            _touchStatus = status;
                            if (_touchStatus = false) {
                                touchPoints = { names: [] };
                                touchCon = 0;
                            }
                        });
                }
            }
        }
        function getTouchDistance() {
            var dr = 0;
            var names = touchPoints["names"];
            dr = egret.Point.distance(touchPoints[names[names.length - 1]], touchPoints[names[names.length - 2]]);
            return dr;
        }
    };
    // 远程图片设置路径
    Tool.createBitmapByName = function (name) {
        var result = new egret.Bitmap();
        var texture = RES.getRes(name);
        result.texture = texture;
        return result.texture;
    };
    // 对象深拷贝
    Tool.deepCopyObj = function (obj) {
        var result = Array.isArray(obj) ? [] : {};
        for (var key in obj) {
            if (obj.hasOwnProperty(key)) {
                if (typeof obj[key] === 'object' && obj[key] !== null) {
                    result[key] = this.deepCopyObj(obj[key]);
                }
                else {
                    result[key] = obj[key];
                }
            }
        }
        return result;
    };
    //位置字符串处理成对象  
    Tool.handleMapPositionStr = function (str) {
        var pb = str.split('/');
        return { x: pb[0], y: pb[1], province: pb[2], index: pb[3], atype: pb[4] };
    };
    //位置对象处理成字符串  
    Tool.handleMapPositionObj = function (obj) {
        return obj['x'] + "/" + obj['y'] + "/" + obj['province'] + "/" + obj['index'] + "/" + obj['atype'];
    };
    //地图坐标处理
    Tool.handleMapPosition = function (country) {
        var mapPositionArr = [];
        var pa = MapsData.LIST[country]['position'].split(',');
        pa.forEach(function (item) {
            var pb = item.trim().split('/');
            mapPositionArr.push({ x: pb[0], y: pb[1], province: pb[2], index: pb[3], atype: pb[4] });
        });
        return mapPositionArr;
    };
    /**
   * 获取指定名称的 url 参数
   * @param {String} name - 参数名称
   * @param {String} url - 指定 url，不指定默认为当前页面 url
   * @returns {String} - 参数的值，未找到则返回 null
   */
    Tool.getUrlParam = function (name, url) {
        var reg = new RegExp('(\\?|&)' + name + '=([^&#]*)');
        var result = reg.exec(url ? url : location.href);
        return result != null ? decodeURIComponent(result[2]) : null;
    };
    return Tool;
}());
__reflect(Tool.prototype, "Tool");
