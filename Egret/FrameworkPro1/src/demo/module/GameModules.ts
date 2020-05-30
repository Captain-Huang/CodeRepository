/**
 * 游戏所有模块
 */
class GameModules {
    public static readonly MODULE_LOGIN: string = "login";
    public static readonly MODULE_MAIN: string = "main";
    public static readonly MODULE_WINDOW: string = "window";
    public static readonly MODULE_ROLE: string = "role";

    public static login: ModuleLogin;
    public static main: ModuleMain;
    public static window: ModuleWindow;
    public static role: ModuleRole;

    public static init(): void {
        this.login = new ModuleLogin(this.MODULE_LOGIN);
        this.main = new ModuleMain(this.MODULE_MAIN);
        this.window = new ModuleWindow(this.MODULE_WINDOW);
        this.role = new ModuleRole(this.MODULE_ROLE);
    }

    public static reset(): void {
        this.login.reset();
        this.main.reset();
        this.window.reset();
        this.role.reset();
    }
}