/**
 * 下载队列
 */
class LoadQueue {

    public items: Array<LoadItem>;
    public needLoadItems: Array<LoadItem>;

    public completeCallback: Handler;
    public progressCallback: Handler;
    public errorCallback: Handler;

    private _onItemCompleteHandler: Handler;
    private _onItemProgressHandler: Handler;
    private _onItemErrorHandler: Handler;

    private _progress: number;
    private _error: string;
    private _currnetItem: LoadItem;

    public constructor(items: Array<LoadItem>, completeCallback: Handler = null, progressCallback: Handler = null, errorCallback: Handler = null) {
        this.items = items;
        this.completeCallback = completeCallback;
        this.progressCallback = progressCallback;
        this.errorCallback = errorCallback;

        this._onItemCompleteHandler = Handler.create(this.onItemComplete, this);
        this._onItemProgressHandler = Handler.create(this.onItemProgress, this);
        this._onItemErrorHandler = Handler.create(this.onItemError, this);
    }

    /**
     * 下载进度
     */
    public get progress(): number {
        return this._progress;
    }

    /**
     * 错误信息
     */
    public get error(): string {
        return this._error;
    }

    /**
     * 当前下载项
     */
    public currentItem(): LoadItem {
        return this._currnetItem;
    }

    /**
     * 下载
     */
    public load(): void {
        if (this.items == null || this.items.length == 0) {
            if (this.completeCallback != null) {
                this.completeCallback.run();
                return;
            }
        }

        this.needLoadItems = this.items.concat();

        for (var item of this.needLoadItems) {
            item.completeCallbacks.push(this._onItemCompleteHandler);
            item.progressCallbacks.push(this._onItemProgressHandler);
            item.errorCallbacks.push(this._onItemErrorHandler);
            App.loadManager.loadItem(item);
        }
    }

    private onItemComplete(item: LoadItem): void {
        this.removeLoadedItem(item);

        if (this.needLoadItems.length == 0) {
            if (this.completeCallback != null) {
                this.completeCallback.run();
            }
        }
    }

    private onItemProgress(item: LoadItem): void {
        this._currnetItem = item;

        this.setLoadItemProgress(item);

        var totalProgress: number = 0;
        for (var loadItem of this.items) {
            totalProgress += loadItem.progress;
        }

        this._progress = totalProgress / this.items.length;
        if (this.progressCallback != null) {
            this.progressCallback.run();
        }
    }

    private onItemError(item: LoadItem): void {
        this._error = item.error;

        if (this.errorCallback != null) {
            this.errorCallback.run();
        }
    }

    private setLoadItemProgress(item: LoadItem): void {
        for (var loadItem of this.needLoadItems) {
            if (loadItem.url == item.url) {
                loadItem.progress = item.progress;
            }
        }
    }

    private removeLoadedItem(item: LoadItem): void {
        for (var i = this.needLoadItems.length - 1; i >= 0; i--) {
            if (this.needLoadItems[i].url == item.url) {
                this.needLoadItems.splice(i, 1);
            }
        }
    }
}