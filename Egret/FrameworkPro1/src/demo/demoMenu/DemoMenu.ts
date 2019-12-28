class DemoMenu {
    private demoNameArray: Array<string>;
    private demoOpenFuncArray: Array<Function>;
    private demoCloseFuncArray: Array<Function>;
    private view: fgui.GComponent;
    private list: fgui.GList;

    private subView: fgui.GComponent;

    public static readonly OBJECTPOOL = "对象池";
    public static readonly MVVM = "MVVM";
    public static readonly TIMER = "计时器";
    public static readonly ASSET_LOADER = "资源加载";
    public static readonly ASSET_Manager = "资源管理";
    public static readonly UIFRAMEWORK = "UI封装";
    public static readonly NETWORK = "网络和协议";    
    public static readonly TABLE = "数据表";
    public static readonly CUSTOMATLAS = "自定义纹理";
    public static readonly MOVIECLIP = "2D序列帧动画";
    public static readonly DRAGONBONES = "骨骼动画";
    public static readonly ACTION2D = "2D动作渲染";
    public static readonly MAP2D = "2D地图";
    public static readonly ASTAR = "A*寻路";
    public static readonly ROLECONTROL = "角色状态机";
    public static readonly PARTICLE2D = "2D技能";
    public static readonly AUDIO = "声音";
    
    public constructor() {
        this.demoNameArray = [
            DemoMenu.OBJECTPOOL,
            DemoMenu.MVVM,
            DemoMenu.TIMER,
            DemoMenu.ASSET_LOADER,
            DemoMenu.ASSET_Manager,
            DemoMenu.UIFRAMEWORK,
            DemoMenu.NETWORK,            
            DemoMenu.TABLE,
            DemoMenu.CUSTOMATLAS,
            DemoMenu.MOVIECLIP,
            DemoMenu.DRAGONBONES,
            DemoMenu.ACTION2D,
            DemoMenu.MAP2D,
            DemoMenu.ASTAR,
            DemoMenu.ROLECONTROL,
            DemoMenu.PARTICLE2D,
            DemoMenu.AUDIO,
        ];
        this.demoOpenFuncArray = [
            this.testPool,
            this.testMVVM,
            this.testTimer,
            this.testRESLoad,
            this.testAssetManager,
            this.testUIFramework,
            this.testNetwork,            
            this.testTable,
            this.testCustomAtlas,
            this.test2DMovieClip,
            this.testDragonBones,
            this.test2DAction,
            this.test2DMap,
            this.testAStar,
            this.testRoleControl,
            this.test2DParticle,
            this.testAudio,
        ];
        this.demoCloseFuncArray = [
            this.testPoolClose,
            this.testMVVMClose,
            this.testTimerClose,
            this.testRESLoadClose,
            this.testAssetManagerClose,
            this.testUIFrameworkClose,
            this.testNetworkClose,            
            this.testTableClose,
            this.testCustomAtlasClose,
            this.test2DMovieClipClose,
            this.testDragonBonesClose,
            this.test2DActionClose,
            this.test2DMapClose,
            this.testAStarClose,
            this.testRoleControlClose,
            this.test2DParticleClose,
            this.testAudioClose,
        ];
        if (this.demoOpenFuncArray.length != this.demoNameArray.length) {
            Error("Demo函数或者名称不匹配");
        }
    }

    public init(): void {
        fgui.UIPackage.addPackage("UILib");

        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onGroupResourceLoadComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onGroupResourceLoadError, this);
        RES.loadGroup("DemoMenu");

        LayerManager.inst.addUIEvent(UIViewEvent.MENU_VIEW_CLOSE, this.onMenuViewCloseEvent, this);
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

    protected onInit(): void {
        fgui.UIPackage.addPackage("DemoMenu");
        this.view = fgui.UIPackage.createObject("DemoMenu", "Main").asCom;
        LayerManager.inst.menuLayer.addChild(this.view);
        this.list = this.view.getChild("list").asList;
        this.list.callbackThisObj = this;
        for (let i = 0; i < this.demoNameArray.length; i++) {
            var obj = this.list.addItemFromPool(fgui.UIPackage.getItemURL("UILib", "Button1")).asButton;
            obj.title = this.demoNameArray[i];
            obj.addClickListener(this.demoOpenFuncArray[i], this);
        }
    }

    private onMenuViewCloseEvent(event: UIViewEvent): void {
        var demoName: string = event.data[0];
        var index: number = this.demoNameArray.indexOf(demoName);
        if (index != -1) {
            this.demoCloseFuncArray[index].apply(this);
        }
    }

    private poolTest: PoolTest;
    private testPool(): void {
        this.poolTest = new PoolTest();
        this.poolTest.begin();
    }

    private testPoolClose(): void {
        this.poolTest.stop();
        this.poolTest = null;
    }

    private mvvmTest: MVVMTest;
    private testMVVM(): void {
        this.mvvmTest = new MVVMTest();
        this.mvvmTest.begin();
    }

    private testMVVMClose(): void {
        this.mvvmTest.stop();
        this.mvvmTest = null;
    }

    private timerTest: TimerTest;
    private testTimer(): void {
        this.timerTest = new TimerTest();
        this.timerTest.begin();
    }

    private testTimerClose(): void {
        this.timerTest.stop();
        this.timerTest = null;
    }

    private resLoadTest: LoaderTest;
    private testRESLoad(): void {
        this.resLoadTest = new LoaderTest();
        this.resLoadTest.begin();
    }

    private testRESLoadClose(): void {
        this.resLoadTest.stop();
        this.resLoadTest = null;
    }

    private assetManagerTest: AssetTest;
    private testAssetManager(): void {
        this.assetManagerTest = new AssetTest();
        this.assetManagerTest.begin();
    }

    private testAssetManagerClose(): void {
        this.assetManagerTest.stop();
        this.assetManagerTest = null;
    }

    private testUIFramework(): void {

    }

    private testUIFrameworkClose(): void {

    }

    private testTable(): void {

    }

    private testTableClose(): void {

    }

    private testCustomAtlas(): void {

    }

    private testCustomAtlasClose(): void {

    }

    private test2DMovieClip(): void {

    }

    private test2DMovieClipClose(): void {

    }

    private testDragonBones(): void {

    }

    private testDragonBonesClose(): void {

    }

    private test2DAction(): void {

    }

    private test2DActionClose(): void {

    }

    private test2DMap(): void {

    }

    private test2DMapClose(): void {

    }

    private testAStar(): void {

    }

    private testAStarClose(): void {

    }

    private testRoleControl(): void {

    }

    private testRoleControlClose(): void {

    }

    private test2DParticle(): void {

    }

    private test2DParticleClose(): void {

    }

    private testNetwork(): void {

    }

    private testNetworkClose(): void {

    }

    private testAudio(): void {

    }

    private testAudioClose(): void {

    }
}