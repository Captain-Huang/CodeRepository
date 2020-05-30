/**
 * 场景模块
 */
class ModuleScene extends AbstractModule {

	public sceneTypeDict: Object;
	public sceneDict: Object;
	public lastSceneType: SceneType;
	public currentSceneProcessor: SceneProcessor;

	protected init(): void {
		this.sceneTypeDict = {};
		this.sceneDict = {};
		this.registerSceneType();
	}

	public reset(): void {
		if (this.currentSceneProcessor != null) {
			this.currentSceneProcessor.exit();
			this.currentSceneProcessor = null;
		}
		this.lastSceneType = SceneType.NONE;
	}

	protected show(): void {

	}

	protected remove(): void {

	}

	/**
	 * 注册场景类型
	 */
	private registerSceneType(): void {
		this.sceneTypeDict[SceneType.MAIN] = MainSceneProcessor;
	}

	/**
	 * 当前场景类型
	 */
	public get currentSceneType(): SceneType {
		if (this.currentSceneProcessor != null) {
			return this.currentSceneProcessor.type;
		}
		return SceneType.NONE;
	}

	/**
	 * 设置场景处理器
	 */
	public setSceneProcessor(sceneType: SceneType): void {
		if (this.currentSceneProcessor != null) {
			this.lastSceneType = this.currentSceneProcessor.type;
			this.currentSceneProcessor.exit();
			// this.dispatchEventWith(ModuleSceneEvent.EXIT_SCENE, false, this.currentSceneProcessor.type);
		}
		this.currentSceneProcessor = this.sceneDict[sceneType];
		if (this.currentSceneProcessor == null) {
			var sceneClass: any = this.sceneTypeDict[sceneType];
			this.currentSceneProcessor = this.sceneDict[sceneType] = new sceneClass();
		}
		this.currentSceneProcessor.enter();
		// this.dispatchEventWith(ModuleSceneEvent.ENTER_SCENE, false, this.currentSceneProcessor.type);
	}

	/**
	 * 安全设置场景处理器
	 */
	public setSceneProcessorSafe(sceneType: SceneType): void {
		if (this.currentSceneProcessor != null && this.currentSceneProcessor.type == sceneType) {
			return;
		}
		this.setSceneProcessor(sceneType);
	}

	/**
     * 返回上一菜单视图
     */
	public backToPreviousScene(): void {
		if (this.lastSceneType != SceneType.NONE) {
			this.setSceneProcessorSafe(this.lastSceneType);
		}
	}

	/**
	 * 地图切换
	 */
	public onMapChange(event:egret.Event):void {
		this.setSceneProcessorSafe(SceneType.MAIN);
		this.currentSceneProcessor.show();
	}
}