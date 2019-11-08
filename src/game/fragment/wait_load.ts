/*
等待
*/
class wait_load extends eui.Component implements  eui.UIComponent {

    private Load_Icon:eui.Image
    private Load_Label:eui.Label

    private loadTip:string
	
	public constructor(msg?) {
		super();
        this.loadTip = msg;
	}

	protected partAdded(partName:string,instance:any):void
	{
		super.partAdded(partName,instance);
	}


	protected childrenCreated():void
	{
		super.childrenCreated();


        this.Load_Label.text=this.loadTip?this.loadTip:'请稍等...';

        egret.Tween.get(this.Load_Icon,{loop:true}).to({rotation:360}, 800)

	}
	
}