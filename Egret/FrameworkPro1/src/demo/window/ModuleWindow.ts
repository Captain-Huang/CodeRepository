/**
 * 窗口模块
 */
class ModuleWindow extends AbstractModule {
	public autoDisposeCheckTime: number = 5000;
	public autoDisposeMaxCount: number = 5;
	public paralleAnimationTime: number = 200;

	private _windowDict: Object;
	private _windowClassDict: Object;
	private _opendWindowList: Array<IUIWindow>;
	private _closedWindowList: Array<IUIWindow>;
	private _paralleledWindowList: Array<IUIWindow>;

	protected init(): void {
		this._windowDict = {};
		this._windowClassDict = {};
		this._opendWindowList = [];
		this._closedWindowList = [];
		this._paralleledWindowList = [];

		// 注册窗口
		WindowBind.bind();
		for (var id in WindowBind.bindDict) {
			var windowCFG: WindowCFG = getTable(Tables.WindowCFG, id) as WindowCFG;
			this.registerWindowClass(windowCFG.WindowName, WindowBind.bindDict[id]);
			if (DEBUG) {
				if (egret.getQualifiedClassName(WindowBind.bindDict[id]) != windowCFG.WindowName) {
					error("窗口类名需和窗口表里一致：" + egret.getQualifiedClassName(WindowBind.bindDict[id]));
				}
			}
		}
	}

	protected show(): void {
		WindowManager.inst.addEventListener(WindowManagerEvent.SHOW_WINDOW, this.onShowWindow, this);
		WindowManager.inst.addEventListener(WindowManagerEvent.CLOSE_WINDOW, this.onCloseWindow, this);

		App.timerManager.registerLoop(this.autoDisposeCheckTime, this.onCheckAutoDisposeWindows, this);
	}

	protected remove(): void {
		WindowManager.inst.removeEventListener(WindowManagerEvent.SHOW_WINDOW, this.onShowWindow, this);
		WindowManager.inst.removeEventListener(WindowManagerEvent.CLOSE_WINDOW, this.onCloseWindow, this);

		App.timerManager.unRegister(this.onCheckAutoDisposeWindows, this);
	}

	/**
	 * 显示确认框
	 */
	public alert(text: string, titleText?: string, type?: AlertType, okCallback?: Handler, cancelCallback?: Handler, closeCallback?: Handler, callback?: Handler, okText?: string, cancelText?: string, checkText?: string): void {
		this.showWindowByClass(AlertWindow, true, false, false, false, NaN, NaN, [text, titleText, type, okCallback, cancelCallback, closeCallback, callback, okText, cancelText, checkText]);
	}

    /**
	 * 注册窗体类
	 */
	public registerWindowClass(name: string, windowClass: { new (): IUIWindow }): void {
		this._windowClassDict[name] = windowClass;
	}

    /**
     * 根据窗口ID打开窗口
     */
	public showWindowByType(windowType: WindowType, args?: Array<any>, closeWhenOpend?: boolean, x?: number, y?: number): IUIWindow {
		var windowCFG: WindowCFG = getTable(Tables.WindowCFG, windowType) as WindowCFG;
		if (windowCFG == null) {
			error("窗口表不存在此窗口，窗口ID：" + windowType);
			return null;
		}
		var name: string = windowCFG.getRealWindowName();
		// 判断缓存是否存在
		var window: IUIWindow = this._windowDict[name];
		if (window == null) {
			var windowClass: any = this._windowClassDict[name];
			if (windowClass == null) {
				error("此类型窗口没有被注册,窗口类型：" + windowType);
				return null;
			}
			window = new windowClass();
			this._windowDict[name] = window;
		}
		// 加载资源
		window.loadRes(Handler.create(() => {
			this.__showWindowByType(window, windowCFG, windowCFG.IsModal, closeWhenOpend, windowCFG.TouchClose, x, y, args);
		}, this, null, true));
		return window;
	}

