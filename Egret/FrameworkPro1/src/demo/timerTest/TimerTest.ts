/**
 * 计时器测试
 */
class TimerTest implements IDemoTest {
    private timerView: TimerView;

    begin(): void {
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onGroupResourceLoadComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onGroupResourceLoadError, this);
        RES.loadGroup("Timer");
    }

    stop(): void {
        LayerManager.inst.removeUIView(this.timerView.view);
        this.timerView.close();
        this.timerView.dispose();
        this.timerView = null;
    }

    private onGroupResourceLoadComplete(event: RES.ResourceEvent): void {
        if (event.groupName == "Timer") {
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onGroupResourceLoadComplete, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onGroupResourceLoadError, this);
            this.onInit();
        }
    }

    private onGroupResourceLoadError(event: RES.ResourceEvent): void {
        if (event.groupName == "Timer") {
            console.error("资源加载失败：" + event.groupName);
        }
    }

    private onInit(): void {
        fgui.UIPackage.addPackage("Timer");
        this.timerView = new TimerView(fgui.UIPackage.createObject("Timer", "Main").asCom);
        LayerManager.inst.addUIView(this.timerView.view);
        this.timerView.show();
    }
}