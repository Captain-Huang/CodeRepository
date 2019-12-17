/**
 * 简单UI基类
 */
class AbstractUIView implements IUIView {

    private _view: fairygui.GComponent;

    public constructor(view:fairygui.GComponent = null) {
        this._view = view;
        this.init();
    }

    public set view(value:fairygui.GComponent) {
        this._view = value;
    }

    public get view():fairygui.GComponent {
        return this._view;
    }

    /**
     * 初始化
     */
    public init(): void {
        this.onInit();
    }

    /**
     * 界面显示
     */
    public show(...args:Array<any>): void {
        this.onShow.apply(this, args);
    }

    /**
     * 界面关闭
     */
    public close(): void {
        this.onClose();
    }

    /**
     * 界面销毁
     */
    public dispose(): void {
        this.onDispose();
        if (this._view) {
            this._view.dispose();
            this._view = null;
        }
        ObjectUtil.clear(this);
    }

    /**
     * 初始化
     */
    protected onInit(): void {

    }

    /**
     * 显示
     */
    protected onShow(...args:Array<any>): void {

    }

    /**
     * 关闭
     */
    protected onClose(): void {

    }

    /**
     * 销毁
     */
    protected onDispose(): void {

    }
}