	public showWindowByClass(clazz: any, modal?: boolean, closeOthers?: boolean, closeWhenOpend?: boolean, touchClose?: boolean, x?: number, y?: number, args?: Array<any>): IUIWindow {
		modal = modal || false;
		closeOthers = closeOthers || false;
		closeWhenOpend = closeWhenOpend || false;
		touchClose = touchClose || false;

		var name: string = egret.getQualifiedClassName(clazz);
		// 判断缓存中是否存在
		var window: IUIWindow = this._windowDict[name];
		if (window == null) {
			window = new clazz();
			this._windowDict[name] = window;
		}
		// 加载资源
		window.loadRes(Handler.create(() => {
			this.__showWindow(window, modal, closeOthers, closeWhenOpend, touchClose, x, y, args);
		}, this));
		return window;
	}

	private __showWindowByType(window: IUIWindow, windowCFG: WindowCFG, modal: boolean, closeWhenOpend: boolean, touchClose: boolean, x: number, y: number, args: Array<any>): void {
		if (!window.isInited) {
			window.init();
		}

		if (closeWhenOpend && window.isShow) {
			window.close();
			return;
		} else {
			if (windowCFG.CloseOthers) {
				this.closeAllWindows();
			} else {
				for (var closeType of windowCFG.CloseWindowArr) {
					this.closeWindowByType(closeType);
				}
			}
		}

		// 打开窗体
		window.windowData = windowCFG;
		if (windowCFG.IsSub) {
			args = args || [];
			args.unshift(windowCFG.WindowName);
			window.show(modal, touchClose, args);
		} else {
			window.show(modal, touchClose, args);
		}

		// 打开模式
		var windowWidth: number = window.view.width;
		var windowHeight: number = window.view.height;
		switch (windowCFG.OpenMode) {
			case WindowOpenMode.top_left:
				x = windowCFG.OpenX;
				y = windowCFG.getRealOpenY();
				break;
			case WindowOpenMode.top_right:
				x = App.stageManager.screenWidth - windowWidth - windowCFG.OpenX;
				y = windowCFG.getRealOpenY();
				break;
			case WindowOpenMode.bottom_left:
				x = windowCFG.OpenX;
				y = App.stageManager.screenHeight - windowHeight - windowCFG.OpenY;
				break;
			case WindowOpenMode.bottom_right:
				x = App.stageManager.screenWidth - windowWidth - windowCFG.OpenX;
				y = App.stageManager.screenHeight - windowHeight - windowCFG.OpenY;
				break;
		}
		if (!isNaN(x) && !isNaN(y)) {
			var p: egret.Point = this.getOptimizedPosition(x, y, window.view);
			x = p.x;
			y = p.y;
		}
		window.position(x, y);

		// 打开关联窗体
		for (var linkType of windowCFG.OpenLinkArr) {
			this.showWindowByType(linkType);
		}
		// 平行显示
		if (windowCFG.getRealParallelArr().length > 0) {
			this.showParallelWindows(window);
		}
	}

	private __showWindow(window: IUIWindow, modal: boolean, closeOthers: boolean, closeWhenOpend: boolean, touchClose: boolean, x: number, y: number, args: Array<any>): void {
		if (!window.isInited) {
			window.init();
		}
		if (closeWhenOpend && window.isShow) {
			window.close();
			return;
		} else {
			if (closeOthers) {
				this.closeAllWindows();
			}
			window.show(modal, touchClose, args);
			if (!isNaN(x) && !isNaN(y)) {
				var p: egret.Point = this.getOptimizedPosition(x, y, window.view);
				x = p.x;
				y = p.y;
			}
			window.position(x, y);
		}
	}

