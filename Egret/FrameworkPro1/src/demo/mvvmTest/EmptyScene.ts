/**
 * 测试空场景
 */
class EmptyScene extends AbstractScene {

    /**
     * 场景初始化
     */
    protected init(): void {
        this.addModule(GameModules.window);
    }

    /**
     * 进入场景
     */
    public enterScene(): void {
        console.log("进入空场景");
        this.onSceneEntered();
    }

    /**
     * 退出场景
     */
    public exitScene(): void {        
        console.log("退出空场景");
        this.onSceneExited();
    }
}