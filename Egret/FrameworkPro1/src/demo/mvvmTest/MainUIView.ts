/**
 * 测试主界面UI
 */
class MainUIView extends AbstractUIView {
    private sceneNameText: fgui.GTextField;
    private modulesText: fgui.GTextField;
    private btnReLogin: fgui.GButton;

    /**
    * 初始化
    */
    protected onInit(): void {
        this.sceneNameText = this._view.getChild("sceneName").asTextField;
        this.modulesText = this._view.getChild("modules").asTextField;
        this.btnReLogin = this._view.getChild("btnReLogin").asButton;
        this.btnReLogin.addClickListener(this.onBtnReLoginClick, this);
    }

    /**
     * 显示
     */
    protected onShow(...args:Array<any>): void {

    }

    /**
     * 关闭
     */
    protected onClose(): void {

    }

    /**
     * 销毁
     */
    protected onDispose(): void {
        console.log("主场景UI被销毁");
    }

    private onBtnReLoginClick():void {
        SceneManager.inst.enterScene(GameScene.loginScene);
    }
}