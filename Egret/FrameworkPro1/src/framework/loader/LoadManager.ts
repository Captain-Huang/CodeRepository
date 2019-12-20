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
            // 下载队列中存在此下载项
            var loader: ILoader = LoaderFactory.createLoader(loadItem.url, loadItem.loadType);
            loader.completeCallback = Handler.create(this.onLoadComplete, this);
            loader.progressCallback = Handler.create(this.onLoadProgress, this);
            loader.errorCallback = Handler.create(this.onLoadError, this);
            this.loadDict[loadItem.url] = loader;
            var loaders: Array<ILoader> = this.loadPriorityDict[loadItem.loadPriority];
            if (loaders == null) {
                this.loadPriorityDict[loadItem.loadPriority] = loaders = [];
            }
            loaders.push(loader);
            this.loadNext(loadItem);
        }

        return loadItem;
    }

    public loadNext(loadItem: LoadItem): void {
        if (this.curLoaderArr.length >= this.maxLoadCount) {
            return;
        }
        for (var i = LoadPriority.LV_0; i <= LoadPriority.LV_4; i++) {
            var loaders = this.loadPriorityDict[i] as Array<ILoader>;
            while (loaders && loaders.length > 0) {
                var loader = loaders[0];
                this.curLoaderArr.push(loader);
                loader.start();
                if (this.curLoaderArr.length >= this.maxLoadCount) {
                    return;
                }
            }
        }
    }

    private onLoadComplete(event: egret.Event): void {
        var url = event.data as string;
        var loadItem: LoadItem = this.loadDict[url];
        this.endLoad(loadItem);

        this.loadNext(loadItem);
    }

    private onLoadProgress(event: egret.Event): void {

    }

    private onLoadError(event: egret.Event): void {
        var loadItem: LoadItem = event.data as LoadItem;

    }

    private endLoad(loadItem: LoadItem): void {
        // 释放loadItem 释放Loader
        var loader: any = this.loadDict[loadItem.url];
        if (loader) {
            delete this.loadDict[loadItem.url];
            var index: number = this.curLoaderArr.indexOf(loader);
            if (index != -1) {
                this.curLoaderArr.slice(index, index + 1);
            }
            var prioriryLoaderArr: Array<ILoader> = this.loadPriorityDict[loadItem.loadPriority];
            if (prioriryLoaderArr != null) {
                var priorityIndex: number = prioriryLoaderArr.indexOf(loader);
                if (priorityIndex != -1) {
                    prioriryLoaderArr.slice(priorityIndex, priorityIndex + 1);
                }
            }
            ObjectPoolManager.inst.releaseObject(loader);
        }
    }
}