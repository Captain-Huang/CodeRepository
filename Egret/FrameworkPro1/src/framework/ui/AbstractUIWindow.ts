/**
 * UIWindow抽象类
 */
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
	// 关闭按钮声音 -1默认 0无 
	protected _closeSoundId: number = 0;

	public constructor() {
		this._resList = this.getResList();
	}

	/**
     * 视图
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
	public getAllResList(): Array<string> {
		var list: Array<string> = this._resList.concat();
		for (var name in this._subViewDict) {
			var subView: IUIWindowSubView = this._subViewDict[name];
			if (subView.isLoaded) {
				ArrayUtil.addArrayItems(list, subView.resList);
			}
		}
		return list;
	}

    /**
     * 初始化
     */
	public init(): void {
		UICore.addUsedResList(this._resList);
		this._subViewDict = {};
		this._subViewClassDict = {};
		this.registerSubViews();
		this.onInit();

		if (this._view == null) {
			error("Window view is null:" + egret.getQualifiedClassName(this));
		} else {
			this.onInitView();
		}
		this._isInited = true;
	}

	/**
	 * 初始化视图
	 */
	protected onInitView(): void {
		// 内容区域
		this._contentArea = this._view.getChild("contentArea") as fairygui.GComponent;
		// 拖拽区域
		// if (AppSetting.isWeb) {
		// 	var dragArea: fairygui.GObject = this.getChildComp("dragArea");
		// 	if (dragArea != null) {
		// 		this._dragArea = dragArea;
		// 		this._dragArea.draggable = true;
		// 		if (this._dragArea instanceof fairygui.GGraph && this._dragArea.displayObject == null) {
		// 			this._dragArea.asGraph.drawRect(0, 0, 0, 0, 0);
		// 		}
		// 		this._dragArea.addEventListener(fairygui.DragEvent.DRAG_START, this.onDragStart, this);
		// 	}
		// }
		// 关闭按钮
		this._closeButton = this.getChildComp("close");
		if (this._closeButton != null) {
			this._closeButton.addClickListener(this.onCloseButtonClick, this);
			var btn = this._closeButton as fairygui.GButton;
			if(btn){
				// btn.soundId = this._closeSoundId;
			}
		}
		// 确定按钮
		this._okButton = this.getChildComp("ok");
		if (this._okButton != null) {
			this._okButton.addClickListener(this.onOKButtonClick, this);
		}
		// 取消按钮
		this._cancelButton = this.getChildComp("cancel");
		if (this._cancelButton != null) {
			this._cancelButton.addClickListener(this.onCancelButtonClick, this);
		}
		// 子容器
		this._subViewContainer = this._view.getChild("subViewContainer") as fairygui.GComponent;
	}

	/**
	 * 获取组件
	 */
	protected getChildComp(name: string): fairygui.GObject {
		var comp: fairygui.GObject;
		if (this._view != null) {
			comp = this._view.getChild(name);
			if (comp == null) {
				if (this._contentArea != null) {
					comp = this._contentArea.getChild(name);
				}
			}
		}
		return comp;
	}

	/**
	 * 窗体拖拽
	 */
	protected onDragStart(event: fairygui.DragEvent): void {
		event.preventDefault();
		this._view.startDrag(event.touchPointID);
	}

	/**
	 * 窗体关闭（close）
	 */
	protected onCloseButtonClick(): void {
		this.close(WindowCloseType.CLOSE);
	}

	/**
	 * 窗体关闭（ok）
	 */
	protected onOKButtonClick(): void {
		this.close(WindowCloseType.OK);
	}

	/**
	 * 窗体关闭（cancel）
	 */
	protected onCancelButtonClick(): void {
		this.close(WindowCloseType.CANCEL);
	}

    /**
     * 显示
     */
	public show(modal: boolean, touchClose?: boolean, args?: Array<any>): void {
		this._modal = modal;
		this._touchClose = touchClose;
		this._lastCloseTime = NaN;
		WindowManager.inst.showWindow(this);
		this.onShow.apply(this, args);
	}

    /**
     * 关闭
     */
	public close(closeType?: string): void {
		if (this._subView != null) {
			this._subView.close();
		}
		this._lastCloseTime = egret.getTimer();
		if (!closeType) {
			closeType = WindowCloseType.CLOSE;
		}
		WindowManager.inst.closeWindow(this);
		this._loadResCallback = null;
		if (this._isInited) {
			this.onClose(closeType);
		}
	}

	/**
	 * 设置坐标
	 */
	public position(x?: number, y?: number): void {
		WindowManager.inst.positionWindow(this, x, y);
	}

    /**
     * 销毁
     */
	public dispose(): void {
		UICore.removeUsedResList(this._resList);
		if (this._isInited) {
			this.onDispose();
		}

		this._contentArea = null;
		this._subViewContainer = null;
		if (this._dragArea != null) {
			this._dragArea.removeEventListener(fairygui.DragEvent.DRAG_START, this.onDragStart, this);
			this._dragArea = null;
		}
		if (this._closeButton != null) {
			this._closeButton.removeClickListener(this.onCloseButtonClick, this);
			this._closeButton = null;
		}
		if (this._okButton != null) {
			this._okButton.removeClickListener(this.onOKButtonClick, this);
			this._okButton = null;
		}
		if (this._cancelButton != null) {
			this._cancelButton.removeClickListener(this.onCancelButtonClick, this);
			this._cancelButton = null;
		}
		// 销毁子界面
		for (var name in this._subViewDict) {
			this._subViewDict[name].dispose();
		}
		this._subViewDict = null;
		this._subViewClassDict = null;
		// 销毁视图
		if (this._view != null) {
			this._view.dispose();
			this._view = null;
		}
		this._resList = null;
		this._loadResCallback = null;
		ObjectUtil.clear(this);
	}

	protected onInit(): void {

	}

	protected onShow(...args: Array<any>): void {

	}

	protected onClose(closeType: string): void {

	}

	protected onDispose(): void {

	}

	protected registerSubViews(): void {

	}

    /**
     * 设置在最顶层
     */
	public bringToFront(): void {
		WindowManager.inst.bringToFront(this);
	}

    /**
     * 移动窗体
     */
	public moveTo(x: number, y: number): void {
		if (this.view != null) {
			this.view.setXY(x, y);
		}
	}

    /**
     * 缓动移动窗体
     */
	public tweenMoveTo(x: number, y: number, time: number): void {
		if (this.view != null) {
			egret.Tween.get(this.view).to({ x: x, y: y }, time);
		}
	}

    /**
     * 播放显示动画
     */
	public playShowAnimation(): void {

	}

    /**
     * 播放关闭动画
     */
	public playCloseAnimation(): void {

	}

    /**
     * 注册子界面
     */
	public registerSubView(subViewType: any, subViewClass: any): void {
		this._subViewClassDict[subViewType] = subViewClass;
	}

    /**
     * 获取子界面
     */
	public getSubView(subViewType: any): IUIWindowSubView {
		var subView: IUIWindowSubView = this._subViewDict[subViewType];
		if (subView == null) {
			var subViewClass: any = this._subViewClassDict[subViewType];
			if (subViewClass == null) {
				return null;
			}
			subView = new subViewClass();
			this._subViewDict[subViewType] = subView;
		}
		return subView;
	}

    /**
     * 显示子界面
     */
	public showSubView(subViewType: any, args?: Array<any>): void {
		this._subViewType = subViewType;
		// 关闭原子面板
		if (this._subView != null) {
			if (this._subView.isInited) {
				this._subView.close();
			}
			if (this._subView.view != null) {
				this._subViewContainer.removeChild(this._subView.view);
			}
		}
		this._subView = this.getSubView(subViewType);
		// 显示新子界面
		if (this._subView != null) {
			this._subView.loadRes(new Handler((subView: IUIWindowSubView) => {
				if (this._subView == subView) {
					if (!this._subView.isInited) {
						this._subView.init();
					}
					this._subView.show(args);
					this._subViewContainer.addChild(this._subView.view);
				}
			}, this, [this._subView]));
		}
	}

	/**
	 * 资源列表
	 */
	protected getResList(): Array<string> {
		return [];
	}

	/**
     * 判断是否加载
     */
	public getLoaded(): boolean {
		if (this._resList == null || this._resList.length == 0) {
			return true;
		}
		if (this._isLoaded == false && UICore.hasPackageList(this._resList) == true) {
			this._isLoaded = true;
		}
		return this._isLoaded;
	}

    /**
     * 加载窗体资源
     */
	public loadRes(callback?: Handler): void {
		if (this.getLoaded()) {
			if (callback != null) {
				callback.run();
				return;
			}
		}
		this._loadResCallback = callback;
		UICore.loadPackageList(this._resList, new Handler(() => {
			this._isLoaded = true;
			if (this._loadResCallback != null) {
				this._loadResCallback.run();
				this._loadResCallback = null;
			}
		}, this));
	}
}