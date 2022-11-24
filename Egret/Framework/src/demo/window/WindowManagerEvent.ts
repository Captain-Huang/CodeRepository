/**
 * 窗体管理器事件
 */
class WindowManagerEvent extends egret.Event implements IPoolObject {

    public static readonly SHOW_WINDOW:string = "ShowWindow";
	public static readonly CLOSE_WINDOW:string = "CloseWindow";

	public window:IUIWindow;

	public constructor(type?:string) {
        super(type);
    }

    /**
	 * 取出
	 */
	public onPoolGet():void {

    }

	/**
	 * 重置
	 */
	public onPoolReset():void {
        this.window = null;
    }

	/**
	 * 销毁
	 */
	public onPoolDispose():void {
        this.window = null;
    }
}