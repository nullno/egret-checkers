/*
消息提示
*/

class tip_msg extends eui.Component implements  eui.UIComponent {
	
	private M_group:eui.Group
	private Tip_Label:eui.Label
	private Close_tip:eui.Button
  
    private MsgStr:string
	public constructor(msg) {
		super();
		this.MsgStr = msg;
	}

	protected partAdded(partName:string,instance:any):void
	{
		super.partAdded(partName,instance);
	}


	protected childrenCreated():void
	{
		super.childrenCreated();
		 
		 
        this.Tip_Label.text=this.MsgStr;
        this.M_group.scaleX=0
        egret.Tween.get(this.M_group).to({ scaleX:1}, 300, egret.Ease.circIn).call(() => {
			 egret.Tween.removeTweens(this.M_group)
		})
		 //3后关闭
		let timer =  setTimeout(()=>{
			this.close_this()
		},2000)

        //点击关闭
		Tool.touchBtn(this.Close_tip,()=>{
			  clearTimeout(timer);
			  this.close_this()
		})
       

	}

	private close_this(){
		egret.Tween.get(this.M_group).to({ scaleX:0}, 200, egret.Ease.circIn).call(() => {
					egret.Tween.removeTweens(this.M_group)
				   SceneManager.instance.MainScene.removeChild(this);
			})
	}
	
}