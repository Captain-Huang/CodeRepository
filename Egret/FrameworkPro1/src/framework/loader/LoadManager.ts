/**
 * 下载管理
 */
class LoadManager {
    public maxLoadCount: number = 5;

    private static _inst: LoadManager;

    private loadDict: Object;
    private loadPriorityDict: Object;
    private curLoaderArr: Array<ILoader>

    public static get inst(): LoadManager {
        if (!this._inst) {
            this._inst = new LoadManager();
        }
        return this._inst;
    }

    public constructor() {
        this.loadDict = {};
        this.curLoaderArr = [];
        this.loadPriorityDict = {};

        for (var i = LoadPriority.LV_0; i <= LoadPriority.LV_4; i++) {
            this.loadPriorityDict[i] = [];
        }
    }

    public load(url: string, loadType: LoadType = LoadType.AUTO, loadPriority: LoadPriority = LoadPriority.LV_4, completeCallback?: Handler, progressCallback?: Handler, errorCallback?: Handler, cache?: boolean): LoadItem {
        var loadItem: LoadItem = ObjectPoolManager.inst.getObject(LoadItem) as LoadItem;
        loadItem.url = url;
        loadItem.loadType = loadType;
        loadItem.loadPriority = loadPriority;
        if (completeCallback != null) {
            loadItem.completeCallbacks.push(completeCallback);
        }
        if (progressCallback != null) {
            loadItem.completeCallbacks.push(progressCallback);
        }
        if (errorCallback != null) {
            loadItem.completeCallbacks.push(errorCallback);
        }
        return this.loadItem(loadItem);
    }

    public loadItem(loadItem: LoadItem): LoadItem {
        var asset: IAsset = AssetManager.inst.getAsset(loadItem.url);
        if (asset != null) {
            // 资源存在
            loadItem.asset = asset;
            loadItem.runCompleteCallbacks();
            return loadItem;
        }

        // 资源不存在，执行下载
        var item: LoadItem = this.loadDict[loadItem.url];
        if (item == null) {
            // 下载队列不存在此下载项
            this.loadDict[loadItem.url] = item = loadItem;
            this.loadPriorityDict[loadItem.loadPriority].push(item);
        } else {
            // 下载队列中存在此下载项，重新排序下载列表
            if (loadItem.loadPriority != item.loadPriority) {
                ArrayUtil.removeItems(this.loadPriorityDict[item.loadPriority], item);
                this.loadPriorityDict[loadItem.loadPriority].push(loadItem);
                ObjectPoolManager.inst.releaseObject(item);
                this.loadDict[loadItem.url] = loadItem;
            }
            this.loadNext();
        }
        return loadItem;
    }

    public loadNext(): void {
        if (this.curLoaderArr.length >= this.maxLoadCount) {
            return;
        }
        for (var i = LoadPriority.LV_0; i <= LoadPriority.LV_4; i++) {
            var items: Array<LoadItem> = this.loadPriorityDict[i];
            while (items.length > 0) {
                var item = items[0];
                this.startLoad(item);
                items.splice(0, 1);
                if (this.curLoaderArr.length >= this.maxLoadCount) {
                    return;
                }
            }
        }
    }

    public startLoad(loadItem: LoadItem): void {
        var loader: ILoader = LoaderFactory.createLoader(loadItem.url, loadItem.loadType);
        loader.completeCallback = Handler.create(this.onLoadComplete, this);
        loader.progressCallback = Handler.create(this.onLoadProgress, this, null, false);
        loader.errorCallback = Handler.create(this.onLoadError, this);
        this.curLoaderArr.push(loader);
        loader.start();
    }

    private onLoadComplete(loader: ILoader): void {
        var loadItem: LoadItem = this.loadDict[loader.url];
        if (loader.asset != null) {
            loadItem.asset = loader.asset;
            // TODO 缓存资源
        }
        // 从当前下载列表中移除
        if (this.curLoaderArr.indexOf(loader) != -1) {
            ArrayUtil.removeItems(this.curLoaderArr, loader);
            ObjectPoolManager.inst.releaseObject(loader);
        }
        this.endLoad(loadItem);

        this.loadNext();
    }

    private onLoadProgress(loader: ILoader): void {

    }

    private onLoadError(loader: ILoader): void {
        var loadItem: LoadItem = this.loadDict[loader.url];
        // 从当前下载列表中移除
        if (this.curLoaderArr.indexOf(loader) != -1) {
            ArrayUtil.removeItems(this.curLoaderArr, loader);
            ObjectPoolManager.inst.releaseObject(loader);
        }
        this.endLoad(loadItem);

        this.loadNext();
    }

    private endLoad(loadItem: LoadItem): void {
        // 释放loadItem
        delete this.loadDict[loadItem.url];
        var prioriryLoaderArr: Array<LoadItem> = this.loadPriorityDict[loadItem.loadPriority];
        ArrayUtil.removeItems(prioriryLoaderArr, loadItem);
        ObjectPoolManager.inst.releaseObject(loadItem);
    }
}