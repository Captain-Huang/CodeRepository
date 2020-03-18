/**
 * 游戏所有模块
 */
class GameModules {
    public static readonly MODULE_LOGIN: string = "login";
    public static readonly MODULE_MAIN: string = "main";
    public static readonly MODULE_WINDOW: string = "window";

    public static login: ModuleLogin;
    public static main: ModuleMain;
    public static window: ModuleWindow;

    public static init(): void {
        this.login = new ModuleLogin(this.MODULE_LOGIN);
        this.main = new ModuleMain(this.MODULE_MAIN);
        this.window = new ModuleWindow(this.MODULE_WINDOW);
    }

    public static reset(): void {
        console.log("重置模块");
        this.login.reset();
        this.main.reset();
        this.window.reset();
    }
}