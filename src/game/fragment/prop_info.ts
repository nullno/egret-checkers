class prop_info extends eui.Component implements  eui.UIComponent {
   
   private PropInfo_group:eui.Group
   private Close_propInfo:eui.Button
   private PropInfo_ok:eui.Button
   private Prop_name:eui.Label
   private Prop_cardGroup:eui.Group
   private Prop_des:eui.Label
  
   private PropData:Object
   public constructor(info) {
		super();
		this.PropData = info;
	}

	protected partAdded(partName:string,instance:any):void
	{
		super.partAdded(partName,instance);
	}


	protected childrenCreated():void
	{
		super.childrenCreated();
          
		 if(!this.PropData)return;

		let cardBg = <eui.Rect>this.Prop_cardGroup.$children[0],//道具卡背景
		     cardName = <eui.Label>this.Prop_cardGroup.$children[2],//道具道具名称
		     cardBg2 = <eui.Rect>this.Prop_cardGroup.$children[3],//道具卡背景
			 cardIcon = <eui.Image>this.Prop_cardGroup.$children[4];//icon

        cardBg.fillColor = cardBg2.fillColor = this.PropData['themeColor'];//填充色
        cardIcon.source =  this.PropData['pic'];//图片
		this.Prop_name.text = cardName.text = this.PropData['name']; //道具名称
		this.Prop_des.text = this.PropData['des']; //道具描述
       

	    egret.Tween.get(this.PropInfo_group).to({scaleX:1,scaleY:1}, 200, egret.Ease.circIn).call(() => {
			 egret.Tween.removeTweens(this.PropInfo_group)
		})  

        //关闭此项 
		Tool.touchBtn(this.PropInfo_ok,()=>{
		    this.close_this()
		})
		Tool.touchBtn(this.Close_propInfo,()=>{
		    this.close_this()
		})

	}

	private close_this(){
		egret.Tween.get(this.PropInfo_group).to({scaleX:0,scaleY:0}, 200, egret.Ease.circIn).call(() => {
			 egret.Tween.removeTweens(this.PropInfo_group)
		     SceneManager.instance.MainScene.removeChild(this.parent); 
		})  
	}
	
}