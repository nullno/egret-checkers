// 弹窗
class PopUps {

  private static WaitMask: mask;//load等待弹窗储存
  public static gameContainer  = <HTMLElement> document.querySelector('.game-container');
  public static topName = <HTMLElement> document.querySelector('.top-name');

  private static addMaskCenter(a, b) {
    SceneManager.instance.MainScene.addChild(a);
    b.x = a.width / 2 - b.width / 2;
    b.y = a.height / 2 - b.height / 2;
  }
  //消息提示
  static tipMsg(msg: string) {
    var Tip_msg: tip_msg = new tip_msg(msg);
    SceneManager.instance.MainScene.addChild(Tip_msg);
    Tip_msg.x = SceneManager.instance.MainScene.width/2 -Tip_msg.width/2;
    Tip_msg.y = SceneManager.instance.MainScene.height/6;
  }
  //信息确认框
  static confirmBox(msg: string, ok?, cancel?) {
    var Mask: mask = new mask();
    var Confirm_box: confirm_box = new confirm_box(msg, ok, cancel ? cancel : null);

    Mask.addChild(Confirm_box);
    this.addMaskCenter(Mask, Confirm_box)
  }
  //等待加载
  static waitLoad(status: boolean, msg?: string) {
    if (status) {

      this.WaitMask = new mask();
      var Wait_load: wait_load = new wait_load(msg);
      this.WaitMask.addChild(Wait_load);
      this.addMaskCenter(this.WaitMask, Wait_load)
    } else {
      SceneManager.instance.MainScene.removeChild(this.WaitMask);
    }
  }

  //选择前进步数
  static selectStep(getStep: any) {
    var Mask: mask = new mask();
    var Select_step: select_step = new select_step(getStep);
    Mask.addChild(Select_step);
    this.addMaskCenter(Mask, Select_step)
  }
  //道具卡片信息
  static propInfo(data: Object) {
    var Mask: mask = new mask();
    var Prop_info: prop_info = new prop_info(data);
    Mask.addChild(Prop_info);
    this.addMaskCenter(Mask, Prop_info)
  }
  //宠物卡片信息
  static petInfo(data: Object) {
    var Mask: mask = new mask();
    var Pet_info: pet_info = new pet_info(data);
    Mask.addChild(Pet_info);
    this.addMaskCenter(Mask, Pet_info)
  }
  //前进奖励获奖事件
  static stepAwardTip(msg: string, callback: any, tit?) {
    var Mask: mask = new mask();
    var Step_award_tip: step_award_tip = new step_award_tip(msg, callback, tit ? tit : '');
    Mask.addChild(Step_award_tip);
    this.addMaskCenter(Mask, Step_award_tip)
  }
  //前进奖励获得卡片
  static stepAwardCard(data: Object, callback) {
    var Mask: mask = new mask();
    var Step_award_card: step_award_card = new step_award_card(data, callback);
    Mask.addChild(Step_award_card);
    this.addMaskCenter(Mask, Step_award_card)

  }

}