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

    /**
     * 下载完成执行回调
     */
    protected executeLoadComplete(): void {
        if (this.completeCallback != null) {
            this.completeCallback.runWith(this);
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