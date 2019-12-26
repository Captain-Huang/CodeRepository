/**
 * 数据加载器
 */
class DataLoader extends AbstractLoader {
    protected urlLoader: egret.URLLoader;
    protected urlRequest: egret.URLRequest;

    public constructor() {
        super();
        this.type = LoadType.TEXTURE;
        this.urlLoader = new egret.URLLoader();
        this.urlRequest = new egret.URLRequest();
        this.urlRequest.requestHeaders = [UrlUtil.urlRequestHeader];
    }

    /**
     * 设置数据格式
     */
    public setDataFormat(format: string): void {
        this.urlLoader.dataFormat = format;
    }

    /**
     * 执行开始下载
     */
    protected invokeStartLoad(): void {
        this.urlRequest.url = UrlUtil.formatUrl(this.url);
        this.urlLoader.addEventListener(egret.Event.COMPLETE, this.onImageLoadCompleteCallback, this);
        this.urlLoader.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onLoadErrorCallback, this);
        this.urlLoader.addEventListener(egret.ProgressEvent.PROGRESS, this.onLoadProgressCallback, this);
        this.urlLoader.load(this.urlRequest);
    }

    /**
     * 执行停止下载，子类重写
     */
    protected invokeStopLoad(): void {
        this.urlLoader.removeEventListener(egret.Event.COMPLETE, this.onImageLoadCompleteCallback, this);
        this.urlLoader.removeEventListener(egret.IOErrorEvent.IO_ERROR, this.onLoadErrorCallback, this);
        this.urlLoader.removeEventListener(egret.ProgressEvent.PROGRESS, this.onLoadProgressCallback, this);
    }

    /**
     * 执行下载完成，解析数据，子类重写
     */
    protected invokeCompleteLoad(): void {
        // 数据解析
        this.data = this.urlLoader.data;
    }

    private onImageLoadCompleteCallback(event: egret.Event): void {
        this.complete();
    }

    private onLoadErrorCallback(event: egret.IOErrorEvent): void {
        this.error = "ioError";
    }

    private onLoadProgressCallback(event: egret.ProgressEvent): void {
        this.updateProgress(event.bytesLoaded, event.bytesTotal);
    }

    public dispose(): void {
        super.dispose();

        this.urlLoader = null;
        this.urlRequest = null;
    }
}