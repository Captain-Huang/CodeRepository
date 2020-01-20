/**
 * 窗口模块
 */
class ModuleWindow extends AbstractModule {
    private _windowDict: Object;
    private _windowClassDict: Object;
    private _opendWindowDict: Object;

    protected init(): void {
        this._windowDict = {};
        this._windowClassDict = {};
        this._opendWindowDict = {};
    }

    /**
     * 根据窗口ID打开窗口
     */
    public showWindowByType(windowType: WindowType, args?: Array<any>, closeWhenOpend?: boolean, x?: number, y?: number): IUIWindow {
        var window: IUIWindow = this._windowDict[windowType];
        if (window == null) {
            console.error("此类型窗口没有被注册,窗口类型：" + windowType);
        }
        // 已经打开，重新进一遍窗口onshow
        var opendWindow: IUIWindow = this._opendWindowDict[windowType];
        if (opendWindow != null) {
            opendWindow.show();
            return;
        }
        window.loadRes(Handler.create(() => {
            this.__showWindowByType(window, windowCFG, windowCFG.IsModal, closeWhenOpend, windowCFG.TouchClose, x, y, args);
        }, this, null, true));

        return null;
    }

    public showWindowByClass(clazz: any, modal?: boolean, closeOthers?: boolean, closeWhenOpend?: boolean, touchClose?: boolean, x?: number, y?: number, args?: Array<any>): IUIWindow {

        return null;
    }

    private __showWindowByType(window: IUIWindow, windowCFG: WindowCFG, modal: boolean, closeWhenOpend: boolean, touchClose: boolean, x: number, y: number, args: Array<any>): void {


    }
}