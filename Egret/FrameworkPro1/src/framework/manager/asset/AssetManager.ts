/**
 * 资源管理
 */
class AssetManager extends Manager implements IAssetManager {
    public showLog: boolean;

    private assetDict: Object;

    private _enabled: boolean;
    private _autoClearTime: number;
    private _autoClearCheckTime: number;
    private _assetProxy: IAssetProxy;

    protected init():void {
        this.assetDict = {};
        this.showLog = true;
        this._enabled = true;
        this._autoClearTime = 10000;
        this._autoClearCheckTime = 10000;
    }

    public set enabled(value: boolean) {
        this._enabled = value;
        if (value == true) {
            App.timerManager.registerLoop(this._autoClearCheckTime, this.checkClearAsset, this);
        } else {
            App.timerManager.unRegister(this.checkClearAsset, this);
        }
    }

    public get enabled(): boolean {
        return this._enabled;
    }

    /**
     * 隔多长时间清理一次资源
     */
    public set autoClearCheckTime(value: number) {
        this._autoClearCheckTime = value;
        if (this._enabled) {
            App.timerManager.registerLoop(this._autoClearCheckTime, this.checkClearAsset, this);
        }
    }

    /**
     * 隔多长时间清理一次资源
     */
    public get autoClearCheckTime(): number {
        return this._autoClearCheckTime;
    }

    /**
     * 可清理时间
     */
    public set autoClearTime(value: number) {
        this._autoClearTime = value;
        this.checkClearAsset();
    }

    /**
     * 可清理时间
     */
    public get autoClearTime(): number {
        return this._autoClearTime;
    }

    /**
     * 资源代理
     */
    public set assetProxy(value: IAssetProxy) {
        this._assetProxy = value;
    }

    /**
     * 资源代理
     */
    public get assetProxy(): IAssetProxy {
        return this._assetProxy;
    }

    public addAsset(asset: IAsset): void {
        this.assetDict[asset.url] = asset;
    }

    public hasAsset(url: string): boolean {
        return this.assetDict[url] != null;
    }

    public getAsset(url: string): IAsset {
        return this.assetDict[url];
    }

    public removeAsset(url: string): void {
        var asset: IAsset = this.assetDict[url];
        if (asset != null) {
            delete this.assetDict[url];
            ObjectPoolManager.inst.releaseObject(asset);
        }
    }

    public getAssetPackage(url: string): IAssetPackage {
        return this.assetDict[url];
    }

    public getAssetInPackage(packageUrl: string, assetName: string): any {
        var assetPackage: IAssetPackage = this.assetDict[packageUrl];
        if (assetPackage != null) {
            return assetPackage.getAsset(assetName);
        }
        return null;
    }

    public useAsset(url: string, count: number): void {
        var asset: IAsset = this.assetDict[url];
        if (asset != null) {
            asset.use(count);
        }
    }

    public unUseAsset(url: string, count: number): void {
        var asset: IAsset = this.assetDict[url];
        if (asset != null) {
            asset.unuse(count);
        }
    }

    public checkClearAsset(force?: boolean): void {
        if (this._assetProxy != null) {
            this._assetProxy.prepareClearAsset();
        }

        var timeNow: number = egret.getTimer();
        var removeList: Array<IAsset> = [];
        for (var key in this.assetDict) {
            var asset: IAsset = this.assetDict[key];
            if (asset.autoClear && asset.useCount == 0) {
                if (force || timeNow - asset.lastUseTime >= this._autoClearTime) {
                    if (this._assetProxy == null || this._assetProxy.checkClearAsset(asset) == true) {
                        removeList.push(asset);
                    }
                }
            }
        }

        for (var removeAsset of removeList) {
            delete this.assetDict[removeAsset.url];
            if (this.showLog == true) {
                console.info("销毁资源，url:" + removeAsset.url);
            }
            ObjectPoolManager.inst.releaseObject(removeAsset);
        }
    }
}