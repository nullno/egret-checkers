class step_award_card extends eui.Component implements eui.UIComponent {


	private AwardCard_group: eui.Group
	private Close_AwardCard: eui.Group
	private Title_tip: eui.Label
	private Msg_tip: eui.Label
	private Btn_getLabel: eui.Label

	private AwardPropCard: eui.Group
	private AwardPetCard: eui.Group

	private Btn_get: eui.Panel

	private awardCardData: Object
	private ok: any
	private currentCard: eui.Group

	public constructor(data, callback) {
		super();
		this.awardCardData = data;
		this.ok = callback;
	}

	protected partAdded(partName: string, instance: any): void {
		super.partAdded(partName, instance);
	}


	protected childrenCreated(): void {
		super.childrenCreated();

		this.AwardPropCard.visible = this.AwardPetCard.visible = false;

		this.Title_tip.text = this.awardCardData['tit']
		this.Msg_tip.text = this.awardCardData['msg']
		this.Btn_getLabel = this.awardCardData['bname'] ? this.awardCardData['bname'] : '确 定';


		if (this.awardCardData['cardInfo']['type'] == 1) {
			this.currentCard = this.AwardPropCard;
		}
		if (this.awardCardData['cardInfo']['type'] == 2) {
			this.currentCard = this.AwardPetCard;
		}


		this.currentCard.visible = true;
		let cardBg = <eui.Rect>this.currentCard.$children[0],
			cardPic = <eui.Image>this.currentCard.$children[1],
			cardName = <eui.Label>this.currentCard.$children[2];

		cardBg.fillColor = this.awardCardData['cardInfo']['themeColor'];
		cardPic.source = this.awardCardData['cardInfo']['pic']
		cardName.text = this.awardCardData['cardInfo']['name']


		egret.Tween.get(this.AwardCard_group).to({ scaleX: 1, scaleY: 1 }, 200, egret.Ease.circIn).call(() => {
			egret.Tween.removeTweens(this.AwardCard_group)
		})


		//确认事件
		Tool.touchBtn(this.Btn_get, () => {
			this.ok(1);
			this.close_this();
		})

		// 关闭此项
		Tool.touchBtn(this.Close_AwardCard, () => {
			this.ok(0);
			this.close_this()
		})
	}

	private close_this() {
		egret.Tween.get(this.AwardCard_group).to({ scaleX: 0, scaleY: 0 }, 200, egret.Ease.circIn).call(() => {
			egret.Tween.removeTweens(this.AwardCard_group)
			SceneManager.instance.MainScene.removeChild(this.parent);
		})
	}

}