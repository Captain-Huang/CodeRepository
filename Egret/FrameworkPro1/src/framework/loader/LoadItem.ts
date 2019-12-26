/**
 * 下载项
 */
class LoadItem {

    public url: string;
    public loadPriority: LoadPriority;
    public loadType: LoadType;
    public cache: boolean = false;
    public loadParams: Array<LoadParam>;

    public asset: IAsset;
    public loader: ILoader;
    public progress:number;
    public error: string;
    public isLoading: boolean;

    // 下载项回调，当下载的资源赋值完成后调用
    public completeCallbacks: Array<Handler>;
    public progressCallbacks: Array<Handler>;
    public errorCallbacks: Array<Handler>


    public constructor() {
        this.completeCallbacks = [];
        this.progressCallbacks = [];
        this.errorCallbacks = [];
        this.isLoading = false;
    }

    public runCompleteCallbacks(args: Array<any>): void {
        for (var callback of this.completeCallbacks) {
            callback.runWith(args);
        }
    }

    public runProgressCallbacks(args: Array<any>): void {
        for (var callback of this.progressCallbacks) {
            callback.runWith(args);
        }
    }

    public runErrorCallbacks(args: Array<any>): void {
        for (var callback of this.errorCallbacks) {
            callback.runWith(args);
        }
    }

    /**
     * 销毁
     */
    public dispose(): void {
        this.asset = null;
        this.loadParams = null;
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
        this.completeCallbacks = null;
        this.progressCallbacks.length = 0;
        this.progressCallbacks = null;
        this.errorCallbacks.length = 0;
        this.errorCallbacks = null;
    }
}