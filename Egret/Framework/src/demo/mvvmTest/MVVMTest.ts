/**
 * MVVM设计模式测试
 */
class MVVMTest implements IDemoTest {
    public begin(): void {
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onGroupResourceLoadComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onGroupResourceLoadError, this);
        RES.loadGroup("MVVM");
    }

    public stop() {
        SceneManager.inst.enterScene(GameScene.emptyScene);
    }

    private onGroupResourceLoadComplete(event: RES.ResourceEvent): void {
        if (event.groupName == "MVVM") {
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onGroupResourceLoadComplete, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onGroupResourceLoadError, this);
            this.onInit();
        }
    }

    private onGroupResourceLoadError(event: RES.ResourceEvent): void {
        if (event.groupName == "MVVM") {
            console.error("资源加载失败：" + event.groupName);
        }
    }

    private onInit(): void {
        fgui.UIPackage.addPackage("MVVM");

        if (GameScene.inited == false) {
            GameModules.init();
            GameScene.init();
        }

        SceneManager.inst.enterScene(GameScene.loginScene);
    }
}