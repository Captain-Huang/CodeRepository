/**
 * UI核心类
 */
class UICore {
    private static _root: egret.DisplayObjectContainer;
    private static _uiRoot: fairygui.GComponent;

    public static init(rootContainer: egret.DisplayObjectContainer): void {
        this._uiRoot = fairygui.GRoot.inst;
        this._root = rootContainer;
        this._root.addChild(this._uiRoot.displayObject);
    }

    /**
     * 渲染根节点
     */
    public static set root(value: egret.DisplayObjectContainer) {
        this._root = value;
    }

    /**
     * 渲染根节点
     */
    public static get root(): egret.DisplayObjectContainer {
        return this._root;
    }

    /**
     * 渲染UI根节点
     */
    public static set uiRoot(value: fairygui.GComponent) {
        this._uiRoot = value;
    }
    /**
     * 渲染UI根节点
     */
    public static get uiRoot(): fairygui.GComponent {
        return this._uiRoot;
    }
}