	/**
	 * 显示平行窗体
	 */
	private showParallelWindows(window: IUIWindow): void {
		var windowCFG: WindowCFG = window.windowData;
		if (windowCFG == null) {
			return;
		}
		var parallelArr: Array<number> = windowCFG.getRealParallelArr();
		var parallelWindowList: Array<IUIWindow> = [];
		for (var parallelType of parallelArr) {
			var parallelWindow: IUIWindow = this.getWindowByType(parallelType);
			if (parallelWindow != null && parallelWindow.isShow) {
				parallelWindowList.push(parallelWindow);
			}
		}
		if (parallelWindowList.length > 0) {
			parallelWindowList.sort((windowA: IUIWindow, windowB: IUIWindow) => {
				var CFGA: WindowCFG = windowA.windowData;
				var CFGB: WindowCFG = windowB.windowData;
				var indexA: number = parallelArr.indexOf(CFGA.getRealParallelID());
				var indexB: number = parallelArr.indexOf(CFGB.getRealParallelID());
				if (indexA > indexB) {
					return 1;
				} else if (indexA < indexB) {
					return -1;
				} else {
					return 0;
				}
			});
			this._paralleledWindowList = parallelWindowList;
			this.resizeParallelWindows();
		}
	}

	/**
	 * 重置平行窗体
	 */
	private resizeParallelWindows(showAnimation: boolean = true): void {
		if (this._paralleledWindowList == null) {
			return;
		}
		var totalWidth: number = 0;
		var maxHeight: number = 0;
		for (var window of this._paralleledWindowList) {
			totalWidth += window.view.width;
			if (window.view.height > maxHeight) {
				maxHeight = window.view.height;
			}
		}
		var x: number = (App.stageManager.screenWidth - totalWidth) / 2;
		var y: number = (App.stageManager.screenHeight - maxHeight) / 2;
		for (var window of this._paralleledWindowList) {
			if (showAnimation) {
				window.tweenMoveTo(x, y, this.paralleAnimationTime);
			} else {
				window.moveTo(x, y);
			}
			x += window.view.width;
		}
	}

	/**
	 * 根据类名关闭窗体
	 */
	public closeWindowByClass(windowClass: { new (): IUIWindow }): IUIWindow {
		var window: IUIWindow = this.getWindowByClass(windowClass);
		if (window != null) {
			window.close();
		}
		return window;
	}

	/**
	 * 根据名称关闭窗体
	 */
	public closeWindowByName(name: string): IUIWindow {
		var window: IUIWindow = this.getWindowByName(name);
		if (window != null) {
			window.close();
		}
		return window;
	}

	/**
	 * 根据类型关闭窗体
	 */
	public closeWindowByType(type: number, closeType: string = WindowCloseType.CLOSE): IUIWindow {
		var window: IUIWindow = this.getWindowByType(type);
		if (window != null) {
			window.close(closeType);
		}
		return window;
	}

	/**
	 * 关闭所有窗体
	 */
	public closeAllWindows(): void {
		var windowList: Array<IUIWindow> = this._opendWindowList.concat();
		for (var window of windowList) {
			var windowCFG: WindowCFG = window.windowData;
			if (windowCFG == null || windowCFG.CanCloseAll) {
				window.close();
			}
		}
	}

	/**
	 * 根据类型获取窗体
	 */
	public getWindowByClass(windowClass: { new (): IUIWindow }): IUIWindow {
		var name: string = egret.getQualifiedClassName(windowClass);
		return this._windowDict[name];
	}

	/**
	 * 根据名称获取窗体
	 */
	public getWindowByName(name: string): IUIWindow {
		return this._windowDict[name];
	}

	/**
	 * 获取窗体
	 */
	public getWindowByType(type: number): IUIWindow {
		// 获取窗体配置
		var windowCFG: WindowCFG = getTable(Tables.WindowCFG, type) as WindowCFG;
		if (windowCFG == null) {
			return null;
		}
		// 获取窗体名称
		var name: string = windowCFG.getRealWindowName();
		return this._windowDict[name];
	}

	/**
	 * 根据类名获取窗体是否显示
	 */
	public getWindowIsShowByClass(windowClass: { new (): IUIWindow }): boolean {
		var window: IUIWindow = this.getWindowByClass(windowClass);
		if (window != null) {
			return window.isShow;
		}
		return false;
	}

	/**
	 * 根据名称获取窗体是否显示
	 */
	public getWindowIsShowByName(name: string): boolean {
		var window: IUIWindow = this.getWindowByName(name);
		if (window != null) {
			return window.isShow;
		}
		return false;
	}

