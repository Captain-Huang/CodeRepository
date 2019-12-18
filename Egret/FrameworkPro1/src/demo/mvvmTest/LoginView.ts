/**
 * 测试登陆UI
 */
class LoginView extends AbstractUIView {
    private sceneNameText: fgui.GTextField;
    private modulesText: fgui.GTextField;
    private btnLogin: fgui.GButton;

    /**
    * 初始化
    */
    protected onInit(): void {
        this.sceneNameText = this._view.getChild("sceneName").asTextField;
        this.modulesText = this._view.getChild("modules").asTextField;
        this.btnLogin = this._view.getChild("btnLogin").asButton;
        this.btnLogin.addClickListener(this.onBtnLoginClick, this);
        var btnClose = this._view.getChild("close").asButton;
        if (btnClose) {
            btnClose.addClickListener(this.onBtnCloseClick, this);
        }
    }

    /**
     * 显示
     */
    protected onShow(...args: Array<any>): void {

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
        console.log("登录UI被销毁");
    }

    private onBtnLoginClick(): void {
        SceneManager.inst.enterScene(GameScene.mainScene);
    }


    private onBtnCloseClick(): void {
        this.close();
        LayerManager.inst.dispatchUIEvent(UIViewEvent.MENU_VIEW_CLOSE, false, [DemoMenu.MVVM]);
    }
}