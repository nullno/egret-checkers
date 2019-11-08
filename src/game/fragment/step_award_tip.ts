class step_award_tip extends eui.Component implements  eui.UIComponent {
	
	
	private AwardTip_group:eui.Group
	private Title_tip:eui.Label
    private Msg_tip:eui.Label
	private Close_AwardTip:eui.Button
	private Btn_get:eui.Panel
    
	private label_tit:string //标题
	private label_msg:string //信息
	private ok:any //确认事件
	public constructor(msg,callback,tit?) {
		super();
		this.label_tit = tit 
		this.label_msg = msg
		this.ok = callback
	}

	protected partAdded(partName:string,instance:any):void
	{
		super.partAdded(partName,instance);
	}


	protected childrenCreated():void
	{
		super.childrenCreated();
        
		this.Msg_tip.text = this.label_msg
		this.Title_tip.text = this.label_tit?this.label_tit:'恭喜您'
		
		egret.Tween.get(this.AwardTip_group).to({scaleX:1,scaleY:1}, 200, egret.Ease.circIn).call(() => {
			 egret.Tween.removeTweens(this.AwardTip_group)
		})  
		 
		 //确认事件
		Tool.touchBtn(this.Btn_get,()=>{
		    this.ok();
			this.close_this();
		})
		//关闭此项 
		Tool.touchBtn(this.Close_AwardTip,()=>{
		    this.close_this()
		})
	}

	private close_this(){
		egret.Tween.get(this.AwardTip_group).to({scaleX:0,scaleY:0}, 200, egret.Ease.circIn).call(() => {
			 egret.Tween.removeTweens(this.AwardTip_group)
		     SceneManager.instance.MainScene.removeChild(this.parent); 
		})  
	}
	
}