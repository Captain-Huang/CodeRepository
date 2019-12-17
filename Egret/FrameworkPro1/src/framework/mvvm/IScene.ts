/**
 * 游戏逻辑场景接口类
 */
interface IScene {
    /**
     * 场景名称
     */
    sceneName: string;

    /**
     * 场景状态
     */
    state: SceneState;

    /**
     * 场景内所有模块数组
     */
    modules: Array<IModule>;

    /**
     * 进入场景回调
     */
    enterCallback;

    /**
     * 退出场景回调
     */
    exitCallback;

    /**
     * 进入场景
     */
    enterScene(): void;

    /**
     * 退出场景
     */
    exitScene(): void;

    /**
     * 添加功能模块
     */
    addModule(module: IModule): void;

    /**
     * 移除功能模块
     */
    removeModule(module: IModule): void;

    /**
     * 是否包含模块
     */
    hasModule(module: IModule): boolean;
}