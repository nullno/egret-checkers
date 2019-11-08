class mask extends eui.Component implements  eui.UIComponent {


	public constructor() {
		super();
	}

	protected partAdded(partName:string,instance:any):void
	{
		super.partAdded(partName,instance);
	}


	protected childrenCreated():void
	{
		super.childrenCreated();

		this.height = this.stage.stageHeight;
		this.width = this.stage.stageWidth;

	}
	
}