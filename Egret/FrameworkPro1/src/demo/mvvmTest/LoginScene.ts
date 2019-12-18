/**
 * 测试登陆场景
 */
class LoginScene extends AbstractScene {

    /**
     * 场景初始化
     */
    protected init(): void {
        this.addModule(GameModules.login);
    }

    /**
     * 进入场景
     */
    public enterScene(): void {
        console.log("进入登录场景");
        this.onSceneEntered();
    }

    /**
     * 退出场景
     */
    public exitScene(): void {        
        console.log("退出登录场景");
        this.onSceneExited();
    }
}