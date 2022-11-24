/**
 * 功能模块接口类
 */
interface IModule {
    /**
     * 模块名称
     */
    moduleName: string;

    /**
     * 所属场景
     */
    scene: IScene;

    /**
     * 上一个场景
     */
    lastScene: IScene;

    /**
     * 进入模块
     */
    enter(): void;

    /**
     * 退出模块
     */
    exit(): void;

    /**
     * 改变场景
     */
    changeScene(scene: IScene): void;

    /**
     * 重置
     */
    reset(): void;
}