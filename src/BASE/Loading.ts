//////////////////////////////////////////////////////////////////////////////////////
// 自定义加载页
//////////////////////////////////////////////////////////////////////////////////////

class Loading extends egret.Sprite implements RES.PromiseTaskReporter {

    public constructor() {
        super();
        // 当被添加到舞台的时候触发 (被添加到舞台,说明资源组已经加载完成)
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.createView, this)
    }


    private myprogress: egret.Sprite;
    public progressText: eui.Label;
    private progressBar: egret.Bitmap;
    private progressBox:egret.Bitmap;
    private bg: egret.Bitmap;
    private numText:eui.Label;
    // private bg: eui.Rect;
    private logo: egret.Bitmap;

    private createView(): void {
        this.width = this.stage.stageWidth
        this.height = this.stage.stageHeight

        // loading背景
        this.bg = new egret.Bitmap()
        this.bg.texture = RES.getRes('loading_jpg')
        this.bg.width = this.width;
        this.bg.height = this.height;
        // this.bg.x = this.width / 2 - this.bg.width / 2
        // this.bg.y = this.height / 2 - this.bg.height / 2

        // this.bg = new eui.Rect()
        // this.bg.fillColor = 14408667;
        // this.bg.width = this.width;
        // this.bg.height = this.height;


        this.addChild(this.bg)

        this.myprogress = new  egret.Sprite();
        this.myprogress.width = this.width *0.7;

        //logo显示 // this.logo = new egret.Bitmap()
        // this.logo.texture = RES.getRes('loading_pet_png')
        // this.logo.x = this.width / 2 - this.logo.width / 2
        // this.logo.y = this.height / 2 - this.logo.height*0.7
         
        //百分比
         this.numText = new eui.Label();

         this.numText.width = this.width;
         this.numText.height = 50;
         this.numText.y = this.height/2-this.numText.height/3;
         this.numText.size = 50;
        this.numText.textColor = 12138590;
        this.numText.bold = true;
        this.numText.textAlign = 'center';
        this.numText.verticalAlign = 'middle';

        this.addChild(this.numText)

        this.progressBox = new egret.Bitmap();
        this.progressBox.texture = RES.getRes('loading_bar_bg_png')
        // this.progressBox.strokeColor = 16777215;
        // this.progressBox.strokeWeight = 2;
        // this.progressBox.fillColor = 0xF1CCB8;
        // this.progressBox.fillAlpha = 0.8;
        this.progressBox.y = 20
        this.progressBox.width = this.width *0.7+8;
        this.progressBox.height = 30;
        // this.progressBox.ellipseWidth = this.progressBox.height;
        this.myprogress.addChild(this.progressBox)


      
    
         var mymask:egret.Shape = new egret.Shape();
        mymask.graphics.beginFill(0xff0000);
        mymask.graphics.drawRoundRect(0,0,this.width*0.7,24,50,50);
        mymask.graphics.endFill();
         mymask.y = 24
         mymask.x=4
       this.myprogress.addChild(mymask);

        this.progressBar = new egret.Bitmap();
        this.progressBar.texture = RES.getRes('loading_bar_press_png')
        this.progressBar.width = 0;
        this.progressBar.height = 24;
        this.progressBar.y = 23
        this.progressBar.x = 5;


        // this.progressBar.fillColor = 16748032;
        // this.progressBar.ellipseWidth = this.progressBar.height
        this.progressBar.mask = mymask;
        this.myprogress.addChild(this.progressBar)

        this.progressText = new eui.Label();
        this.progressText.width = this.width *0.7
        this.progressText.height = 30;
        this.progressText.y = 70;
        this.progressText.size = 25;
        this.progressText.textColor = 1329758
        this.progressText.textAlign = 'center';
        this.progressText.verticalAlign = 'middle';
        this.myprogress.addChild(this.progressText)



        this.myprogress.x = this.width / 2 - this.myprogress.width / 2
        this.myprogress.y = this.height / 2 - this.myprogress.height/2
         this.myprogress.anchorOffsetY= - this.height*0.2;
        this.addChild(this.myprogress);


    }

    // 这个函数在加载中会自动调用
    public onProgress(current: number, total: number): void {

        let per = Math.floor((current / total) * 100)
        this.progressBar.width =  (this.width *0.7) * (current / total);
        this.numText.text = per.toString();
        // this.progressText.text = `你的小可爱正在赶来...${per}%`
        if (per == 100) this.progressText.text = `马上进入...`
    }
}
