/*
 选择步数
*/
class select_step extends eui.Component implements  eui.UIComponent {

	private Close_selectStep:eui.Button
	private DiceStep_go:eui.Panel
	private DiceStep_group:eui.Group

	private SelectStep_group:eui.Group

	private Select_Rect:eui.Rect


    private selectNum:Number = 1
	private getStep:any
	public constructor(getStepNum) {
		super();
		this.getStep=getStepNum;
	}

	protected partAdded(partName:string,instance:any):void
	{
		super.partAdded(partName,instance);
	}


	protected childrenCreated():void
	{
		super.childrenCreated();
          

		egret.Tween.get(this.SelectStep_group).to({scaleX:1,scaleY:1}, 200, egret.Ease.circIn).call(() => {
			 egret.Tween.removeTweens(this.SelectStep_group)
		})  
        //点击色子
	    let Dice = this.DiceStep_group.$children;	 
		Dice.forEach((item:eui.Button,index)=>{
		
			  Tool.touchBtn(item,()=>{
			     this.selectNum=Number(index+1)  
				 egret.Tween.get(this.Select_Rect).to({x:item.x,y:item.y}, 100, egret.Ease.circIn).call(() => {
					egret.Tween.removeTweens(this.Select_Rect)
				})  
		      })
		
			
		})
       //确认选择
		Tool.touchBtn(this.DiceStep_go,()=>{
		   this.close_this()
		   this.getStep(this.selectNum);
		})
		//关闭此项 
		Tool.touchBtn(this.Close_selectStep,()=>{
		    this.close_this()
		})
	}
	private close_this(){
		egret.Tween.get(this.SelectStep_group).to({scaleX:0,scaleY:0}, 200, egret.Ease.circIn).call(() => {
			 egret.Tween.removeTweens(this.SelectStep_group)
		     SceneManager.instance.MainScene.removeChild(this.parent); 
		})  
	}
	
}