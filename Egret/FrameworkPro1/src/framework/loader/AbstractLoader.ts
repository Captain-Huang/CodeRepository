/**
 * 下载器基类
 */
class AbstractLoader implements ILoader {

    // 下载器回调，当下载完成后回调
    public completeCallback: Handler;
    public progressCallback: Handler;
    public errorCallback: Handler;
    public url: string;

    public constructor() {

    }

    /**
     * 开始下载
     */
    public start(): void {
        this.executeLoad();
    }


    /**
     * 执行下载
     */
    protected executeLoad(): void {

    }

    protected loadCompleteCallback(event: egret.Event): void {
        if (this.completeCallback != null) {
            this.completeCallback.runWith(this.url);
        }
    }

    protected loadProgressCallback(event: egret.Event): void {
        if (this.progressCallback != null) {
            this.progressCallback.run();
        }
    }

    protected loadErrorCallback(event: egret.Event): void {
        if (this.errorCallback != null) {
            this.errorCallback.run();
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

    }

    /**
     * 销毁
     */
    onPoolDispose(): void {

    }
}