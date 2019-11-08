class pet_info extends eui.Component implements  eui.UIComponent {


  private PetInfo_group:eui.Group	
  private PetCard_Img:eui.Image
  private Pet_des:eui.Label
  private Btn_sharePet:eui.Panel
  private Close_petCard:eui.Button

  
   private PetData:Object
	public constructor(info) {
		super();
		this.PetData=info
	}

	protected partAdded(partName:string,instance:any):void
	{
		super.partAdded(partName,instance);
	}

	protected childrenCreated():void
	{
	  super.childrenCreated();
	  
	  Tool.print('look pet info')
      
	  this.PetCard_Img.source = this.PetData['card_pic']
	  this.Pet_des.text = '       '+this.PetData['des']

	   egret.Tween.get(this.PetInfo_group).to({scaleX:1,scaleY:1}, 200, egret.Ease.circIn).call(() => {
			 egret.Tween.removeTweens(this.PetInfo_group)
		})  
     
	   //分享
		Tool.touchBtn(this.Btn_sharePet,()=>{
            
			Tool.print('分享'+this.PetData['pid'])
		
			// do AppShare...
		    // this.close_this()
		})
		//关闭此项 
		Tool.touchBtn(this.Close_petCard,()=>{
		    this.close_this()
		})
    }

	private close_this(){
		egret.Tween.get(this.PetInfo_group).to({scaleX:0,scaleY:0}, 200, egret.Ease.circIn).call(() => {
			 egret.Tween.removeTweens(this.PetInfo_group)
		     SceneManager.instance.MainScene.removeChild(this.parent); 
		})  
	}
	
}