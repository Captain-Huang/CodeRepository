/**
 * 资源管理测试
 */
class AssetTest implements IDemoTest {
    private assetTestView: AssetTestView;

    begin(): void {
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onGroupResourceLoadComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onGroupResourceLoadError, this);
        RES.loadGroup("AssetTest");
    }

    stop(): void {
        LayerManager.inst.removeUIView(this.assetTestView.view);
        this.assetTestView.close();
        this.assetTestView.dispose();
        this.assetTestView = null;
    }

    private onGroupResourceLoadComplete(event: RES.ResourceEvent): void {
        if (event.groupName == "AssetTest") {
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onGroupResourceLoadComplete, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onGroupResourceLoadError, this);
            this.onInit();
        }
    }

    private onGroupResourceLoadError(event: RES.ResourceEvent): void {
        if (event.groupName == "AssetTest") {
            console.error("资源加载失败：" + event.groupName);
        }
    }

    private onInit(): void {
        fgui.UIPackage.addPackage("AssetTest");
        this.assetTestView = new AssetTestView(fgui.UIPackage.createObject("AssetTest", "Main").asCom);
        LayerManager.inst.addUIView(this.assetTestView.view);
        this.assetTestView.show();
    }
}