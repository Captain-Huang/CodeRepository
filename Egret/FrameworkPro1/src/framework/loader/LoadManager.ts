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

    public load(url: string, loadType: LoadType = LoadType.AUTO, loadPriority: LoadPriority = LoadPriority.LV_4, completeCallback?: Handler, progressCallback?: Handler, errorCallback?: Handler, cache?: boolean, loadParams?: Array<LoadParam>): LoadItem {
        var loadItem: LoadItem = new LoadItem();
        loadItem.url = url;
        loadItem.loadType = loadType;
        loadItem.loadPriority = loadPriority;
        loadItem.cache = cache;
        loadItem.loadParams = loadParams;
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

    /**
     * 下载资源列表
     */
    public loadItems(items:Array<LoadItem>, completeCallback?:Handler , progressCallback?:Handler, errorCallback?:Handler, dispatchEvent?:boolean):LoadQueue {
        return this.loadQueue(new LoadQueue(items, completeCallback, progressCallback, errorCallback));
    }

    /**
     * 下载资源列表
     */
    public loadQueue(queue:LoadQueue):LoadQueue {
        queue.load();
        return queue;
    }


    public removeLoadCallback(url: string, completeCallback?: Handler): void {
        var loadItem: LoadItem = this.loadDict[url];
        if (loadItem != null) {
            if (completeCallback != null) {
                ArrayUtil.removeItems(loadItem.completeCallbacks, completeCallback);
            }
            if (loadItem.isLoading == false && loadItem.completeCallbacks.length == 0) {
                this.stopLoad(url);
            }
        }
    }

    public stopLoad(url: string): void {
        var loadItem: LoadItem = this.loadDict[url];
        if (loadItem != null) {
            delete this.loadDict[url];
            ArrayUtil.removeItems(this.loadPriorityDict[loadItem.loadPriority], loadItem);
            ArrayUtil.removeItems(this.curLoaderArr, loadItem.loader);
            ObjectPoolManager.inst.releaseObject(loadItem.loader);
            loadItem.dispose();
        }
    }


    public loadItem(loadItem: LoadItem): LoadItem {
        var asset: IAsset = AssetManager.inst.getAsset(loadItem.url);
        if (asset != null) {
            // 资源存在
            loadItem.asset = asset;
            loadItem.runCompleteCallbacks([loadItem]);
            loadItem.dispose();
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
                this.loadDict[loadItem.url] = loadItem;
                loadItem.completeCallbacks = loadItem.completeCallbacks.concat(item.completeCallbacks);
                loadItem.progressCallbacks = loadItem.progressCallbacks.concat(item.progressCallbacks);
                loadItem.errorCallbacks = loadItem.errorCallbacks.concat(item.errorCallbacks);
                item.dispose();
            }
        }
        this.loadNext();
        return loadItem;
    }

    private loadNext(): void {
        if (this.curLoaderArr.length >= this.maxLoadCount) {
            return;
        }
        for (var i = LoadPriority.LV_0; i <= LoadPriority.LV_4; i++) {
            var items: Array<LoadItem> = this.loadPriorityDict[i];
            while (items.length > 0) {
                var item = items[0];
                items.splice(0, 1);

                // 内存已存在资源
                var asset: IAsset = AssetManager.inst.getAsset(item.url);
                if (asset != null) {
                    item.asset = asset;
                    this.endLoad(item);
                } else {
                    // 不存在该资源，下载
                    this.startLoad(item);
                    if (this.curLoaderArr.length >= this.maxLoadCount) {
                        return;
                    }
                }
            }
        }
    }

    private startLoad(loadItem: LoadItem): void {
        loadItem.isLoading = true;
        var loader: ILoader = LoaderFactory.createLoader(loadItem.url, loadItem.loadType, loadItem.loadParams);
        loader.completeCallback = Handler.create(this.onLoadComplete, this);
        loader.progressCallback = Handler.create(this.onLoadProgress, this, null, false);
        loader.errorCallback = Handler.create(this.onLoadError, this);
        loadItem.loader = loader;

        this.curLoaderArr.push(loader);
        loader.start();
    }

    private onLoadComplete(loader: ILoader): void {
        var loadItem: LoadItem = this.loadDict[loader.url];
        if (loader.asset != null) {
            loadItem.asset = loader.asset;
            // TODO 缓存资源
        }
        // 从当前下载列表中移除加载器
        if (this.curLoaderArr.indexOf(loader) != -1) {
            ArrayUtil.removeItems(this.curLoaderArr, loader);
            ObjectPoolManager.inst.releaseObject(loader);
        }
        // 处理加载项
        loadItem.runCompleteCallbacks([loadItem]);
        this.endLoad(loadItem);
        loadItem.dispose();

        this.loadNext();
    }

    private onLoadProgress(loader: ILoader): void {
        var loadItem: LoadItem = this.loadDict[loader.url];
        if (loadItem) {
            loadItem.runCompleteCallbacks([loadItem]);
        }
    }

    private onLoadError(loader: ILoader): void {
        var loadItem: LoadItem = this.loadDict[loader.url];
        // 从当前下载列表中移除下载项
        if (this.curLoaderArr.indexOf(loader) != -1) {
            ArrayUtil.removeItems(this.curLoaderArr, loader);
            ObjectPoolManager.inst.releaseObject(loader);
        }
        // 处理加载项
        loadItem.error = loader.error;
        loadItem.runErrorCallbacks([loadItem]);
        this.endLoad(loadItem);
        loadItem.dispose();

        this.loadNext();
    }

    private endLoad(loadItem: LoadItem): void {
        // 释放loadItem
        if (this.loadDict[loadItem.url] != null) {
            delete this.loadDict[loadItem.url];
        }
    }

    public isLoading(url: string): boolean {
        return this.loadDict[url] != null;
    }
}