/**
 * 测试资源管理UI
 */
class AssetTestView extends AbstractUIView {
    private demoName: fgui.GTextField;
    private content: fgui.GTextField;
    private btnLoadAsset: fgui.GButton;
    private btnUnLoadAsset: fgui.GButton;
    private spImg: fgui.GImage;

    private textureAsset:TextureAsset;

    /**
    * 初始化
    */
    protected onInit(): void {
        this.demoName = this._view.getChild("demoName").asTextField;
        this.demoName.text = DemoMenu.ASSET_Manager;
        this.content = this._view.getChild("content").asTextField;
        this.content.text = "当加载完资源后，资源在10秒左右会自动卸载。\n  如果点击卸载资源，会把资源立即卸载掉";
        this.btnLoadAsset = this._view.getChild("btnLoadAsset").asButton;
        this.btnLoadAsset.addClickListener(this.onBtnLoadAssetClick, this);

        this.btnUnLoadAsset = this._view.getChild("btnUnLoadAsset").asButton;
        this.btnUnLoadAsset.addClickListener(this.onBtnUnLoadAssetClick, this);

        var btnClose = this._view.getChild("close").asButton;
        if (btnClose) {
            btnClose.addClickListener(this.onBtnCloseClick, this);
        }

        this.spImg = new fgui.GImage();
        this.spImg.setXY(50, 100);
        this._view.addChild(this.spImg);
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
        console.log("资源管理测试UI被销毁");
    }

    private onBtnOnceClick(): void {

    }

    private onBtnCloseClick(): void {
        this.close();
        LayerManager.inst.dispatchUIEvent(UIViewEvent.MENU_VIEW_CLOSE, false, [DemoMenu.ASSET_Manager]);
    }

    private onBtnLoadAssetClick(): void {
        LoadManager.inst.load("http://192.168.1.252:8081/assets/action/4/4400002/4400002_3_4_tex.png", LoadType.TEXTURE, LoadPriority.LV_0, Handler.create(this.onResCompleteCallback, this));
    }

    private onBtnUnLoadAssetClick(): void {

    }

    private onResCompleteCallback(loadItem:LoadItem): void {
        if (loadItem != null && loadItem.asset) {
            this.textureAsset = loadItem.asset as TextureAsset;
            this.spImg.texture = this.textureAsset.texture;
            this.textureAsset.use();
        }
        console.log("资源加载回调");
    }
}