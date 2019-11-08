class HomeScene extends eui.Component implements eui.UIComponent {


	private Main_group: eui.Group;
	private Center_panel: eui.Panel;

	private UserPanel: eui.Panel;
	private UsernameText:eui.Label;
	private LevelText: eui.Label;
	private Aavatar: eui.Image;
	private LevelBar: eui.Group;
	private PetArea: eui.Group;
	private Role_boy: eui.Group;
	private Role_girl: eui.Group;
	private CollectPets: eui.List;
	private CZ_Group:eui.Group;
	private CZText:eui.Label;
	private Pet_Talk:eui.Group;

	private btn_hot_activity: eui.Group;//活动链接
	private btn_trip: eui.Group;//去地图页

	private Join_days: eui.Label //加入天数
	private Maps_haveNum: eui.Label //拥有地图数量
	private Maps_num: eui.Label //地图总数量

	private Pets_haveNum: eui.Label//拥有宠物数量
	private Pets_num: eui.Label//宠物总数量（包含所有地图）

	private Consumption_num: eui.Label //消费金额

	private centerStatus = false; //个人中心打开状态

	private lastLevel: number = 0;

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
		
		PopUps.tipMsg('欢迎进入游戏！');

		// 图片跨域处理
		egret.ImageLoader.crossOrigin = "anonymous";
		this.init()

		//打开关闭个人中心
		Tool.touchBtn(this.UserPanel, () => {
			this.centerSwitch();
		});
		Tool.pressBtn(this.Main_group, () => {
			if (this.centerStatus) this.centerSwitch();
		});

		//去地图页
		Tool.touchBtn(this.btn_trip, () => {
			SceneManager.toScene(SceneManager.instance.MapScene, this, true);
			// console.log(SceneManager.instance.MainScene.$children[0].$children)
		});
		//活动按钮
		Tool.dargMove(this, this.btn_hot_activity)
		Tool.touchBtn(this.btn_hot_activity, () => {

			PopUps.confirmBox('即将立即游戏前往活动专题页\n确认离开？', () => {

				location.reload();
			})
		})
		


	}
	//初始化
	public init() {
		Tool.print('home init')
		 //背景色
		 PopUps.topName.innerHTML='白鹭跳棋小游戏';
		// Tool.print(SceneManager.instance.MainScene.$children[0].$children)
	

		//数据填充：等级 - 加入天数 - 解锁地图 - 地图数量 - 解锁宠物 - 宠物数量 - 消费金额 
		this.LevelText.text ='Lv.'+UserInfo.level.toString();

		// 头像
		this.Aavatar.source = UserInfo.avatar;
		this.UsernameText.text = UserInfo.nickname;
		// 经验值进度条
	
		this.Join_days.text = `加入游戏${UserInfo.jionDays}天`;
		this.Maps_haveNum.text = UserInfo.havaMaps.length.toString();
		this.Maps_num.text = (Object.keys(MapsData.LIST).length).toString();
		this.Pets_haveNum.text = UserInfo.havePets.length.toString();
		this.Pets_num.text = this.getPetsAllNum();
		this.Consumption_num.text = UserInfo.consumption.toString()
	


		//头像圆角处理
		Tool.RoundRect(this.Aavatar, this.UserPanel, 30);

		//添加人物
		this.addRole() 
		//宠物动态显示
		this.addPet()
	
		//egret.Tween.get(RoleImage, { loop:true} ).to({ skewY: 1,}, 1000, egret.Ease.circIn).to({ skewY: 0,}, 1000).to({ skewY: -1,}, 1000, egret.Ease.circIn);

		//数据填充：个人中心面板搜集宠物
		let petList: any[] = [];
		let clonePets =  Tool.deepCopyObj(PetsData.LIST);
		Object.keys(clonePets).forEach((key) => {
			clonePets[key].forEach(itemA=>{
			UserInfo.havePets.forEach((itemB) => {
				if (itemA.pid == itemB) {
					petList.push(itemA);
				}
			})
	  	})	
		})
		this.CollectPets.dataProvider = new eui.ArrayCollection(petList);

		// 升级动画
		this.upgradeEvent();
	}
	//个人中心面板切换
	private centerSwitch() {
		this.UserPanel.visible = this.centerStatus ?true:false;
		let styleM = this.centerStatus ? { scaleX: 1, scaleY: 1, x: 0, y: 0 } : { scaleX: 1.5, scaleY: 1.5, x: -this.width * 0.5, y: -this.height * 0.1 };
		let styleC = this.centerStatus ? { y: this.height } : { y: this.height - this.Center_panel.height };
		if (!this.Center_panel.visible) {
			this.Center_panel.visible = true;
		}
		egret.Tween.get(this.Main_group).to(styleM, 500, egret.Ease.circIn).call(() => {
			egret.Tween.removeTweens(this.Main_group);
		});
		egret.Tween.get(this.Center_panel).to(styleC, 200, egret.Ease.circIn).call(() => {

			this.centerStatus = !this.centerStatus;
			if (!this.centerStatus) {
				this.Center_panel.visible = false;
			}
			egret.Tween.removeTweens(this.Center_panel);
		});

	}
	//宠物总量
	private getPetsAllNum() {
		let _num = 0;
		Object.keys(PetsData.LIST).forEach((key) => {
			_num += PetsData.LIST[key].length;
		});
		return _num.toString()
	}
	//添加宠物骨骼动画
	private doPetArmature;
	private petDisplay;
	private addPet(){
     	if(this.petDisplay)return;

		this.PetArea.visible = true;
		let PetImage = <eui.Image>this.PetArea.getChildAt(0);
		PetImage.height = 0;
		egret.Tween.get(PetImage).to({ height: 224, }, 800, egret.Ease.circIn).to({ y: PetImage.y + 100, scaleY: 0.95 }, 200).to({ scaleY: 1 }, 200).call(() => {
			egret.Tween.removeTweens(PetImage);
		
			Tool.addArmature({ ske: 'panda_ske_json', tex: 'panda_tex_json', png: 'panda_tex_png', name: '' }, (armature, armatureDisplay) => {
			PetImage.visible = false	
			this.doPetArmature = armature;	
			this.petDisplay = armatureDisplay;
			this.doPetArmature.animation.play('stand');
			this.doPetArmature.animation.timeScale=0.5
			
			this.petDisplay.x = Math.floor(this.roleDisplay.width / 3.05)
			this.petDisplay.y = Math.floor(this.roleDisplay.height /2.7)
		    this.petDisplay.touchEnabled = true
			
			this.PetArea.addChild(this.petDisplay);
			
		 });
		
		  //宠物交互
		   Tool.pressBtn(this.petDisplay,()=>{
		   
			 this.doPetArmature.animation.play('talk',1);
		      this.Pet_Talk.alpha=0;
			  this.Pet_Talk.visible=true;
			  egret.Tween.get(this.Pet_Talk).to({ alpha: 1 }, 300, egret.Ease.circIn).call(()=>{
                egret.Tween.removeTweens(this.Pet_Talk);
			  })
	    	})

		    this.petDisplay.addEventListener(egret.Event.COMPLETE, (e: egret.Event) => {
			   this.doPetArmature.animation.fadeIn('stand');
			    
				egret.Tween.get(this.Pet_Talk).to({ alpha: 0 }, 300, egret.Ease.circIn).call(()=>{
                 egret.Tween.removeTweens(this.Pet_Talk);
				 this.Pet_Talk.visible=false;
			   })
	     	 }, this);
			 
		});
        
	
		
		

	}
	//添加角色骨骼动画
	private doRoleArmature;
	private roleDisplay;
	private addRole() {
		if (this.roleDisplay) return
		let sexid = UserInfo.sex, Role;
		if (sexid == 1) {
			Role = this.Role_boy
			this.Role_boy.visible = true;
		} else {
			Role = this.Role_girl
			this.Role_girl.visible = true;
		}
		let RoleImage = <eui.Image>Role.getChildAt(0);


		Tool.addArmature({ ske: 'role_' + sexid + '_ske_json', tex: 'role_' + sexid + '_tex_json', png: 'role_' + sexid + '_tex_png', name: 'Armature' }, (armature, armatureDisplay) => {

			this.doRoleArmature = armature;
			this.roleDisplay = armatureDisplay;
			this.doRoleArmature.animation.play('stand');
			this.doRoleArmature.animation.timeScale=0.5
			RoleImage.visible = false

			if (sexid == 1) {
				this.roleDisplay.x = Math.floor(this.roleDisplay.width / 15)
				this.roleDisplay.y = Math.floor(this.roleDisplay.height / 3.7)
			} else {
				this.roleDisplay.x = Math.floor(this.roleDisplay.width / 4)
				this.roleDisplay.y = Math.floor(this.roleDisplay.height / 1.93)
			}

			this.roleDisplay.touchEnabled = true
			Role.addChild(this.roleDisplay);

	
		});

		//点人物打开个人中心
		Tool.pressBtn(this.roleDisplay,()=>{
		  this.centerSwitch();
		})
	
		this.roleDisplay.addEventListener(egret.Event.COMPLETE, (e: egret.Event) => {
			this.doRoleArmature.animation.fadeIn('stand');
			this.doRoleArmature.animation.timeScale=0.5;
			Tool.print('升级完成ROLE');
		}, this);

	}
	//升级事件
	private upgradeEvent() {
	    this.doRoleArmature.animation.timeScale=1
		this.doRoleArmature.animation.play('upgrade',1);
		if(this.lastLevel>0){
           PopUps.tipMsg('恭喜你又升级啦！');
		}
		
		
	}


}