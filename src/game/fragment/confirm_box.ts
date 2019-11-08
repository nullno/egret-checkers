/*
消息确认框
*/
class confirm_box extends eui.Component implements  eui.UIComponent {

    private btn_ok:eui.Group;
	private btn_cancel:eui.Group;
	private msg:eui.Label;

    private msginfo:string;
	private OK:any;
	private CANCEL:any;

	public constructor(msginfo,OK,CANCEL?) {
		super();

	    this.msginfo = msginfo;
		this.OK =  OK;
		this.CANCEL =  CANCEL;
		
	}

	protected partAdded(partName:string,instance:any):void
	{
		super.partAdded(partName,instance);
	}


	protected childrenCreated():void
	{
		super.childrenCreated();
        

		this.msg.text=this.msginfo;


		Tool.touchBtn(this.btn_ok,()=>{

			    this.OK()
		})

		Tool.touchBtn(this.btn_cancel,()=>{
             if(this.CANCEL)this.CANCEL();
	
			 SceneManager.instance.MainScene.removeChild(this.parent);

			    
		})
	    

	}
	
}