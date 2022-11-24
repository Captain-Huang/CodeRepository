/**
 * 测试主场景模块
 */
class ModuleMain extends AbstractModule {
    private mainUIView: MainUIView;
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
        console.log("进入主UI模块");
        this.mainUIView = new MainUIView(fgui.UIPackage.createObject("MVVM", "MainView").asCom);
        LayerManager.inst.addUIView(this.mainUIView.view);
        this.mainUIView.show();
    }

    /**
     * 退出模块
     */
    protected remove(): void {
        console.log("退出主UI模块");
        LayerManager.inst.removeUIView(this.mainUIView.view);
        this.mainUIView.close();
        this.mainUIView.dispose();
        this.mainUIView = null;
    }
}