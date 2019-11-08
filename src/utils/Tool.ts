/*
  工具方法
*/

class Tool {
  constructor(public p?: any) {
    console.log(p)
  }
  //打印
  static print(msg) {
    if (Setting.Debug) console.log(msg);
  }

  //添加龙骨动画
  static addArmature(data, op) {
    /**骨骼的实体数据**/
    let armature: dragonBones.Armature;
    /**骨骼的可视对象**/
    let armatureDisplay;
    //读取一个骨骼数据,并创建实例显示到舞台
    var skeletonData = RES.getRes(data['ske']);
    var textureData = RES.getRes(data['tex']);
    var texture = RES.getRes(data['png']);

    var factory: dragonBones.EgretFactory = new dragonBones.EgretFactory();
    var parseDragonBonesData=factory.parseDragonBonesData(skeletonData);
    factory.addDragonBonesData(parseDragonBonesData);
    factory.addTextureAtlasData(factory.parseTextureAtlasData(textureData, texture));
    
    armature = factory.buildArmature(parseDragonBonesData.armatureNames[0]);

    armatureDisplay = armature.display;


    factory.clock.add(armature);

    op(armature, armatureDisplay)

    //启动骨骼动画播放
    //armature.animation.gotoAndPlay('stand');
    egret.Ticker.getInstance().register(function (frameTime: number) { factory.clock.advanceTime(0.0001) }, this);
  }
  private static _time: number;
  private static onTicker(timeStamp: number) {

    if (!this._time) {
      this._time = timeStamp;
    }

    var now = timeStamp;
    var pass = now - this._time;
    this._time = now;
    dragonBones.WorldClock.clock.advanceTime(pass / 1000);
    return false;
  }

