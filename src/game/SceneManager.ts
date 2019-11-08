/**
 * 场景管理类
 */
class SceneManager {

      public MainScene: MainScene //主窗口：所有场景放里面
      // 游戏场景
      public StartScene: StartScene //开始场景
      public HomeScene: HomeScene //个人主页
      public MapScene: MapScene //地图页


    public constructor() {
        this.MainScene = new MainScene()
        this.StartScene = new StartScene()
        this.HomeScene = new HomeScene()
        this.MapScene = new MapScene()

    }

    /**
    * 获取实例
    */
    static sceneManager: SceneManager
    static get instance() {
        if (!this.sceneManager) {
            this.sceneManager = new SceneManager()
        }
        return this.sceneManager
    }
     
	/**
     * 设置根场景
     */
    public setStage(s: egret.DisplayObjectContainer) {
        let stage: egret.DisplayObjectContainer = s // (根) 舞台
        stage.addChild(SceneManager.instance.MainScene)//推送到舞台显示
    }

    /**
     *显示场景
     *@param newScene 添加的场景
     *@param removeScene 移除的场景
     */
    static toScene(newScene, removeScene?,init=false) {
        if (removeScene) {
            if (removeScene.parent) {
                SceneManager.instance.MainScene.game_sence.removeChild(removeScene)
            }
        }
        if (!newScene.parent) {
            SceneManager.instance.MainScene.game_sence.addChild(newScene)
        }
        if(init){
           if(newScene.init)newScene.init();
        }
        
    }

}