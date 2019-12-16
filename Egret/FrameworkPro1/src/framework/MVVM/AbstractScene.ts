/**
 * 游戏逻辑场景基类
 */
class AbstractScene implements IScene {

    public sceneName: string;
    public state: SceneState;
    public modules: Array<IModule>;

    public enterCallback: Function;
    public exitCallback: Function;

    public constructor(name: string) {
        this.sceneName = name;
        this.modules = [];
        this.init();
    }

    /**
     * 进入场景
     */
    public enterScene(): void {

    }

    /**
     * 退出场景
     */
    public exitScene(): void {

    }

    /**
     * 场景初始化
     */
    protected init(): void {

    }

    /**
     * 添加功能模块
     */
    public addModule(module: IModule): void {
        ArrayUtil.addItems(this.modules, module);
    }

    /**
     * 移除功能模块
     */
    public removeModule(module: IModule): void {
        ArrayUtil.removeItems(this.modules, module);
    }

    /**
     * 是否包含模块
     */
    public hasModule(module: IModule): boolean {
        return this.modules.indexOf(module) != -1;
    }

    /**
     * 场景进入完成回调，需手动调用
     */
    protected onSceneEntered(): void {
        if (this.enterCallback) {
            this.enterCallback.apply(this);
        }
    }

    /**
     * 场景退出完成回调，需手动调用
     */
    protected onSceneExited(): void {
        if (this.exitCallback) {
            this.exitCallback.apply(this);
        }
    }
}