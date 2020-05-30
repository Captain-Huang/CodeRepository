/**
 * 测试登陆模块
 */
class ModuleLogin extends AbstractModule {
    private LoginView:LoginView;
    /**
    * 初始化
    */
    protected init(): void {

    }

    /**
     * 重置
     */
    public reset(): void {

    }
 /**
     * 进入模块
     */
    protected show(): void {
        console.log("进入登录模块");
        this.LoginView = new LoginView(fgui.UIPackage.createObject("MVVM", "LoginView").asCom);
        LayerManager.inst.addUIView(this.LoginView.view);
        this.LoginView.show();
    }

    /**
     * 退出模块
     */
    protected remove(): void {
        console.log("退出登录模块");
        LayerManager.inst.removeUIView(this.LoginView.view);
        this.LoginView.close();
        this.LoginView.dispose();
        this.LoginView = null;
    }
}