	/**
	 * 根据类型获取窗体是否显示
	 */
	public getWindowIsShowByType(type: number): boolean {
		var window: IUIWindow = this.getWindowByType(type);
		if (window != null) {
			return window.isShow;
		}
		return false;
	}

	/**
	 * 是否有窗体正在打开
	 */
	public get hasWindowOpening(): boolean {
		return this._opendWindowList.length > 0;
	}

    /**
     * 获取优化坐标
     */
	public getOptimizedPosition(x: number, y: number, object: fairygui.GObject): egret.Point {
		var screenWidth: number = App.stageManager.screenWidth;
		var screenHeight: number = App.stageManager.screenHeight;
		var width: number = object.width;
		var height: number = object.height;
		if (x < 0) {
			x = 0;
		} else if (x + width > screenWidth) {
			x = screenWidth - width;
		}
		if (y < 0) {
			y = 0;
		} else if (y + height > screenHeight) {
			y = screenHeight - height;
		}
		return new egret.Point(x, y);
	}


	/**
	 * 窗体打开事件
	 */
	private onShowWindow(event: WindowManagerEvent): void {
		var window: IUIWindow = event.window;
		ArrayUtil.addItems(this._opendWindowList, window);
		if (window.autoDispose) {
			ArrayUtil.removeItems(this._closedWindowList, window);
		}
		var windowCFG: WindowCFG = window.windowData;
		if (windowCFG != null) {
			// 播放音效
			// if (windowCFG.PlayOpenSoundEffect) {
			// 	AudioHelper.playCommonEffect(AudioResID.openWindow);
			// }
			// if (windowCFG.OpenSoundEffect != 0) {
			// 	AudioHelper.playCommonEffect(windowCFG.OpenSoundEffect);
			// }
		}
	}

	/**
	 * 窗体关闭事件
	 */
	private onCloseWindow(event: WindowManagerEvent): void {
		var window: IUIWindow = event.window;
		ArrayUtil.removeItems(this._opendWindowList, window);
		if (window.autoDispose) {
			ArrayUtil.addItems(this._closedWindowList, window);
		}
		var windowCFG: WindowCFG = window.windowData;
		if (windowCFG != null) {
			// 播放音效
			// if (windowCFG.PlayCloseSoundEffect) {
			// 	AudioHelper.playCommonEffect(AudioResID.closeWindow);
			// }
			// if (windowCFG.CloseSoundEffect != 0) {
			// 	AudioHelper.playCommonEffect(windowCFG.CloseSoundEffect);
			// }
			// 关联关闭
			for (var closeType of windowCFG.CloseLinkArr) {
				this.closeWindowByType(closeType);
			}
		}
		// 判断平行
		if (this._paralleledWindowList != null) {
			ArrayUtil.removeItems(this._paralleledWindowList, window);
			if (this._paralleledWindowList.length > 0) {
				this.showParallelWindows(this._paralleledWindowList[0]);
			}
		}
		// 处理自动销毁
		if (this._closedWindowList.length > this.autoDisposeMaxCount) {
			while (this._closedWindowList.length > this.autoDisposeMaxCount) {
				var win: IUIWindow = this._closedWindowList.shift();
				var name: string = egret.getQualifiedClassName(win);
				delete this._windowDict[name];
				win.dispose();
			}
			UICore.destroyUnUsedRes();
		}
	}

	/**
	 * 自动清理窗体
	 */
	private onCheckAutoDisposeWindows(): void {
		var time: number = egret.getTimer();
		for (var i = this._closedWindowList.length - 1; i >= 0; i--) {
			var window: IUIWindow = this._closedWindowList[i];
			if (!isNaN(window.lastCloseTime)) {
				if (time - window.lastCloseTime > window.autoDisposeTime) {
					this._closedWindowList.splice(i, 1);
					delete this._windowDict[egret.getQualifiedClassName(window)];
					window.dispose();
				}
			}
		}
		UICore.destroyUnUsedRes();
	}
}