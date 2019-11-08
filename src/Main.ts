//////////////////////////////////////////////////////////////////////////////////////
//主入口
//////////////////////////////////////////////////////////////////////////////////////

class Main extends eui.UILayer {


    protected createChildren(): void {
        super.createChildren();

        egret.lifecycle.addLifecycleListener((context) => {
            // custom lifecycle plugin
        })

        egret.lifecycle.onPause = () => {
            //进入后台
            // console.log('退出游戏');
            egret.ticker.pause();
        }

        egret.lifecycle.onResume = () => {
            egret.ticker.resume();
            // console.log('回到游戏');
            //回到游戏
        }

        //inject the custom material parser
        //注入自定义的素材解析器
        let assetAdapter = new AssetAdapter();
        egret.registerImplementation("eui.IAssetAdapter", assetAdapter);
        egret.registerImplementation("eui.IThemeAdapter", new ThemeAdapter());


        this.runGame().catch(e => {
            console.log(e);
        })
    }


    private async runGame() {
        await this.loadResource()
    }

    private async loadResource() {
        try {
            await RES.loadConfig("resource/default.res.json", "resource/");

            await RES.loadGroup("loading");    
            const loadingView = new Loading();
            this.stage.addChild(loadingView);
            await this.loadTheme();
            await RES.loadGroup("preload", 0, loadingView);
            // //登录并获取游戏数据以后开始游戏
            this.stage.removeChild(loadingView);
            this.createGameScene();
            // await platform.login().then((res) => {
            //     console.log(res)
            //     loadingView.progressText.text = res.msg;
            //     MainData.sid = res.info.sid;//存储sessionId
            //     this.stage.removeChild(loadingView);
            //     this.createGameScene();
            // }).catch(err => {
            //     loadingView.progressText.text = err.msg;
            //     Calculate.showTips(err.msg)
            // })


        }
        catch (e) {

            console.error(e);
        }
    }

    private loadTheme() {
        return new Promise((resolve, reject) => {
            // load skin theme configuration file, you can manually modify the file. And replace the default skin.
            //加载皮肤主题配置文件,可以手动修改这个文件。替换默认皮肤。
            let theme = new eui.Theme("resource/default.thm.json", this.stage);
            theme.addEventListener(eui.UIEvent.COMPLETE, () => {
                resolve();
            }, this);

        })
    }


    /**
     * 创建场景界面
     * Create scene interface
     */
    protected async createGameScene() {
        // 设置语言
        /*if (localStorage.getItem('Language')) {
            switch (localStorage.getItem('Language')) {
                case 'zh_CN':
                    Setting.Language = Language.zh_CN;
                    break;
                case 'zh_HK':
                    Setting.Language = Language.zh_HK;
                    break;

            }
        }*/
        // 把this设置为场景管理器的根舞台
        SceneManager.instance.setStage(this)
    }
    /**
     * 根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。
     * Create a Bitmap object according to name keyword.As for the property of name please refer to the configuration file of resources/resource.json.
     */
    // private createBitmapByName(name: string): egret.Bitmap {
    //     let result = new egret.Bitmap();
    //     let texture: egret.Texture = RES.getRes(name);
    //     result.texture = texture;
    //     return result;
    // }


}
