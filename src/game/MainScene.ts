
class MainScene extends eui.Component implements eui.UIComponent {

	public static STAGEWIDTH: number;
	public static STAGEHEIGHT: number;
	public  game_sence: eui.Group;
	//底部菜单按钮
	public menu: eui.Group;

	public constructor() {
		super();
	}

	protected partAdded(partName: string, instance: any): void {
		super.partAdded(partName, instance);
	}


	protected childrenCreated(): void {
		super.childrenCreated();
		this.height = this.stage.stageHeight;
		MainScene.STAGEWIDTH = this.stage.stageWidth
		MainScene.STAGEHEIGHT = this.stage.stageHeight


        SceneManager.toScene(SceneManager.instance.StartScene)

		//主菜单->游戏场景

	}

	

	//移除不需要场景 ,添加新场景
	// static setGScene(Scene) {
		
	// 	for (let n in this.game_sence.$children) {
	// 		this.game_sence.removeChild(this.game_sence.$children[n]);
	// 	}
	// 	this.game_sence.addChild(Scene)
	// }


}