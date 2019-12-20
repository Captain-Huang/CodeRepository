/**
 * 下载项
 */
class LoadItem implements IPoolObject {
    public url: string;
    public loadPriority: LoadPriority;
    public loadType: LoadType;
    public asset: IAsset;
    // 下载项回调，当下载的资源赋值完成后调用
    public completeCallbacks: Array<Handler>;
    public progressCallbacks: Array<Handler>;
    public errorCallbacks: Array<Handler>

    public constructor() {
        this.completeCallbacks = [];
        this.progressCallbacks = [];
        this.errorCallbacks = [];
    }

    public runCompleteCallbacks(): void {
        for (var callback of this.completeCallbacks) {
            callback.run();
        }
    }

    public runProgressCallbacks(): void {
        for (var callback of this.progressCallbacks) {
            callback.run();
        }
    }

    public runErrorCallbacks(): void {
        for (var callback of this.errorCallbacks) {
            callback.run();
        }
    }

    /**
     * 取出
     */
    onPoolGet(): void {

    }

    /**
     * 放入池时重置
     */
    onPoolReset(): void {
        this.url = null;
        this.loadPriority = null;
        this.loadType = null;
        this.asset = null;
        for (var callback of this.completeCallbacks) {
            callback.recover();
        }
        for (var callback of this.progressCallbacks) {
            callback.recover();
        }
        for (var callback of this.errorCallbacks) {
            callback.recover();
        }
        this.completeCallbacks.length = 0;
        this.progressCallbacks.length = 0;
        this.errorCallbacks.length = 0;
    }

    /**
     * 销毁
     */
    onPoolDispose(): void {

    }
}