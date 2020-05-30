/**
 * 测试主场景
 */
class MainScene extends AbstractScene {

    /**
     * 场景初始化
     */
    protected init(): void {
        this.addModule(GameModules.main);
    }

    /**
     * 进入场景
     */
    public enterScene(): void {
        console.log("进入主场景");
        this.onSceneEntered();
    }

    /**
     * 退出场景
     */
    public exitScene(): void {
        console.log("退出主场景");        
        this.onSceneExited();
    }
}