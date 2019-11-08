class MapScene extends eui.Component implements eui.UIComponent {

	private Btn_home: eui.Button
	private Btn_area: eui.Button
	private Btn_prop: eui.Button
	private Btn_daytask: eui.Button
	private Btn_gps: eui.Button
	private Location_now: eui.Label

	private DisableTouch_mask: eui.Rect;

	//默认
	private Pets_list: eui.List
	private Pets_Percentage: eui.Label
	private Mian_Maparea: eui.Group
	private Map_container: eui.Group
	private Map_moveArea: eui.Group
	private Map_dataImg: eui.DataGroup
	private Default_collect: eui.Panel

	//拥有道具卡/宠物卡
	private Tab_prop: eui.Group
	private Tab_pet: eui.Group
	private Tab_proplist: eui.Scroller;
	private Tab_petlist: eui.Scroller;
	private Panel_Collect: eui.Panel
	private Have_PropList: eui.List
	private Have_PetList: eui.List
	private Panel_PetProp: eui.Panel
	private Close_Panel_Collect: eui.Group
	private Close_Panel_Collect1: eui.Rect

	//每日任务
	private Panel_DayTask: eui.Panel
	private Task_list: eui.List
	private DaysTask_Inner: eui.Panel
	private Close_Panel_Task: eui.Panel

	//位置
	private Location_point: eui.Panel
	private L_avatar_panel: eui.Panel
	private L_avatar: eui.Image

	//色子/体力
	private DiceTimer_Group: eui.Group
	private Dice_Panel: eui.Panel
	private TL_Label: eui.Label //体力数
	private Timer_Label: eui.Label //倒计时
	// 倒计时定时器
	private powerTimer: any;

	//摇色子结果
	private Random_ResultGroup: eui.Group
	private DiceSteps_Panel: eui.Panel
	private Dice_AniGroup: eui.Group


	//填充数据
	private setMapImgs: any //填充地图图片
	private setPetDataByCountry: any //填充当前国家宠物数据
	private setPropData: any //填充道具数据
	private setPetData: any  //填充奇宠卡数据


	private tabIndex = 1; //切换 1道具卡 2宠物卡 

	private _lastSxy: number = 1;//上一次缩放

	private doDiceStatus: boolean = true //可按状态

	private makePoint: boolean = false //可标点状态

	private pointTest: any = []; //标点记录

	private MapPositionArr: any = [] //使用地图坐标点

	private MapCurrentPosition: any; //当前位置

	private dobuleStep: number = 0; // 双倍步数buff

	public constructor() {
		super();
	}

	protected partAdded(partName: string, instance: any): void {
		super.partAdded(partName, instance);
	}


	protected childrenCreated(): void {
		super.childrenCreated();

		this.height = this.stage.stageHeight;
		this.width = this.stage.stageWidth;

		//回到主页 
		Tool.touchBtn(this.Btn_home, () => {
			SceneManager.toScene(SceneManager.instance.HomeScene, this, true);
		})
		//地图拖动
		this.addMapMove();

		//摇色子
		Tool.touchBtn(this.Dice_Panel.$children[2], () => {
			this.doDice()
		})


		//宠物列表点击
		Tool.itemTap(this.Pets_list, (item, index) => {

			Tool.print(this.setPetDataByCountry[index])
			PopUps.petInfo(this.setPetDataByCountry[index])
		})
		//奇宠卡列表点击
		Tool.itemTap(this.Have_PetList, (item, index) => {
			Tool.print(this.setPetData[index])
			let hasItem = UserInfo.havePets.some(val => val === this.setPetData[index].pid);
			if (hasItem) {
				PopUps.petInfo(this.setPetData[index])
			}
		})

		//坐标归为  测试用
		Tool.touchBtn(this.Btn_gps, () => {
			this.LocalCenter()
			//   unit test

		})

		//打开道具卡
		Tool.touchBtn(this.Btn_prop, () => {
			this.Panel_Collect.visible = true
			this.Default_collect.visible = false
			this.HaveTabView(this.tabIndex)
			egret.Tween.get(this.Panel_PetProp).to({ y: this.height - this.Panel_PetProp.height }, 200).call(() => {
				egret.Tween.removeTweens(this.Panel_PetProp)
			})
		})

		//关闭道具卡
		Tool.touchBtn(this.Close_Panel_Collect, () => {

			this.closePopUps(1)
		})
		Tool.touchBtn(this.Close_Panel_Collect1, () => {

			this.closePopUps(1)
		})

		//切换道具列表
		Tool.pressBtn(this.Tab_prop, () => {
			this.HaveTabView(1)
		})
		Tool.pressBtn(this.Tab_pet, () => {
			this.HaveTabView(2)
		})

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

	}

	public async init() {
		Tool.print('map init')
		//数据填充: 道具卡
		this.updatePropPanel();

		//数据填充: 奇宠卡/收集小宠
		this.updatePetPanel();

		//数据填充
		// this.Task_list.dataProvider = new eui.ArrayCollection(['d', 'dvd', 'd', 'ghg', 'gggg']);

		// 位置头像圆角处理
		let currentPet = PetsData.LIST[UserInfo.country].filter(item => item.pid == UserInfo.havePets[0])[0];
		this.L_avatar.source = currentPet.head || 'defult_avatar_png';
		Tool.RoundRect(this.L_avatar, this.L_avatar_panel, this.L_avatar.width);

		/* 地图相关处理 */
		await this.loadMap(UserInfo.country);

		//色子气泡动画
		egret.Tween.get(this.Dice_Panel.$children[0], { loop: true }).to({ rotation: 360, scaleX: 1, scaleY: 1, alpha: 0.5 }, 2000).to({ rotation: 720, scaleX: 1.5, scaleY: 1.5, alpha: 0 }, 2000);
		egret.Tween.get(this.Dice_Panel.$children[1], { loop: true }).to({ rotation: 360, scaleX: 1, scaleY: 1, alpha: 0.5 }, 1000).to({ rotation: 720, scaleX: 1.5, scaleY: 1.5, alpha: 0 }, 1000);
		//地图碎片填充
		this.setMapImgs = this.fillMap(UserInfo.country);
		this.Map_dataImg.dataProvider = new eui.ArrayCollection(this.setMapImgs);

		//当前地图显示
		this.Location_now.text = '当前地图：' + MapsData.LIST[UserInfo.country]['name'];

		//位置处理
	
		this.MapPositionArr = Tool.handleMapPosition(UserInfo.country)
        if (localStorage.getItem('mapPosition')) {
          UserInfo.mapPosition=localStorage.getItem('mapPosition')
		}
		// 读取缓存位置
		this.MapCurrentPosition = Tool.handleMapPositionStr(UserInfo.mapPosition);
		this.LocalXY(this.MapCurrentPosition.x, this.MapCurrentPosition.y)


		//背景色
		PopUps.gameContainer.style.cssText += 'background:linear-gradient(#F6F6F6, #F6F6F6);'

		//测试
		// this.autoJump();
	}


	//摇色子事件
	private doDice(noPower?: boolean) {
		this.LocalCenter();
		if (!this.doDiceStatus) return;


		this.Random_ResultGroup.visible = true;
		this.Btn_prop.touchEnabled = false
		// this.Random_ResultGroup.visible = this.DisableTouch_mask.visible = true;
		this.Btn_home.visible = this.doDiceStatus = this.Dice_Panel.visible = false


		let DicImg = <eui.Image>this.Dice_AniGroup.$children[0];
		let StepsLable = <eui.Label>this.DiceSteps_Panel.$children[1];
		DicImg.alpha = 0;

		this.addDiceAni().then(() => {
			this.diceArmatureDisplay.addEventListener(egret.Event.COMPLETE, (e: egret.Event) => {
				let n = Math.floor(Math.random() * 6) + 1;
				DicImg.source = 'Dice_' + n;
				egret.Tween.get(this.diceArmatureDisplay).to({ alpha: 0 }, 200).call(() => {
					egret.Tween.removeTweens(this.diceArmatureDisplay)
				});
				egret.Tween.get(DicImg).to({ alpha: 1, rotation: -360, scaleY: 1.3, scaleX: 1.3 }, 1000, egret.Ease.circIn).call(() => {
					egret.Tween.removeTweens(DicImg)
				});
				StepsLable.text = '前进' + (this.dobuleStep === 1 ? n * 2 : n) + '步';
				egret.Tween.get(this.DiceSteps_Panel).to({ scaleX: 1, alpha: 1 }, 500).call(() => {
					setTimeout(() => {
						egret.Tween.get(this.DiceSteps_Panel).to({ scaleX: 0, alpha: 0 }, 300).call(() => {
							egret.Tween.removeTweens(this.DiceSteps_Panel)
							this.diceArmature.animation.stop();
							this.DiceSteps_Panel.scaleX = 0;
							this.Random_ResultGroup.visible = false;
							this.Btn_prop.touchEnabled = true;
							// this.Random_ResultGroup.visible = this.DisableTouch_mask.visible = false;
							this.diceArmatureDisplay.alpha = 1;
							this.jumpLocal(this.dobuleStep === 1 ? n * 2 : n);
							this.dobuleStep = 0;
						})
					}, 1000)
				})
			}, this);

		})
	}

	//添加色子动画
	private diceArmatureDisplay;
	private diceArmature;
	private addDiceAni() {

		return new Promise((resolve, reject) => {
			if (this.diceArmatureDisplay) {
				this.diceArmature.animation.stop();
				this.diceArmature.animation.play('Sprite', 1);
				return;
			}

			Tool.addArmature({ ske: 'dice_ske_json', tex: 'dice_tex_0_json', png: 'dice_tex_0_png', name: 'Sprite' }, (armature, armatureDisplay) => {
				this.diceArmature = armature;
				this.diceArmature.animation.play('Sprite', 1);
				let DicImg = <eui.Image>this.Dice_AniGroup.$children[0];
				this.diceArmatureDisplay = armatureDisplay;
				this.diceArmatureDisplay.x = this.diceArmatureDisplay.width / 4
				this.diceArmatureDisplay.y = this.diceArmatureDisplay.height / 2
				this.Dice_AniGroup.addChild(armatureDisplay);
				resolve()
			})
		})

	}

	//坐标跳动
	private jumpLocal(num) {

		this.Btn_home.visible = this.doDiceStatus = this.Dice_Panel.visible = false;
		this.Btn_prop.touchEnabled = false;
		let Jtimer = setInterval(() => {
			num--;
			this.MapCurrentPosition.index++;
			if (this.MapCurrentPosition.index > this.MapPositionArr.length - 1) {
				this.MapCurrentPosition.index = 0;
			}
			this.LocalXY(this.MapPositionArr[this.MapCurrentPosition.index]['x'], this.MapPositionArr[this.MapCurrentPosition.index]['y']).then(() => {

				UserInfo.mapPosition = Tool.handleMapPositionObj(this.MapPositionArr[this.MapCurrentPosition.index]);
				this.MapCurrentPosition = Tool.handleMapPositionStr(UserInfo.mapPosition);
				let testDefaultMapPosition = Tool.handleMapPositionStr(UserInfo.defaultMapPosition)


				// Tool.print(UserInfo.mapPosition);
				// 判断当前有没有经过起点
				if (this.MapPositionArr[this.MapCurrentPosition.index]['index'] == testDefaultMapPosition['index']) {
					console.log('加成')
					this.handleAward('o');
				}

				if (num <= 0) {
					clearInterval(Jtimer)

					// 走到有道具的格子时，触发相应处理
					this.handleAward(this.MapPositionArr[this.MapCurrentPosition.index]['atype']);
					this.Btn_home.visible = this.doDiceStatus = this.Dice_Panel.visible = true;
					this.Btn_prop.touchEnabled = true;
					localStorage.setItem('mapPosition', UserInfo.mapPosition);
				}
			});

		}, 600)

	}
   
    //处理跳动奖励事件
	private handleAward(type:string){
            switch(type){
				case 'o':
				PopUps.stepAwardTip('走完一圈，要获得大奖',()=>{
					Tool.print('确定喽')
				})
                break;
				case 'a1':
				let randomPropCard = PropsData.LIST[Math.floor(Math.random() * PropsData.LIST.length) + 1];
				PopUps.stepAwardCard({tit:'获得'+randomPropCard['name']+'道具卡牌',msg:'经验+10',cardInfo:randomPropCard},()=>{
                      Tool.print('确定喽')
				})
				break;
				case 'a2':
				 let randomPetCard = PetsData.LIST[UserInfo.country][Math.floor(Math.random() * PetsData.LIST[UserInfo.country].length) + 1];
				PopUps.stepAwardCard({tit:'获得'+randomPetCard['name']+'宠物卡牌',cardInfo:randomPetCard},()=>{
                     Tool.print('确定喽')
				})
				break;
				case 'a3':
				PopUps.stepAwardTip('权益加成X100',()=>{
					Tool.print('确定喽')
				})
				break;
				case 'a4':
				PopUps.stepAwardTip('停下来随机前进1-6步',()=>{
					 this.doDice()
				})
				break;
				case 'a5':
				this.dobuleStep = 1
				PopUps.stepAwardTip('下一次双倍前景',()=>{
					 Tool.print('确定喽')
				})
				break;
				case 'a6':
					 let randomAtype = 'a' +(Math.floor(Math.random() * Object.keys(MapsData.award).length) + 2)
				     this.handleAward(randomAtype)
				break;
				case 'a7':
				PopUps.stepAwardTip('体力+1，简化已省略',()=>{
					Tool.print('确定喽')
				})
				break;
				case 'a8':
				PopUps.stepAwardTip('两倍成长值，简化已省略',()=>{
					 Tool.print('确定喽')
				})
				break;
				default:
				PopUps.tipMsg('成长值+100');
				break;
			}
	}


	//地图拖动 
	private addMapMove() {

		Tool.dargMove(this.Map_container, this.Map_moveArea, false,
			//开始
			(distance) => {
				if (this.makePoint) {
					Tool.print("touch Down,[X/Y:" + distance.x + "/" + distance.y + "]");
					this.pointTest.push(Math.floor(distance.x) + '/' + Math.floor(distance.y) + '/-/-/-')
				}

			},
			//移动
			(ChangeTouchStatus) => {
				this.hidePanel(false)
				if (this.Map_moveArea.x > -5) {
					this.Map_moveArea.x = -5
					ChangeTouchStatus(false)
				}
				if (this.Map_moveArea.y > -5) {
					this.Map_moveArea.y = -5
					ChangeTouchStatus(false)
				}

				if (Math.abs(this.Map_moveArea.x + 5) > this.Map_moveArea.width - this.Map_container.width) {
					this.Map_moveArea.x = -(this.Map_moveArea.width - this.Map_container.width)
					ChangeTouchStatus(false)
				}
				if (Math.abs(this.Map_moveArea.y + 5) > this.Map_moveArea.height - this.Map_container.height) {
					this.Map_moveArea.y = -(this.Map_moveArea.height - this.Map_container.height)
					ChangeTouchStatus(false)
				}
				// Tool.print("moving now ! Mouse: [X:"+ this.Map_moveArea.x+",Y:"+this.Map_moveArea.y+"]");
			},
			//结束
			() => {
				this.hidePanel(true)
				// Tool.print("Mouse Up.");
			},
			(scaleV, op) => {
				if (scaleV > 0) {

					// scaleV = scaleV>1?1:scaleV;
					// scaleV = scaleV<0.5?0.5:scaleV;

					this.mapScale(Math.floor(scaleV * 10) / 10, op)
				}
			}

		);
	}

	//地图填充处理
	private fillMap(country_id) {
		let mapImgArr = [];
		this.Map_moveArea.width = MapsData.LIST[country_id].width * MapsData.scale;
		this.Map_moveArea.height = MapsData.LIST[country_id].heigh * MapsData.scale;
		for (let i = 1; i <= MapsData.pieceNum; i++) {
			mapImgArr.push({ img: 'map_' + country_id + (i < 10 ? '_0' + i + '_jpg' : '_' + i + '_jpg'), width: MapsData.LIST[country_id].one_width * MapsData.scale, height: MapsData.LIST[country_id].one_height * MapsData.scale })
			if (i == 25) {
				return mapImgArr;
			}
		}
	}

	//地图缩放
	private mapScale(scaleXY, op) {
		if (this._lastSxy == scaleXY) return;
		this._lastSxy = scaleXY;

		if (scaleXY > 1) {
			MapsData.scale = 1
		} else {
			MapsData.scale = 0.5
		}


		this.Map_moveArea.x = op.x * MapsData.scale
		this.Map_moveArea.y = op.y * MapsData.scale

		this.setMapImgs = this.fillMap(UserInfo.country);
		this.Map_dataImg.dataProvider = new eui.ArrayCollection(this.setMapImgs);

		this.LocalXY(this.MapPositionArr[this.MapCurrentPosition.index]['x'], this.MapPositionArr[this.MapCurrentPosition.index]['y']);

	}

	//头像坐标位置
	private LocalXY(tx: number, ty: number): Promise<any> {
		return new Promise((resolve, reject) => {
			this.Location_point.x
			egret.Tween.get(this.Location_point).to({ x: tx * MapsData.scale, y: ty * MapsData.scale - 80, scaleY: 0.7 }, 200, egret.Ease.circIn).call(() => {
				this.LocalCenter();
			})
				.to({ x: tx * MapsData.scale, y: ty * MapsData.scale, scaleY: 1 }, 200, egret.Ease.circIn).call(() => {
					this.LocalCenter();
					egret.Tween.removeTweens(this.Location_point)
					resolve();
				});
		});

	}

	//保持头像坐标居中显示
	private LocalCenter() {
		let Lx = -(this.Location_point.x - this.Map_container.width / 2)
		let Ly = -(this.Location_point.y - this.Map_container.height * 0.6)
		egret.Tween.get(this.Map_moveArea).to({ x: Lx, y: Ly }, 500, egret.Ease.circIn).call(() => {
			egret.Tween.removeTweens(this.Map_moveArea)

		})

	}

	//当前国家宠物收集数量状态
	private collectNumByCountry() {
		let haveNum = 0;
		PetsData.LIST[UserInfo.country].forEach(itemA => {
			UserInfo.havePets.forEach(itemB => {
				if (itemB == itemA.pid) {
					haveNum++
				}
			})

		})
		return `${haveNum}/${PetsData.LIST[UserInfo.country].length}`;
	}

	//处理成eui Pets_list可用的默认显示宠物数据
	private handleDefultPet(): any {
		let petsTemp = [], pets = [], indexPrevSort = [], indexNextSort = [];
		let CloneList = JSON.parse(JSON.stringify(PetsData.LIST[UserInfo.country]));
		CloneList.forEach(itemA => {
			itemA.statusColor = '0xfec357';
			itemA.statusText = '未获得';
			itemA.status = true;
			itemA.flag = 'location_' + itemA.country_id;
			UserInfo.havePets.forEach(itemB => {
				if (itemB == itemA.pid) {
					itemA.statusColor = '0xa7a7a7';
					itemA.statusText = '已获得';
					itemA.status = false;
				}
			})
			petsTemp.push(itemA)
		});

		petsTemp.forEach((item, index) => {
			if (item.status) {
				indexPrevSort.push(index);
			} else {
				indexNextSort.push(index);
			}
		})

		indexNextSort.concat(indexPrevSort).forEach(index => {
			pets.push(petsTemp[index])
		})

		return pets;
	}

	//处理成eui Have_PetList可用的奇宠卡数据
	private handlePet(): any {
		let petsTemp = [], pets = [], indexPrevSort = [], indexNextSort = [];

		let ClonePetsData = Tool.deepCopyObj(PetsData.LIST);
		Object.keys(ClonePetsData).forEach((key) => {
			ClonePetsData[key].forEach((itemA: any) => {
				itemA.status = true;
				itemA.statusText = '';
				UserInfo.havePets.forEach(itemB => {
					if (itemB == itemA.pid) {
						itemA.status = false
						itemA.statusText = '已拥有'
					}

				})

				petsTemp.push(itemA)
			})
		});
		petsTemp.forEach((item, index) => {
			if (item.status) {
				indexPrevSort.push(index);
			} else {
				indexNextSort.push(index);
			}
		})

		indexNextSort.concat(indexPrevSort).forEach(index => {
			pets.push(petsTemp[index])
		})
		return pets;


	}

	//处理成eui Have_PropList可用的道具显示数据
	private handleProp(): any {
		let props = [];
		let CloneList = JSON.parse(JSON.stringify(PropsData.LIST));
		CloneList.forEach((itemA: any) => {
			itemA.percentage = '0/' + itemA.limt
			UserInfo.haveProps.forEach(itemB => {
				if (itemB.split('/')[0] == itemA.tid) {
					itemA.percentage = itemB.split('/')[1] + '/' + itemA.limt
				}
			})
			props.push(itemA)
		})
		return props;

	}

	// 更新宠物卡面板显示
	private updatePetPanel() {
		//数据填充：当前国家宠物收集
		this.Pets_Percentage.text = this.collectNumByCountry();

		// 全部国家已拥有的
		this.setPetData = this.handlePet();
		this.Have_PetList.dataProvider = new eui.ArrayCollection(this.setPetData);

		// 当前国家收藏的列表
		this.setPetDataByCountry = this.handleDefultPet();
		this.Pets_list.dataProvider = new eui.ArrayCollection(this.setPetDataByCountry);
	}

	// 更新道具卡面板显示
	private updatePropPanel() {
		this.setPropData = this.handleProp();
		this.Have_PropList.dataProvider = new eui.ArrayCollection(this.setPropData);

		//道具卡相应点击
		setTimeout(() => {
			//使用道具
			Tool.ListChildClick(this.Have_PropList, 7, (Gitem, index) => {
				//Gitem 包含当组下的所有信息 按索引获取
				Tool.print(this.setPropData[index])
			})
			//道具信息查看
			Tool.ListChildClick(this.Have_PropList, 8, (Gitem, index) => {
				//Gitem 包含当组下的所有信息 按索引获取
				Tool.print(this.setPropData[index])
				//this.setPropData(index) //通过当前点击索引
				//this.getPropById(Gitem.$children[0].text) //通过tid
				PopUps.propInfo(this.setPropData[index])
			})

		}, 1000)
	}

	//tid获取道具详情
	private getPropById(tid) {
		let result: Object
		PropsData.LIST.forEach(item => {
			if (tid == item.tid) {
				result = item;
			}
		})
		return result;
	}

	//切换道具展开状态
	private HaveTabView(index) {
		this.tabIndex = index;
		let propLabel = <eui.Label>this.Tab_prop.getChildAt(0);
		let petLabel = <eui.Label>this.Tab_pet.getChildAt(0);
		let propRect = <eui.Rect>this.Tab_prop.getChildAt(1);
		let petRect = <eui.Rect>this.Tab_pet.getChildAt(1);
		propLabel.textColor = index == 1 ? 0x000000 : 0x979797;
		petLabel.textColor = index == 2 ? 0x000000 : 0x979797;
		propRect.fillColor = index == 1 ? 0xEF9428 : 0xFFFFFF;
		petRect.fillColor = index == 2 ? 0xEF9428 : 0xFFFFFF;

		this.Tab_proplist.visible = index == 1 ? true : false;
		this.Tab_petlist.visible = index == 2 ? true : false;

	}

	//拖动时隐藏面板
	private hidePanel(bo) {
		this.Btn_prop.visible = this.Btn_home.visible = this.DiceTimer_Group.visible = this.Btn_gps.visible = bo;
	}

	//跳动时关闭所有弹窗
	private closePopUps(p) {

		// 关闭道具卡
		if (p === 1) {
			egret.Tween.get(this.Panel_PetProp).to({ y: this.height }, 200).call(() => {
				this.Panel_Collect.visible = false
				egret.Tween.removeTweens(this.Panel_PetProp)
			})
		}
		if (p === 2) {
			egret.Tween.get(this.DaysTask_Inner).to({ y: this.height }, 200).call(() => {
				this.Panel_DayTask.visible = false
				egret.Tween.removeTweens(this.DaysTask_Inner)
			})
		}
		this.Default_collect.visible = true
	}

	//地图加载
	private async loadMap(country_id) {
		try {
			PopUps.waitLoad(true, '正在进入地图...');
			await RES.loadGroup('map_' + country_id);
			PopUps.waitLoad(false);
		}
		catch (e) {
			console.error(e);
		}
	}

	//自动飙车模式
	private autoJump() {
		this.doDiceStatus = this.Dice_Panel.visible = false
		this.jumpLocal(this.MapPositionArr.length)
	}

}