/**
 * 下载器基类
 */
class AbstractLoader implements ILoader {

    // 下载器回调，当下载完成后回调
    public completeCallback: Handler;
    public progressCallback: Handler;
    public errorCallback: Handler;

    public url: string;
    public asset: IAsset;
    public retryCount: number;
    public error: string;

    protected data: any;
    protected type: LoadType;

    private state: LoadState;
    private loadParams: Object;

    public constructor() {
        this.state = LoadState.STOPED;
        this.type = LoadType.AUTO;
        this.retryCount = 0;
        this.loadParams = {};
    }

    public initParams(): void {
        this.setParam(LoadParam.RETRY_COUNT, 2);
    }

    public setParam(id: string, param: any): void {
        this.loadParams[id] = param;
    }

    public getParam(id: string): any {
        return this.loadParams[id];
    }

    public addParam(param: LoadParam): void {
        this.setParam(param.id, param.value);
    }

    /**
     * 开始下载
     */
    public start(url?: string): void {
        if (url != null) {
            // url赋值有两种方式，一种是给成员变量url赋值，移植是通用此函数传参赋值
            this.url = url;
        }
        // 如果正在下载，需要暂停下载
        if (this.state != LoadState.STOPED) {
            this.stop();
        }
        this.state = LoadState.STARTED;
        this.invokeStartLoad();
    }

    /**
     * 下载完毕
     */
    public complete(): void {
        if (this.progressCallback != null) {
            this.progressCallback.recover();
        }
        this.invokeCompleteLoad();
        this.invokeStopLoad();
        // 处理数据
        if (this.data != null) {
            this.asset = AssetFactory.createAsset(this.type, this.data);
        }
        if (this.completeCallback != null) {
            this.completeCallback.runWith(this);
        }
    }

    public loadError(): void {
        if (this.retry() == false) {
            if (this.errorCallback != null) {
                this.errorCallback.runWith(this);
            }
        }
    }

    /**
     * 更新下载进度
     */
    protected updateProgress(bytesLoaded: number, bytesTotal: number): void {
        if (this.progressCallback != null) {
            this.progressCallback.runWith(this);
        }
    }

    /**
     * 停止下载
     */
    public stop(): void {
        this.state = LoadState.STOPED;
        this.invokeStopLoad();
    }

    /**
     * 重试
     */
    public retry(): boolean {
        var retryCount: number = this.loadParams[LoadParam.RETRY_COUNT] as number;
        if (isNaN(retryCount) == false && this.retryCount < retryCount) {
            this.stop();
            this.retryCount++;
            this.start();
            return true;
        }
        return false;
    }

    /**
     * 执行开始下载，子类重写
     */
    protected invokeStartLoad(): void {

    }

    /**
     * 执行下载完成，解析数据，子类重写
     */
    protected invokeCompleteLoad(): void {

    }

    /**
     * 执行停止下载，子类重写
     */
    protected invokeStopLoad(): void {

    }

    public reset(): void {
        this.stop();
        ObjectUtil.clear(this.loadParams);
        this.initParams();
        this.retryCount = 0;
        this.url = "";
        this.asset = null;
        this.data = null;
        this.error = "";

        this.completeCallback = null;
        this.progressCallback = null;
        this.errorCallback = null;
    }

    public dispose(): void {
        this.stop();
        this.loadParams = null;
        this.retryCount = 0;
        this.url = null;
        this.asset = null;
        this.data = null;
        this.error = null;
        this.state = null;
        this.type = null;

        this.completeCallback = null;
        this.progressCallback = null;
        this.errorCallback = null;
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
        this.reset();
    }

    /**
     * 销毁
     */
    onPoolDispose(): void {
        this.dispose();
    }
}