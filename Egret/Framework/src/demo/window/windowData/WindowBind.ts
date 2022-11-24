/**
 * 窗口绑定
 */
class WindowBind {
    public static windowCFGDict: Object = {};
    public static bindDict: Object = {};

    public static bind(): void {


        var windows: Object = getTables(Tables.WindowCFG);
        for (var key in windows) {
            var windowCFG: WindowCFG = window[key] as WindowCFG;
            if (windowCFG != null) {
                this.windowCFGDict[windowCFG.WindowName] = windowCFG;
            }
        }

        this.bindDict[WindowType.RoleWindow] = RoleWindow;
    }
}