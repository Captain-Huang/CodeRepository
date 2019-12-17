/**
 * 模块基类
 */
class AbstractModule implements IModule {
    public moduleName: string;
    public scene: IScene;
    public lastScene: IScene;

    private inited:boolean;

    public constructor(name:string) {
        this.moduleName = name;
    }

    /**
     * 进入模块
     */
    public enter(): void {
        if (!this.inited) {
            this.inited = true;
            this.init();
        }
        this.show();
    }

    /**
     * 退出模块
     */
    public exit(): void {
        this.remove();
    }

    /**
     * 场景切换
     */
    public changeScene(scene: IScene): void {
        this.lastScene = this.scene;
        this.scene = scene;
        this.onSceneChanged();
    }

    /**
     * 场景切换，需重写
     */
    public onSceneChanged():void {

    }

    /**
     * 初始化
     */
    protected init():void {

    }

    /**
     * 重置
     */
    public reset():void {

    }

    /**
     * 进入模块
     */
    protected show():void {

    }

    /**
     * 退出模块
     */
    protected remove():void {

    }
}