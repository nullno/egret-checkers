var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 场景管理类
 */
var SceneManager = (function () {
    function SceneManager() {
        this.MainScene = new MainScene();
        this.StartScene = new StartScene();
        this.HomeScene = new HomeScene();
        this.MapScene = new MapScene();
    }
    Object.defineProperty(SceneManager, "instance", {
        get: function () {
            if (!this.sceneManager) {
                this.sceneManager = new SceneManager();
            }
            return this.sceneManager;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * 设置根场景
     */
    SceneManager.prototype.setStage = function (s) {
        var stage = s; // (根) 舞台
        stage.addChild(SceneManager.instance.MainScene); //推送到舞台显示
    };
    /**
     *显示场景
     *@param newScene 添加的场景
     *@param removeScene 移除的场景
     */
    SceneManager.toScene = function (newScene, removeScene, init) {
        if (init === void 0) { init = false; }
        if (removeScene) {
            if (removeScene.parent) {
                SceneManager.instance.MainScene.game_sence.removeChild(removeScene);
            }
        }
        if (!newScene.parent) {
            SceneManager.instance.MainScene.game_sence.addChild(newScene);
        }
        if (init) {
            if (newScene.init)
                newScene.init();
        }
    };
    return SceneManager;
}());
__reflect(SceneManager.prototype, "SceneManager");
