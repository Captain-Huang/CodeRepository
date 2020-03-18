/**
 * 层级管理
 */
class LayerManager {
    private _root: egret.DisplayObjectContainer;
    private _uiRoot: egret.Sprite;

    // UI
    private _menuLayer: fgui.GComponent;
    private _window: fgui.GComponent;

    private static _inst: LayerManager;

    public static get inst(): LayerManager {
        if (this._inst == null) {
            this._inst = new LayerManager();
        }
        return LayerManager._inst;
    }

    public init(rootContainer: egret.DisplayObjectContainer): void {
        this._root = rootContainer;
        this._uiRoot = new egret.Sprite();
        this._root.addChild(this._uiRoot);
        UICore.init(this._uiRoot);

        this._menuLayer = new fgui.GComponent();
        UICore.root.addChild(this._menuLayer);
        this._window = new fgui.GComponent();
        UICore.root.addChild(this._window);

        WindowManager.inst.initRoot(this._window);
    }

    /**
     * 渲染根节点
     */
    public get root(): egret.DisplayObjectContainer {
        return this._root;
    }

    public get window(): fgui.GComponent {
        return this._window
    }

    public get menuLayer():fgui.GComponent {
        return this._menuLayer;
    }

    public addUIEvent(type: string, listener: Function, thisObj: any): void {
        this._uiRoot.addEventListener(type, listener, thisObj);
    }

    public removeUIEvent(type: string, listener: Function, thisObj: any): void {
        this._uiRoot.removeEventListener(type, listener, thisObj);
    }

    public dispatchUIEvent(type: string, bubbles?: boolean, data?: any, cancelable?: boolean): boolean {
        return this._uiRoot.dispatchEventWith(type, bubbles, data, cancelable);
    }

    public addUIView(view: fgui.GComponent): void {
        view.x = (App.stageManager.screenWidth - view.width) / 2;
        view.y = (App.stageManager.screenHeight - view.height) / 2;
        this._menuLayer.addChild(view);
    }

    public removeUIView(view: fgui.GComponent): void {
        this._menuLayer.removeChild(view);
    }
}