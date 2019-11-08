/* 
 开始人物选择页
*/
class StartScene extends eui.Component implements eui.UIComponent {

	private selectboy: eui.Group;
	private selectgirl: eui.Group;

	private select_sex_panel: eui.Panel;

	private btn_sexok: eui.Group;

	// 语言切换
	private zh_c: eui.Label;
	private zh_h: eui.Label;

	private sexId: number = 1; //1:男 2:女

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
		this.init()
        
		//引导二：选择性别
		Tool.touchBtn(this.selectboy, () => { this.setSex(1) });
		Tool.touchBtn(this.selectgirl, () => { this.setSex(2) });

		//选择性别确认
		Tool.touchBtn(this.btn_sexok, () => {
			Tool.print('性别：' + this.sexId)
			this.startGmage()
		})

		//语言选择 
	}

	//初始化数据
	private init() {
		Tool.print('start init')
	
		PopUps.topName.innerHTML = '白鹭跳棋小游戏';
		let _thiscanva = <HTMLElement>document.querySelector('.egret-player').children[0];
		if (_thiscanva.offsetTop < 20) {
			PopUps.topName.style.display = 'none'
		} else {
			PopUps.topName.style.cssText += 'height:' + _thiscanva.offsetTop + 'px;line-height:' + _thiscanva.offsetTop + 'px';
		}
        //默认性别选择
		this.setSex(1)

	}

	//登录成功后
	private startGmage() {

		PopUps.waitLoad(true, '进入小屋...');
		SceneManager.toScene(SceneManager.instance.HomeScene, this);
		PopUps.waitLoad(false);

	}

	//登录
	// private async getUserInfo() {

	// 	PopUps.waitLoad(true, '登录中...');
	// 	this.startGmage()
	// }

	//选择性别
	private setSex(sex) {
		UserInfo.sex = this.sexId = sex;
		let boybtnbg = <eui.Rect>this.selectboy.getChildAt(1);
		let girlbtnbg = <eui.Rect>this.selectgirl.getChildAt(1);

		boybtnbg.strokeAlpha = sex == 1 ? 1 : 0;
		girlbtnbg.strokeAlpha = sex == 2 ? 1 : 0;
	}



}


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