/**
 * 框架全局静态单例类
 */
class App {
    private static _inst: App;

    private static _timerManager: ITimerManager;
    private static _assetManager: IAssetManager;
    private static _loadManager: ILoadManager;
    private static _stageManager: IStageManager;
    private static _logManager: ILogManager;
    private static _tableManager: ITableManager;    

    private _stage: egret.Stage;
    private _curTime: number;
    private _timeId: number;
    private _managerList: Array<IManager>;
    private _updateManagerList: Array<IManager>;

    public constructor() {
        this._managerList = new Array<IManager>();
        this._updateManagerList = new Array<IManager>();
    }

    public static get inst(): App {
        if (!this._inst) {
            this._inst = new App();
        }
        return this._inst;
    }

    public get stage(): egret.Stage {
        return this._stage;
    }

    public startUp(stage: egret.Stage): void {
        this._stage = stage;
        this._curTime = egret.getTimer();
        egret.startTick(this.onTick, this);

        egret.lifecycle.onPause = () => {
            var self = this;
            egret.stopTick(this.onTick, this);
            this._curTime = egret.getTimer();
            this._timeId = window.setInterval(function (): void {
                self.onTick(egret.getTimer());
            }, 1000 / 60);
        };

        egret.lifecycle.onResume = () => {
            window.clearInterval(this._timeId);
            egret.startTick(this.onTick, this);
        };

        // 屏蔽右键菜单
        document.oncontextmenu = function () {
            return false;
        }
    }

    public onTick(time: number): boolean {
        this.update(time - this._curTime);
        this._curTime = time;
        return false;
    }

    public update(deltaTime: number): void {
        for (var manager of this._updateManagerList) {
            manager.update(deltaTime);
        }
    }

	/**
	 * 添加管理器
	 */
    public addManager(manager: IManager): void {
        if (this._managerList.indexOf(manager) == -1) {
            this._managerList.push(manager);
            if (manager.needUpdate) {
                this._updateManagerList.push(manager);
            }
        }
    }

	/**
	 * 移除管理器
	 */
    public removeManager(manager: IManager): void {
        var index: number = this._managerList.indexOf(manager);
        if (index != -1) {
            this._managerList.splice(index, 1);
            if (manager.needUpdate) {
                this._updateManagerList.splice(this._updateManagerList.indexOf(manager), 1);
            }
        }
    }

    public initManagers(): void {
        App._timerManager = new TimerManager();
        this.addManager(App._timerManager);
        App._assetManager = new AssetManager();
        this.addManager(App._assetManager);
        App._loadManager = new LoadManager();
        this.addManager(App._loadManager);
        App._stageManager = new StageManager();
        this.addManager(App._stageManager);
        App._logManager = new LogManager();
        this.addManager(App._logManager);
        App._tableManager = new TableManager();
        this.addManager(App._tableManager);
    }

    public static get timerManager(): ITimerManager {
        return App._timerManager;
    }

    public static get assetManager(): IAssetManager {
        return App._assetManager;
    }

    public static get loadManager(): ILoadManager {
        return App._loadManager;
    }

    public static get stageManager(): IStageManager {
        return App._stageManager;
    }

    public static get logManager(): ILogManager {
        return App._logManager;
    }

    public static get tableManager(): ITableManager {
        return App._tableManager;
    }
}