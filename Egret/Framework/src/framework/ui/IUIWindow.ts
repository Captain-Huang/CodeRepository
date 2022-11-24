interface IUIWindow {

    /**
     * 面板组件
     */
    view:fairygui.GComponent;

    /**
     * 是否模态
     */
    modal:boolean;

    /**
     * 是否触摸关闭
     */
    touchClose:boolean;

    /**
     * 是否已加载
     */
    isLoaded:boolean;

    /**
     * 是否已初始化
     */
    isInited:boolean;

    /**
     * 是否已显示
     */
    isShow:boolean;

    /**
     * 是否居中显示
     */
    isShowCenter:boolean;

    /**
     * 窗体数据
     */
    windowData:any;

    /**
     * 是否显示动画
     */
    needShowAction:boolean;

    /**
     * 是否自动销毁
     */
    autoDispose:boolean;

    /**
     * 自动销毁时间
     */
    autoDisposeTime:number;

    /**
     * 最后一次关闭时间
     */
    lastCloseTime:number;

    /**
     * 资源列表
     */
    resList:Array<string>;


    /**
	 * 全资源列表（包括子界面）
	 */
	getAllResList():Array<string>;

    /**
     * 初始化
     */
    init():void;

    /**
     * 显示
     */
    show(modal:boolean, touchClose?:boolean, args?:Array<any>):void;

    /**
     * 设置坐标
     */
    position(x?:number, y?:number):void;

    /**
     * 关闭
     */
    close(closeType?:string):void;

    /**
     * 销毁
     */
    dispose():void;

    /**
     * 判断是否加载
     */
    getLoaded():boolean;

    /**
     * 加载窗体资源
     */
    loadRes(callback?:Handler):void;

    /**
     * 设置在最顶层
     */
    bringToFront():void;

    /**
     * 移动窗体
     */
    moveTo(x:number, y:number):void;

    /**
     * 缓动移动窗体
     */
    tweenMoveTo(x:number, y:number, time:number):void;

    /**
     * 播放显示动画
     */
    playShowAnimation():void;

    /**
     * 播放关闭动画
     */
    playCloseAnimation():void;

    /**
     * 注册子界面
     */
    registerSubView(subViewType:any, subViewClass:any):void;

    /**
     * 获取子界面
     */
    getSubView(subViewType:any):IUIWindowSubView;

    /**
     * 显示子界面
     */
    showSubView(subViewType:any):void;

}