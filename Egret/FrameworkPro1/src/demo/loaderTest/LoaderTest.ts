/**
 * 资源加载测试
 */
class LoaderTest implements IDemoTest {
    private loaderView: LoaderView;

    begin(): void {
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onGroupResourceLoadComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onGroupResourceLoadError, this);
        RES.loadGroup("AssetLoad");
    }

    stop(): void {
        LayerManager.inst.removeUIView(this.loaderView.view);
        this.loaderView.close();
        this.loaderView.dispose();
        this.loaderView = null;
    }

    private onGroupResourceLoadComplete(event: RES.ResourceEvent): void {
        if (event.groupName == "AssetLoad") {
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onGroupResourceLoadComplete, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onGroupResourceLoadError, this);
            this.onInit();
        }
    }

    private onGroupResourceLoadError(event: RES.ResourceEvent): void {
        if (event.groupName == "AssetLoad") {
            console.error("资源加载失败：" + event.groupName);
        }
    }

    private onInit(): void {
        fgui.UIPackage.addPackage("AssetLoad");
        this.loaderView = new LoaderView(fgui.UIPackage.createObject("AssetLoad", "Main").asCom);
        LayerManager.inst.addUIView(this.loaderView.view);
        this.loaderView.show();
    }
}