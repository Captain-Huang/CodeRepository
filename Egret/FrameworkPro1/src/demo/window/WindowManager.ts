class WindowManager extends Manager {
    private static _inst:WindowManager;

	private _root: fairygui.GComponent;
	private _windows: Array<IUIWindow>;
	private _modalWindows: Array<IUIWindow>;
	private _touchWindows: Array<IUIWindow>;
	private _modalLayer: fairygui.GGraph;
	private _touchLayer: fairygui.GGraph;

    public static get inst(): WindowManager {
        if (!this._inst) {
            this._inst = new WindowManager();
        }
        return this._inst;
    }

	protected init(): void {
		this._windows = new Array<IUIWindow>();
		this._modalWindows = new Array<IUIWindow>();
		this._touchWindows = new Array<IUIWindow>();
		this._modalLayer = new fairygui.GGraph();
		this._touchLayer = new fairygui.GGraph();
		
		App.stageManager.register(egret.Event.RESIZE, this.onResize, this);
		this.onResize();
		// GGraph先draw出来，在添加点击事件才生效
		this._touchLayer.addClickListener(this.onTouchLayerClick, this);
		if (AppSetting.isWeb) {
			this._touchLayer.touchable = false;
		}
	}

	public initRoot(root: fairygui.GComponent): void {
		this._root = root;
	}

	/**
	 * 显示窗体
	 */
	public showWindow(window: IUIWindow): void {
		var view: fairygui.GComponent = window.view;
		if (view == null) {
			return;
		}
		// 显示模态
		if (window.modal == true) {
			if (this._modalLayer.parent != this._root) {
				this.showModal();
			}
			this._root.addChild(this._modalLayer);
			ArrayUtil.removeItems(this._modalWindows, window);
			this._modalWindows.push(window);
		}
		// 显示触摸
		if (window.touchClose == true) {
			if (this._touchLayer.parent != this._root) {
				this.showTouch();
			}
			this._root.addChild(this._touchLayer);
			ArrayUtil.removeItems(this._touchWindows, window);
			this._touchWindows.push(window);
		}
		// 显示窗体
		if (view.parent == null && window.needShowAction == true) {
			window.playShowAnimation();
		}
		this._root.addChild(view);
		window.isShow = true;
		ArrayUtil.removeItems(this._windows, window);
		this._windows.push(window);
		this.dispatchEventWithData(WindowManagerEvent.SHOW_WINDOW, window);
	}

	/**
	 * 设置窗体坐标
	 */
	public positionWindow(window: IUIWindow, x?: number, y?: number): void {
		var view: fairygui.GComponent = window.view;
		if (view == null) {
			return;
		}
		// 设置窗体位置
		if (!isNaN(x) && !isNaN(y)) {
			window.isShowCenter = false;
			view.setXY(x, y);
		} else {
			window.isShowCenter = true;
			view.center();
		}
	}

	/**
	 * 关闭窗体
	 */
	public closeWindow(window: IUIWindow): void {
		if (window.isShow == false) {
			return;
		}
		var view: fairygui.GComponent = window.view;
		// 移除窗体
		this._root.removeChild(view);
		ArrayUtil.removeItems(this._windows, window);
		window.isShow = false;
		// 处理模态层
		if (window.modal == true) {
			// 是否为最上层模态窗体
			var isTail: boolean = this._modalWindows[this._modalWindows.length - 1] == window;
			ArrayUtil.removeItems(this._modalWindows, window);
			if (isTail == true) {
				// 获取上一个模态窗体
				var w: IUIWindow = this._modalWindows[this._modalWindows.length - 1];
				if (w == null) {
					this._root.removeChild(this._modalLayer);
				} else {
					// 重设模态层索引
					var windowIndex: number = this._root.getChildIndex(w.view);
					var index: number = this._root.getChildIndex(this._modalLayer);
					if (index > windowIndex) {
						this._root.setChildIndex(this._modalLayer, windowIndex);
					}
					if (w.touchClose) {
						windowIndex = this._root.getChildIndex(w.view);
						this._root.setChildIndex(this._touchLayer, windowIndex);
					}
				}
			}
		}
		// 处理触摸层
		if (window.touchClose == true) {
			// 是否为最上层触摸窗体
			var isTail: boolean = this._touchWindows[this._touchWindows.length - 1] == window;
			ArrayUtil.removeItems(this._touchWindows, window);
			if (isTail == true) {
				// 获取上一个触摸窗体
				var w: IUIWindow = this._touchWindows[this._touchWindows.length - 1];
				if (w == null) {
					this._root.removeChild(this._touchLayer);
				} else {
					// 重设触摸层索引
					var windowIndex: number = this._root.getChildIndex(w.view);
					var index: number = this._root.getChildIndex(this._touchLayer);
					if (index > windowIndex) {
						this._root.setChildIndex(this._touchLayer, windowIndex);
					}
				}
			}
		}
		this.dispatchEventWithData(WindowManagerEvent.CLOSE_WINDOW, window);
	}

	/**
	 * 显示模态
	 */
	private showModal(): void {
		// 在此可显示模态动画
	}

	/**
	 * 显示触摸
	 */
	private showTouch(): void {
		// 在此可显示触摸动画
	}

	private onTouchLayerClick(): void {
		if (this._touchWindows.length > 0) {
			var window: IUIWindow = this._touchWindows[this._touchWindows.length - 1];
			window.close();
		}
	}

	private onResize(): void {
		var screenWidth: number = App.stageManager.screenWidth;
		var screenHeight: number = App.stageManager.screenHeight;
		this._modalLayer.setSize(screenWidth, screenHeight);
		this._modalLayer.drawRect(0, 0, 0, 0, 0.5);
		this._touchLayer.setSize(screenWidth, screenHeight);
		this._touchLayer.drawRect(0, 0, 0, 0, 0);
		for (var window of this._windows) {
			if (window.isShowCenter) {
				window.view.center();
			}
		}
	}

	/**
	 * 设置window到最上层
	 */
	public bringToFront(window: IUIWindow): void {
		if (window.isShow == false) {
			return;
		}
		this.showWindow(window);
	}

	/**
     * 对象池派发事件
     */
	public dispatchEventWithData(type: string, window: IUIWindow): void {
		var event: WindowManagerEvent = ObjectPoolManager.inst.getObject(WindowManagerEvent) as WindowManagerEvent;
		event.$type = type;
		event.window = window;
		this.dispatchEvent(event);
		ObjectPoolManager.inst.releaseObject(event);
	}
}