class AbstractUIWindow implements IUIWindow {

	protected _view: fairygui.GComponent;
	protected _modal: boolean = false;
	protected _touchClose: boolean = false;
	protected _isLoaded: boolean = false;
	protected _isInited: boolean = false;
	protected _isShow: boolean = false;
	protected _isShowCenter: boolean = true;
	protected _windowData: any;
	protected _needShowAction: boolean = false;
	protected _autoDispose: boolean = true;
	protected _autoDisposeTime: number = 5000;
	protected _lastCloseTime: number;
	protected _resList: Array<string>;
	protected _loadResCallback: Handler;

	protected _subViewContainer: fairygui.GComponent;
	protected _subViewDict: Object;
	protected _subViewClassDict: Object;
	protected _subViewType: any;
	protected _subView: IUIWindowSubView;

	protected _dragArea: fairygui.GObject;
	protected _contentArea: fairygui.GComponent;
	protected _closeButton: fairygui.GObject;
	protected _okButton: fairygui.GObject;
	protected _cancelButton: fairygui.GObject;
	protected _closeSoundId: number = 0;        	// 关闭按钮声音 -1默认 0无 

    /**
     * 面板组件
     */
    public get view(): fairygui.GComponent {
        return this._view;
    }

    /**
     * 是否模态
     */
	public get modal(): boolean {
		return this._modal;
	}

	public set modal(value: boolean) {
		this._modal = value;
	}

	/**
     * 是否触摸关闭
     */
	public get touchClose(): boolean {
		return this._touchClose;
	}

	public set touchClose(value: boolean) {
		this._touchClose = value;
	}

    /**
     * 是否已加载
     */
	public get isLoaded(): boolean {
		return this._isLoaded;
	}

	public set isLoaded(value: boolean) {
		this._isLoaded = value;
	}

    /**
     * 是否已初始化
     */
	public get isInited(): boolean {
		return this._isInited;
	}

	public set isInited(value: boolean) {
		this._isInited = value;
	}

    /**
     * 是否已显示
     */
	public get isShow(): boolean {
		return this._isShow;
	}

	public set isShow(value: boolean) {
		this._isShow = value;
	}

	/**
     * 是否居中显示
     */
	public get isShowCenter(): boolean {
		return this._isShowCenter;
	}

	public set isShowCenter(value: boolean) {
		this._isShowCenter = value;
	}

    /**
     * 窗体数据
     */
	public get windowData(): any {
		return this._windowData;
	}

	public set windowData(value: any) {
		this._windowData = value;
	}

    /**
     * 是否显示动画
     */
	public get needShowAction(): boolean {
		return this._needShowAction;
	}

	public set needShowAction(value: boolean) {
		this._needShowAction = value;
	}

	/**
     * 是否自动销毁
     */
	public get autoDispose(): boolean {
		return this._autoDispose;
	}

	public set autoDispose(value: boolean) {
		this._autoDispose = value;
	}

	/**
     * 自动销毁时间
     */
	public get autoDisposeTime(): number {
		return this._autoDisposeTime;
	}

	public set autoDisposeTime(value: number) {
		this._autoDisposeTime = value;
	}

	/**
     * 最后一次显示时间
     */
	public get lastCloseTime(): number {
		return this._lastCloseTime;
	}

	public set lastCloseTime(value: number) {
		this._lastCloseTime = value;
	}

	/**
	 * 资源列表
	 */
	public get resList(): Array<string> {
		return this._resList;
	}


    /**
	 * 全资源列表（包括子界面）
	 */
    getAllResList(): Array<string> {

    }

    /**
     * 初始化
     */
    init(): void;

    /**
     * 显示
     */
    show(modal: boolean, touchClose?: boolean, args?: Array<any>): void;

    /**
     * 设置坐标
     */
    position(x?: number, y?: number): void;

    /**
     * 关闭
     */
    close(closeType?: string): void;

    /**
     * 销毁
     */
    dispose(): void;

    /**
     * 判断是否加载
     */
    getLoaded(): boolean;

    /**
     * 加载窗体资源
     */
    loadRes(callback?: Handler): void;

    /**
     * 设置在最顶层
     */
    bringToFront(): void;

    /**
     * 移动窗体
     */
    moveTo(x: number, y: number): void;

    /**
     * 缓动移动窗体
     */
    tweenMoveTo(x: number, y: number, time: number): void;

    /**
     * 播放显示动画
     */
    playShowAnimation(): void;

    /**
     * 播放关闭动画
     */
    playCloseAnimation(): void;

    /**
     * 注册子界面
     */
    registerSubView(subViewType: any, subViewClass: any): void;

    /**
     * 获取子界面
     */
    getSubView(subViewType: any): IUIWindowSubView;

    /**
     * 显示子界面
     */
    showSubView(subViewType: any): void;

}