  //圆角处理
  static RoundRect(t, g, r: number = 10) {
    var RoundMask: egret.Shape = new egret.Shape();
    RoundMask.graphics.beginFill(0x282828);
    RoundMask.graphics.drawRoundRect(0, 0, t.width, t.height, r, r);
    RoundMask.graphics.endFill();
    RoundMask.y = t.x
    RoundMask.x = t.y
    g.addChild(RoundMask)
    t.mask = RoundMask;
  }
  //静态按钮
  static pressBtn(btn: any, callbackUp?) {
    btn.addEventListener(egret.TouchEvent.TOUCH_END, () => {
      if (callbackUp) callbackUp();
    }, this)
  }
  //弹性按钮
  static touchBtn(btn: any, callbackUp?, callbackDown?) {

    btn.addEventListener(egret.TouchEvent.TOUCH_BEGIN, () => {
      egret.Tween.get(btn).to({ scaleX: 0.8, scaleY: 0.8 }, 80, egret.Ease.cubicIn).call(() => {
        if (callbackDown) callbackDown();
      })
    }, this)
    btn.addEventListener(egret.TouchEvent.TOUCH_END, () => {
      egret.Tween.get(btn).to({ scaleX: 1, scaleY: 1 }, 100, egret.Ease.cubicIn).call(() => {
        egret.Tween.removeTweens(btn)
        if (callbackUp) callbackUp();
      })
    }, this)
    btn.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, () => {
      egret.Tween.get(btn).to({ scaleX: 1, scaleY: 1 }, 100, egret.Ease.cubicIn).call(() => {
        egret.Tween.removeTweens(btn)
        if (callbackUp) callbackUp();
      })
    })

  }
  //动态列表点击
  static itemTap(List: any, callbackUp) {
    List.addEventListener(eui.ItemTapEvent.ITEM_TAP, (e: eui.ItemTapEvent) => {
      let index = (List.selectedIndex != -1) ? List.selectedIndex : null;
      let itemg = <eui.Group>List.$indexToRenderer[index].$children[0];
      egret.Tween.get(itemg).to({ scaleX: 0.9, scaleY: 0.9 }, 80).to({ scaleX: 1, scaleY: 1 }, 50).call(() => {
        if (callbackUp) callbackUp(List.selectedItem, index);
        egret.Tween.removeTweens(itemg)
      })
    }, this);
  }

  //动态列表子元素点击 cIndex:元素索引
  static ListChildClick(List: eui.List, cIndex, callbackUp) {
    let GItems = List.$indexToRenderer;
    GItems.forEach((item, index) => {
      let gitem = <eui.Group>item.$children[0];//Gitem 包含当组下的所有信息 按索引获取
      let echild = <eui.Button>gitem.$children[cIndex];//当前点击项
      Tool.touchBtn(echild, () => {
        callbackUp(gitem, index)
      })

    })
  }

  //元素拖动 g:可拖动区域，e:拖动目标
  static dargMove(g: any, e: any, mt: boolean = false, begin?, move?, end?, scale?) {
    let touchPoints: Object = { names: [] };
    let _touchStatus: boolean = false;              //当前触摸状态，按下时，值为true
    let _distance: egret.Point = new egret.Point(); //鼠标点击时，鼠标全局坐标与 e 的位置差
    let distance: number = 0;
    let touchCon: number = 0;   //多点触控
    let op: Object = { x: e.x, y: e.y };
    //TOUCH_BEGIN
    e.addEventListener(egret.TouchEvent.TOUCH_BEGIN, (evt: egret.TouchEvent) => {

      if (touchPoints[evt.touchPointID] == null && mt == true) {
        touchPoints[evt.touchPointID] = new egret.Point(evt.stageX, evt.stageY);
        touchPoints["names"].push(evt.touchPointID);

      }
      _touchStatus = true;

      touchCon++;
      if (touchCon == 2) {
        distance = getTouchDistance();
      } else {
        _distance.x = evt.stageX - e.x;
        _distance.y = evt.stageY - e.y;
        if (begin) begin(_distance);
      }


      g.addEventListener(egret.TouchEvent.TOUCH_MOVE, pressMove, this);
    }, this);
    // TOUCH_END
    e.addEventListener(egret.TouchEvent.TOUCH_END, (evt: egret.TouchEvent) => {
      _touchStatus = false;
      //  delete  touchPoints[evt.touchPointID];
      touchPoints = { names: [] };
      touchCon = 0;

      if (end) end();
      g.removeEventListener(egret.TouchEvent.TOUCH_MOVE, pressMove, this);
    }, this);
    //TOUCH_MOVE
    function pressMove(evt: egret.TouchEvent) {
      if (_touchStatus) {

        if (touchCon == 2) {
          if (touchPoints['names'].length == 2) {
            touchPoints[evt.touchPointID].x = evt.stageX;
            touchPoints[evt.touchPointID].y = evt.stageY;
            var newdistance = getTouchDistance();
            if (scale) scale(newdistance / distance, op);
          }
        } else {
          e.x = evt.stageX - _distance.x;
          e.y = evt.stageY - _distance.y;
          op['x'] = e.x;
          op['y'] = e.y;
          if (move) move((status) => {
            _touchStatus = status;
            if (_touchStatus = false) {
              touchPoints = { names: [] };
              touchCon = 0;
            }
          });
        }

      }

    }

    function getTouchDistance(): number {
      var dr: number = 0;
      var names = touchPoints["names"];
      dr = egret.Point.distance(touchPoints[names[names.length - 1]], touchPoints[names[names.length - 2]]);
      return dr;
    }

  }

  // 远程图片设置路径
  static createBitmapByName(name: string): egret.Texture {
    let result = new egret.Bitmap();
    let texture: egret.Texture = RES.getRes(name);
    result.texture = texture;
    return result.texture;
  }

  // 对象深拷贝
  static deepCopyObj(obj) {
    var result = Array.isArray(obj) ? [] : {};
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) {
        if (typeof obj[key] === 'object' && obj[key] !== null) {
          result[key] = this.deepCopyObj(obj[key]);
        } else {
          result[key] = obj[key];
        }
      }
    }
    return result;
  }

  //位置字符串处理成对象  
  static handleMapPositionStr(str: string) {
    let pb = str.split('/');
    return { x: pb[0], y: pb[1], province: pb[2], index: pb[3], atype: pb[4] };
  }
  //位置对象处理成字符串  
  static handleMapPositionObj(obj: any) {

    return `${obj['x']}/${obj['y']}/${obj['province']}/${obj['index']}/${obj['atype']}`;
  }

  //地图坐标处理
  static handleMapPosition(country) {
    let mapPositionArr = [];
    let pa = MapsData.LIST[country]['position'].split(',');
    pa.forEach((item) => {
      let pb = item.trim().split('/');
      mapPositionArr.push({ x: pb[0], y: pb[1], province: pb[2], index: pb[3], atype: pb[4] })
    })

    return mapPositionArr;
  }
  /**
 * 获取指定名称的 url 参数
 * @param {String} name - 参数名称
 * @param {String} url - 指定 url，不指定默认为当前页面 url
 * @returns {String} - 参数的值，未找到则返回 null
 */
  static getUrlParam(name: string, url?: string): any {
    const reg = new RegExp('(\\?|&)' + name + '=([^&#]*)')
    const result = reg.exec(url ? url : location.href)
    return result != null ? decodeURIComponent(result[2]) : null
  }
}