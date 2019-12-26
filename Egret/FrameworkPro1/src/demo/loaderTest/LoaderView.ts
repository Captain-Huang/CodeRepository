/**
 * 测试资源加载UI
 */
class LoaderView extends AbstractUIView {
    private demoName: fgui.GTextField;
    private content: fgui.GTextField;
    private btnLoadAsset: fgui.GButton;
    private btnUnLoadAsset: fgui.GButton;
    private spImg: fgui.GImage;


    /**
    * 初始化
    */
    protected onInit(): void {
        this.demoName = this._view.getChild("demoName").asTextField;
        this.demoName.text = DemoMenu.ASSET_LOADER;

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
        console.log("资源加载测试UI被销毁");
    }

    private onBtnOnceClick(): void {

    }

    private onBtnCloseClick(): void {
        this.close();
        LayerManager.inst.dispatchUIEvent(UIViewEvent.MENU_VIEW_CLOSE, false, [DemoMenu.ASSET_LOADER]);
    }

    private onBtnLoadAssetClick(): void {
        LoadManager.inst.load("http://192.168.1.252:8081/assets/action/4/4400002/4400002_3_4_tex.png", LoadType.TEXTURE, LoadPriority.LV_0, Handler.create(this.onResCompleteCallback, this));
    }

    private onBtnUnLoadAssetClick(): void {

    }

    private onResCompleteCallback(loadItem:LoadItem): void {
        if (loadItem != null && loadItem.asset) {
            var tex = new egret.Texture();
            tex.bitmapData = loadItem.asset.data as egret.BitmapData;
            this.spImg.texture = tex;
        }
        console.log("资源加载回调");
    }
}