/**
 * 层级管理
 */
class LayerManager {
    private _root: egret.DisplayObjectContainer;
    private _uiRoot: fairygui.GComponent;

    public menuLayer: fgui.GComponent;
    public windowLayer: fgui.GComponent;

    private static _inst: LayerManager;

    public static get inst(): LayerManager {
        if (!this._inst) {
            this._inst = new LayerManager();
        }
        return this._inst;
    }

    /**
     * 渲染根节点
     */
    public set root(value: egret.DisplayObjectContainer) {
        this._root = value;
    }

    /**
     * 渲染根节点
     */
    public get root(): egret.DisplayObjectContainer {
        return this._root;
    }

    /**
     * 渲染UI根节点
     */
    public set uiRoot(value: fgui.GComponent) {
        this._uiRoot = value;
    }

    /**
     * 渲染UI根节点
     */
    public get uiRoot(): fgui.GComponent {
        return this._uiRoot;
    }

    public init(): void {
        this.menuLayer = new fgui.GComponent();
        this._uiRoot.addChild(this.menuLayer);
        this.windowLayer = new fgui.GComponent();
        this._uiRoot.addChild(this.windowLayer);
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
        view.x = (StageManager.inst.screenWidth - view.width) / 2;
        view.y = (StageManager.inst.screenHeight - view.height) / 2;
        this.menuLayer.addChild(view);
    }

    public removeUIView(view: fgui.GComponent): void {
        this.menuLayer.removeChild(view);
    }
}