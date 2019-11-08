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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var MapScene = (function (_super) {
    __extends(MapScene, _super);
    function MapScene() {
        var _this = _super.call(this) || this;
        _this.tabIndex = 1; //切换 1道具卡 2宠物卡 
        _this._lastSxy = 1; //上一次缩放
        _this.doDiceStatus = true; //可按状态
        _this.makePoint = false; //可标点状态
        _this.pointTest = []; //标点记录
        _this.MapPositionArr = []; //使用地图坐标点
        _this.dobuleStep = 0; // 双倍步数buff
        return _this;
    }
    MapScene.prototype.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    MapScene.prototype.childrenCreated = function () {
        var _this = this;
        _super.prototype.childrenCreated.call(this);
        this.height = this.stage.stageHeight;
        this.width = this.stage.stageWidth;
        //回到主页 
        Tool.touchBtn(this.Btn_home, function () {
            SceneManager.toScene(SceneManager.instance.HomeScene, _this, true);
        });
        //地图拖动
        this.addMapMove();
        //摇色子
        Tool.touchBtn(this.Dice_Panel.$children[2], function () {
            _this.doDice();
        });
        //宠物列表点击
        Tool.itemTap(this.Pets_list, function (item, index) {
            Tool.print(_this.setPetDataByCountry[index]);
            PopUps.petInfo(_this.setPetDataByCountry[index]);
        });
        //奇宠卡列表点击
        Tool.itemTap(this.Have_PetList, function (item, index) {
            Tool.print(_this.setPetData[index]);
            var hasItem = UserInfo.havePets.some(function (val) { return val === _this.setPetData[index].pid; });
            if (hasItem) {
                PopUps.petInfo(_this.setPetData[index]);
            }
        });
        //坐标归为  测试用
        Tool.touchBtn(this.Btn_gps, function () {
            _this.LocalCenter();
            //   unit test
        });
        //打开道具卡
        Tool.touchBtn(this.Btn_prop, function () {
            _this.Panel_Collect.visible = true;
            _this.Default_collect.visible = false;
            _this.HaveTabView(_this.tabIndex);
            egret.Tween.get(_this.Panel_PetProp).to({ y: _this.height - _this.Panel_PetProp.height }, 200).call(function () {
                egret.Tween.removeTweens(_this.Panel_PetProp);
            });
        });
        //关闭道具卡
        Tool.touchBtn(this.Close_Panel_Collect, function () {
            _this.closePopUps(1);
        });
        Tool.touchBtn(this.Close_Panel_Collect1, function () {
            _this.closePopUps(1);
        });
        //切换道具列表
        Tool.pressBtn(this.Tab_prop, function () {
            _this.HaveTabView(1);
        });
        Tool.pressBtn(this.Tab_pet, function () {
            _this.HaveTabView(2);
        });
        //每日任务
        // Tool.touchBtn(this.Btn_daytask, () => {
        // 	this.makePoint = !this.makePoint;
        // 	Tool.print(this.pointTest.join(','));
        // 	this.Panel_DayTask.visible = true
        // 	this.Default_collect.visible = false
        // 	egret.Tween.get(this.DaysTask_Inner).to({ y: this.height - this.DaysTask_Inner.height }, 400).call(() => {
        // 		egret.Tween.removeTweens(this.DaysTask_Inner)
        // 	})
        // })
        // //关闭每日任务
        // Tool.touchBtn(this.Close_Panel_Task, () => {
        // 	this.Default_collect.visible = true
        // 	this.closePopUps(2)
        // })
    };
    MapScene.prototype.init = function () {
        return __awaiter(this, void 0, void 0, function () {
            var currentPet;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        Tool.print('map init');
                        //数据填充: 道具卡
                        this.updatePropPanel();
                        //数据填充: 奇宠卡/收集小宠
                        this.updatePetPanel();
                        currentPet = PetsData.LIST[UserInfo.country].filter(function (item) { return item.pid == UserInfo.havePets[0]; })[0];
                        this.L_avatar.source = currentPet.head || 'defult_avatar_png';
                        Tool.RoundRect(this.L_avatar, this.L_avatar_panel, this.L_avatar.width);
                        /* 地图相关处理 */
                        return [4 /*yield*/, this.loadMap(UserInfo.country)];
                    case 1:
                        /* 地图相关处理 */
                        _a.sent();
                        //色子气泡动画
                        egret.Tween.get(this.Dice_Panel.$children[0], { loop: true }).to({ rotation: 360, scaleX: 1, scaleY: 1, alpha: 0.5 }, 2000).to({ rotation: 720, scaleX: 1.5, scaleY: 1.5, alpha: 0 }, 2000);
                        egret.Tween.get(this.Dice_Panel.$children[1], { loop: true }).to({ rotation: 360, scaleX: 1, scaleY: 1, alpha: 0.5 }, 1000).to({ rotation: 720, scaleX: 1.5, scaleY: 1.5, alpha: 0 }, 1000);
                        //地图碎片填充
                        this.setMapImgs = this.fillMap(UserInfo.country);
                        this.Map_dataImg.dataProvider = new eui.ArrayCollection(this.setMapImgs);
                        //当前地图显示
                        this.Location_now.text = '当前地图：' + MapsData.LIST[UserInfo.country]['name'];
                        //位置处理
                        this.MapPositionArr = Tool.handleMapPosition(UserInfo.country);
                        if (localStorage.getItem('mapPosition')) {
                            UserInfo.mapPosition = localStorage.getItem('mapPosition');
                        }
                        // 读取缓存位置
                        this.MapCurrentPosition = Tool.handleMapPositionStr(UserInfo.mapPosition);
                        this.LocalXY(this.MapCurrentPosition.x, this.MapCurrentPosition.y);
                        //背景色
                        PopUps.gameContainer.style.cssText += 'background:linear-gradient(#F6F6F6, #F6F6F6);';
                        return [2 /*return*/];
                }
            });
        });
    };
    //摇色子事件
    MapScene.prototype.doDice = function (noPower) {
        var _this = this;
        this.LocalCenter();
        if (!this.doDiceStatus)
            return;
        this.Random_ResultGroup.visible = true;
        this.Btn_prop.touchEnabled = false;
        // this.Random_ResultGroup.visible = this.DisableTouch_mask.visible = true;
        this.Btn_home.visible = this.doDiceStatus = this.Dice_Panel.visible = false;
        var DicImg = this.Dice_AniGroup.$children[0];
        var StepsLable = this.DiceSteps_Panel.$children[1];
        DicImg.alpha = 0;
        this.addDiceAni().then(function () {
            _this.diceArmatureDisplay.addEventListener(egret.Event.COMPLETE, function (e) {
                var n = Math.floor(Math.random() * 6) + 1;
                DicImg.source = 'Dice_' + n;
                egret.Tween.get(_this.diceArmatureDisplay).to({ alpha: 0 }, 200).call(function () {
                    egret.Tween.removeTweens(_this.diceArmatureDisplay);
                });
                egret.Tween.get(DicImg).to({ alpha: 1, rotation: -360, scaleY: 1.3, scaleX: 1.3 }, 1000, egret.Ease.circIn).call(function () {
                    egret.Tween.removeTweens(DicImg);
                });
                StepsLable.text = '前进' + (_this.dobuleStep === 1 ? n * 2 : n) + '步';
                egret.Tween.get(_this.DiceSteps_Panel).to({ scaleX: 1, alpha: 1 }, 500).call(function () {
                    setTimeout(function () {
                        egret.Tween.get(_this.DiceSteps_Panel).to({ scaleX: 0, alpha: 0 }, 300).call(function () {
                            egret.Tween.removeTweens(_this.DiceSteps_Panel);
                            _this.diceArmature.animation.stop();
                            _this.DiceSteps_Panel.scaleX = 0;
                            _this.Random_ResultGroup.visible = false;
                            _this.Btn_prop.touchEnabled = true;
                            // this.Random_ResultGroup.visible = this.DisableTouch_mask.visible = false;
                            _this.diceArmatureDisplay.alpha = 1;
                            _this.jumpLocal(_this.dobuleStep === 1 ? n * 2 : n);
                            _this.dobuleStep = 0;
                        });
                    }, 1000);
                });
            }, _this);
        });
    };
    MapScene.prototype.addDiceAni = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (_this.diceArmatureDisplay) {
                _this.diceArmature.animation.stop();
                _this.diceArmature.animation.play('Sprite', 1);
                return;
            }
            Tool.addArmature({ ske: 'dice_ske_json', tex: 'dice_tex_0_json', png: 'dice_tex_0_png', name: 'Sprite' }, function (armature, armatureDisplay) {
                _this.diceArmature = armature;
                _this.diceArmature.animation.play('Sprite', 1);
                var DicImg = _this.Dice_AniGroup.$children[0];
                _this.diceArmatureDisplay = armatureDisplay;
                _this.diceArmatureDisplay.x = _this.diceArmatureDisplay.width / 4;
                _this.diceArmatureDisplay.y = _this.diceArmatureDisplay.height / 2;
                _this.Dice_AniGroup.addChild(armatureDisplay);
                resolve();
            });
        });
    };
    //坐标跳动
    MapScene.prototype.jumpLocal = function (num) {
        var _this = this;
        this.Btn_home.visible = this.doDiceStatus = this.Dice_Panel.visible = false;
        this.Btn_prop.touchEnabled = false;
        var Jtimer = setInterval(function () {
            num--;
            _this.MapCurrentPosition.index++;
            if (_this.MapCurrentPosition.index > _this.MapPositionArr.length - 1) {
                _this.MapCurrentPosition.index = 0;
            }
            _this.LocalXY(_this.MapPositionArr[_this.MapCurrentPosition.index]['x'], _this.MapPositionArr[_this.MapCurrentPosition.index]['y']).then(function () {
                UserInfo.mapPosition = Tool.handleMapPositionObj(_this.MapPositionArr[_this.MapCurrentPosition.index]);
                _this.MapCurrentPosition = Tool.handleMapPositionStr(UserInfo.mapPosition);
                var testDefaultMapPosition = Tool.handleMapPositionStr(UserInfo.defaultMapPosition);
                // Tool.print(UserInfo.mapPosition);
                // 判断当前有没有经过起点
                if (_this.MapPositionArr[_this.MapCurrentPosition.index]['index'] == testDefaultMapPosition['index']) {
                    console.log('加成');
                    _this.handleAward('o');
                }
                if (num <= 0) {
                    clearInterval(Jtimer);
                    // 走到有道具的格子时，触发相应处理
                    _this.handleAward(_this.MapPositionArr[_this.MapCurrentPosition.index]['atype']);
                    _this.Btn_home.visible = _this.doDiceStatus = _this.Dice_Panel.visible = true;
                    _this.Btn_prop.touchEnabled = true;
                    localStorage.setItem('mapPosition', UserInfo.mapPosition);
                }
            });
        }, 600);
    };
    //处理跳动奖励事件
    MapScene.prototype.handleAward = function (type) {
        var _this = this;
        switch (type) {
            case 'o':
                PopUps.stepAwardTip('走完一圈，要获得大奖', function () {
                    Tool.print('确定喽');
                });
                break;
            case 'a1':
                var randomPropCard = PropsData.LIST[Math.floor(Math.random() * PropsData.LIST.length) + 1];
                PopUps.stepAwardCard({ tit: '获得' + randomPropCard['name'] + '道具卡牌', msg: '经验+10', cardInfo: randomPropCard }, function () {
                    Tool.print('确定喽');
                });
                break;
            case 'a2':
                var randomPetCard = PetsData.LIST[UserInfo.country][Math.floor(Math.random() * PetsData.LIST[UserInfo.country].length) + 1];
                PopUps.stepAwardCard({ tit: '获得' + randomPetCard['name'] + '宠物卡牌', cardInfo: randomPetCard }, function () {
                    Tool.print('确定喽');
                });
                break;
            case 'a3':
                PopUps.stepAwardTip('权益加成X100', function () {
                    Tool.print('确定喽');
                });
                break;
            case 'a4':
                PopUps.stepAwardTip('停下来随机前进1-6步', function () {
                    _this.doDice();
                });
                break;
            case 'a5':
                this.dobuleStep = 1;
                PopUps.stepAwardTip('下一次双倍前景', function () {
                    Tool.print('确定喽');
                });
                break;
            case 'a6':
                var randomAtype = 'a' + (Math.floor(Math.random() * Object.keys(MapsData.award).length) + 2);
                this.handleAward(randomAtype);
                break;
            case 'a7':
                PopUps.stepAwardTip('体力+1，简化已省略', function () {
                    Tool.print('确定喽');
                });
                break;
            case 'a8':
                PopUps.stepAwardTip('两倍成长值，简化已省略', function () {
                    Tool.print('确定喽');
                });
                break;
            default:
                PopUps.tipMsg('成长值+100');
                break;
        }
    };
    //地图拖动 
    MapScene.prototype.addMapMove = function () {
        var _this = this;
        Tool.dargMove(this.Map_container, this.Map_moveArea, false, 
        //开始
        function (distance) {
            if (_this.makePoint) {
                Tool.print("touch Down,[X/Y:" + distance.x + "/" + distance.y + "]");
                _this.pointTest.push(Math.floor(distance.x) + '/' + Math.floor(distance.y) + '/-/-/-');
            }
        }, 
        //移动
        function (ChangeTouchStatus) {
            _this.hidePanel(false);
            if (_this.Map_moveArea.x > -5) {
                _this.Map_moveArea.x = -5;
                ChangeTouchStatus(false);
            }
            if (_this.Map_moveArea.y > -5) {
                _this.Map_moveArea.y = -5;
                ChangeTouchStatus(false);
            }
            if (Math.abs(_this.Map_moveArea.x + 5) > _this.Map_moveArea.width - _this.Map_container.width) {
                _this.Map_moveArea.x = -(_this.Map_moveArea.width - _this.Map_container.width);
                ChangeTouchStatus(false);
            }
            if (Math.abs(_this.Map_moveArea.y + 5) > _this.Map_moveArea.height - _this.Map_container.height) {
                _this.Map_moveArea.y = -(_this.Map_moveArea.height - _this.Map_container.height);
                ChangeTouchStatus(false);
            }
            // Tool.print("moving now ! Mouse: [X:"+ this.Map_moveArea.x+",Y:"+this.Map_moveArea.y+"]");
        }, 
        //结束
        function () {
            _this.hidePanel(true);
            // Tool.print("Mouse Up.");
        }, function (scaleV, op) {
            if (scaleV > 0) {
                // scaleV = scaleV>1?1:scaleV;
                // scaleV = scaleV<0.5?0.5:scaleV;
                _this.mapScale(Math.floor(scaleV * 10) / 10, op);
            }
        });
    };
    //地图填充处理
    MapScene.prototype.fillMap = function (country_id) {
        var mapImgArr = [];
        this.Map_moveArea.width = MapsData.LIST[country_id].width * MapsData.scale;
        this.Map_moveArea.height = MapsData.LIST[country_id].heigh * MapsData.scale;
        for (var i = 1; i <= MapsData.pieceNum; i++) {
            mapImgArr.push({ img: 'map_' + country_id + (i < 10 ? '_0' + i + '_jpg' : '_' + i + '_jpg'), width: MapsData.LIST[country_id].one_width * MapsData.scale, height: MapsData.LIST[country_id].one_height * MapsData.scale });
            if (i == 25) {
                return mapImgArr;
            }
        }
    };
    //地图缩放
    MapScene.prototype.mapScale = function (scaleXY, op) {
        if (this._lastSxy == scaleXY)
            return;
        this._lastSxy = scaleXY;
        if (scaleXY > 1) {
            MapsData.scale = 1;
        }
        else {
            MapsData.scale = 0.5;
        }
        this.Map_moveArea.x = op.x * MapsData.scale;
        this.Map_moveArea.y = op.y * MapsData.scale;
        this.setMapImgs = this.fillMap(UserInfo.country);
        this.Map_dataImg.dataProvider = new eui.ArrayCollection(this.setMapImgs);
        this.LocalXY(this.MapPositionArr[this.MapCurrentPosition.index]['x'], this.MapPositionArr[this.MapCurrentPosition.index]['y']);
    };
    //头像坐标位置
    MapScene.prototype.LocalXY = function (tx, ty) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.Location_point.x;
            egret.Tween.get(_this.Location_point).to({ x: tx * MapsData.scale, y: ty * MapsData.scale - 80, scaleY: 0.7 }, 200, egret.Ease.circIn).call(function () {
                _this.LocalCenter();
            })
                .to({ x: tx * MapsData.scale, y: ty * MapsData.scale, scaleY: 1 }, 200, egret.Ease.circIn).call(function () {
                _this.LocalCenter();
                egret.Tween.removeTweens(_this.Location_point);
                resolve();
            });
        });
    };
    //保持头像坐标居中显示
    MapScene.prototype.LocalCenter = function () {
        var _this = this;
        var Lx = -(this.Location_point.x - this.Map_container.width / 2);
        var Ly = -(this.Location_point.y - this.Map_container.height * 0.6);
        egret.Tween.get(this.Map_moveArea).to({ x: Lx, y: Ly }, 500, egret.Ease.circIn).call(function () {
            egret.Tween.removeTweens(_this.Map_moveArea);
        });
    };
    //当前国家宠物收集数量状态
    MapScene.prototype.collectNumByCountry = function () {
        var haveNum = 0;
        PetsData.LIST[UserInfo.country].forEach(function (itemA) {
            UserInfo.havePets.forEach(function (itemB) {
                if (itemB == itemA.pid) {
                    haveNum++;
                }
            });
        });
        return haveNum + "/" + PetsData.LIST[UserInfo.country].length;
    };
    //处理成eui Pets_list可用的默认显示宠物数据
    MapScene.prototype.handleDefultPet = function () {
        var petsTemp = [], pets = [], indexPrevSort = [], indexNextSort = [];
        var CloneList = JSON.parse(JSON.stringify(PetsData.LIST[UserInfo.country]));
        CloneList.forEach(function (itemA) {
            itemA.statusColor = '0xfec357';
            itemA.statusText = '未获得';
            itemA.status = true;
            itemA.flag = 'location_' + itemA.country_id;
            UserInfo.havePets.forEach(function (itemB) {
                if (itemB == itemA.pid) {
                    itemA.statusColor = '0xa7a7a7';
                    itemA.statusText = '已获得';
                    itemA.status = false;
                }
            });
            petsTemp.push(itemA);
        });
        petsTemp.forEach(function (item, index) {
            if (item.status) {
                indexPrevSort.push(index);
            }
            else {
                indexNextSort.push(index);
            }
        });
        indexNextSort.concat(indexPrevSort).forEach(function (index) {
            pets.push(petsTemp[index]);
        });
        return pets;
    };
    //处理成eui Have_PetList可用的奇宠卡数据
    MapScene.prototype.handlePet = function () {
        var petsTemp = [], pets = [], indexPrevSort = [], indexNextSort = [];
        var ClonePetsData = Tool.deepCopyObj(PetsData.LIST);
        Object.keys(ClonePetsData).forEach(function (key) {
            ClonePetsData[key].forEach(function (itemA) {
                itemA.status = true;
                itemA.statusText = '';
                UserInfo.havePets.forEach(function (itemB) {
                    if (itemB == itemA.pid) {
                        itemA.status = false;
                        itemA.statusText = '已拥有';
                    }
                });
                petsTemp.push(itemA);
            });
        });
        petsTemp.forEach(function (item, index) {
            if (item.status) {
                indexPrevSort.push(index);
            }
            else {
                indexNextSort.push(index);
            }
        });
        indexNextSort.concat(indexPrevSort).forEach(function (index) {
            pets.push(petsTemp[index]);
        });
        return pets;
    };
    //处理成eui Have_PropList可用的道具显示数据
    MapScene.prototype.handleProp = function () {
        var props = [];
        var CloneList = JSON.parse(JSON.stringify(PropsData.LIST));
        CloneList.forEach(function (itemA) {
            itemA.percentage = '0/' + itemA.limt;
            UserInfo.haveProps.forEach(function (itemB) {
                if (itemB.split('/')[0] == itemA.tid) {
                    itemA.percentage = itemB.split('/')[1] + '/' + itemA.limt;
                }
            });
            props.push(itemA);
        });
        return props;
    };
    // 更新宠物卡面板显示
    MapScene.prototype.updatePetPanel = function () {
        //数据填充：当前国家宠物收集
        this.Pets_Percentage.text = this.collectNumByCountry();
        // 全部国家已拥有的
        this.setPetData = this.handlePet();
        this.Have_PetList.dataProvider = new eui.ArrayCollection(this.setPetData);
        // 当前国家收藏的列表
        this.setPetDataByCountry = this.handleDefultPet();
        this.Pets_list.dataProvider = new eui.ArrayCollection(this.setPetDataByCountry);
    };
    // 更新道具卡面板显示
    MapScene.prototype.updatePropPanel = function () {
        var _this = this;
        this.setPropData = this.handleProp();
        this.Have_PropList.dataProvider = new eui.ArrayCollection(this.setPropData);
        //道具卡相应点击
        setTimeout(function () {
            //使用道具
            Tool.ListChildClick(_this.Have_PropList, 7, function (Gitem, index) {
                //Gitem 包含当组下的所有信息 按索引获取
                Tool.print(_this.setPropData[index]);
            });
            //道具信息查看
            Tool.ListChildClick(_this.Have_PropList, 8, function (Gitem, index) {
                //Gitem 包含当组下的所有信息 按索引获取
                Tool.print(_this.setPropData[index]);
                //this.setPropData(index) //通过当前点击索引
                //this.getPropById(Gitem.$children[0].text) //通过tid
                PopUps.propInfo(_this.setPropData[index]);
            });
        }, 1000);
    };
    //tid获取道具详情
    MapScene.prototype.getPropById = function (tid) {
        var result;
        PropsData.LIST.forEach(function (item) {
            if (tid == item.tid) {
                result = item;
            }
        });
        return result;
    };
    //切换道具展开状态
    MapScene.prototype.HaveTabView = function (index) {
        this.tabIndex = index;
        var propLabel = this.Tab_prop.getChildAt(0);
        var petLabel = this.Tab_pet.getChildAt(0);
        var propRect = this.Tab_prop.getChildAt(1);
        var petRect = this.Tab_pet.getChildAt(1);
        propLabel.textColor = index == 1 ? 0x000000 : 0x979797;
        petLabel.textColor = index == 2 ? 0x000000 : 0x979797;
        propRect.fillColor = index == 1 ? 0xEF9428 : 0xFFFFFF;
        petRect.fillColor = index == 2 ? 0xEF9428 : 0xFFFFFF;
        this.Tab_proplist.visible = index == 1 ? true : false;
        this.Tab_petlist.visible = index == 2 ? true : false;
    };
    //拖动时隐藏面板
    MapScene.prototype.hidePanel = function (bo) {
        this.Btn_prop.visible = this.Btn_home.visible = this.DiceTimer_Group.visible = this.Btn_gps.visible = bo;
    };
    //跳动时关闭所有弹窗
    MapScene.prototype.closePopUps = function (p) {
        var _this = this;
        // 关闭道具卡
        if (p === 1) {
            egret.Tween.get(this.Panel_PetProp).to({ y: this.height }, 200).call(function () {
                _this.Panel_Collect.visible = false;
                egret.Tween.removeTweens(_this.Panel_PetProp);
            });
        }
        if (p === 2) {
            egret.Tween.get(this.DaysTask_Inner).to({ y: this.height }, 200).call(function () {
                _this.Panel_DayTask.visible = false;
                egret.Tween.removeTweens(_this.DaysTask_Inner);
            });
        }
        this.Default_collect.visible = true;
    };
    //地图加载
    MapScene.prototype.loadMap = function (country_id) {
        return __awaiter(this, void 0, void 0, function () {
            var e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        PopUps.waitLoad(true, '正在进入地图...');
                        return [4 /*yield*/, RES.loadGroup('map_' + country_id)];
                    case 1:
                        _a.sent();
                        PopUps.waitLoad(false);
                        return [3 /*break*/, 3];
                    case 2:
                        e_1 = _a.sent();
                        console.error(e_1);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    //自动飙车模式
    MapScene.prototype.autoJump = function () {
        this.doDiceStatus = this.Dice_Panel.visible = false;
        this.jumpLocal(this.MapPositionArr.length);
    };
    return MapScene;
}(eui.Component));
__reflect(MapScene.prototype, "MapScene", ["eui.UIComponent", "egret.DisplayObject"]);
