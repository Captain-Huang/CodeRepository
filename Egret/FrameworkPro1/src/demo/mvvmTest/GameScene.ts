/**
 * 游戏所有场景
 */
class GameScene {
    public static readonly LOGIN_SCENE: string = "login";
    public static readonly MAIN_SCENE: string = "main";
    public static readonly EMPTY_SCENE: string = "empty";

    public static loginScene: LoginScene;
    public static mainScene: MainScene;
    public static emptyScene: EmptyScene;

    public static inited: boolean = false;

    public static init(): void {
        this.loginScene = new LoginScene(this.LOGIN_SCENE);
        this.mainScene = new MainScene(this.MAIN_SCENE);
        this.emptyScene = new EmptyScene(this.EMPTY_SCENE);

        SceneManager.inst.registerScene(this.loginScene);
        SceneManager.inst.registerScene(this.mainScene);
        SceneManager.inst.registerScene(this.emptyScene);
        
        this.inited = true;
    }
}