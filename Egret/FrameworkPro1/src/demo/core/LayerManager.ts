/**
 * 层级管理
 */
class LayerManager {
    private _root: egret.DisplayObjectContainer;
    private _uiRoot: BaseSprite;
    private _worldRoot: BaseSprite;

    // UI
    private _menuLayer: fgui.GComponent;
    private _window: fgui.GComponent;

    // 场景
    private _worldObjectRoot: BaseSprite;
    private _mapRoot: BaseSprite;

    private static _inst: LayerManager;

    public static get inst(): LayerManager {
        if (this._inst == null) {
            this._inst = new LayerManager();
        }
        return LayerManager._inst;
    }

    public init(rootContainer: egret.DisplayObjectContainer): void {
        this._root = rootContainer;
        this._uiRoot = new BaseSprite();
        this._root.addChild(this._uiRoot);
        UICore.init(this._uiRoot);
        this._worldRoot = new BaseSprite();
        this._root.addChild(this._worldRoot);

        this._worldObjectRoot = new BaseSprite();
        this._worldRoot.addChild(this._worldObjectRoot);
        this._mapRoot = new BaseSprite();
        this._worldRoot.addChild(this._mapRoot);

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

    public get menuLayer(): fgui.GComponent {
        return this._menuLayer;
    }

    public get world(): BaseSprite {
        return this._worldRoot;
    }

    public get worldObjectRoot(): BaseSprite {
        return this._worldObjectRoot;
    }

    public get mapRoot(): BaseSprite {
        return this._mapRoot;
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