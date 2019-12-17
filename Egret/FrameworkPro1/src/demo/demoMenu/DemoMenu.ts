class DemoMenu {
    private demoNameArray: Array<string>;
    private _view: fgui.GComponent;

    public constructor() {
        this.demoNameArray = ["对象池", "MVVM", "计时器", "资源加载", "UI封装", "数据表", "自定义纹理格式", "2D序列帧动画", "2D骨骼动画", "2D动作渲染", "2D地图", "A*寻路", "角色状态机", "2D技能",];
    }

    public init(): void {
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onGroupResourceLoadComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onGroupResourceLoadError, this);
        RES.loadGroup("DemoMenu");
    }

    private onGroupResourceLoadComplete(event: RES.ResourceEvent): void {
        if (event.groupName == "DemoMenu") {
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onGroupResourceLoadComplete, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onGroupResourceLoadError, this);
            this.onInit();
        }
    }

    private onGroupResourceLoadError(event: RES.ResourceEvent): void {
        if (event.groupName == "DemoMenu") {
            console.error("资源加载失败：" + event.groupName);
        }
    }

    protected onInit():void {
        fgui.UIPackage.addPackage("DemoMenu");
        this._view = fgui.UIPackage.createObject("DemoMenu", "Main").asCom;
        UICore.uiRoot.addChild(this._view);
    }

    protected show() {

    }

    private testObj
}