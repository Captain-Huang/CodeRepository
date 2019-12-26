/**
 * 纹理加载器
 */
class TextureLoader extends AbstractLoader {
    private imageLoader: egret.ImageLoader;

    public constructor() {
        super();
        this.type = LoadType.TEXTURE;
        this.imageLoader = new egret.ImageLoader();        
    }

    /**
     * 执行开始下载
     */
    protected invokeStartLoad(): void {
        this.imageLoader.addEventListener(egret.Event.COMPLETE, this.onImageLoadCompleteCallback, this);
        this.imageLoader.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onLoadErrorCallback, this);
        this.imageLoader.addEventListener(egret.ProgressEvent.PROGRESS, this.onLoadProgressCallback, this);
        this.imageLoader.load(this.url);
    }

    /**
     * 执行下载完成，解析数据，子类重写
     */
    protected invokeCompleteLoad(): void {
        // 数据解析
        this.data = this.imageLoader.data;
    }

    /**
     * 执行停止下载，子类重写
     */
    protected invokeStopLoad(): void {
        this.imageLoader.removeEventListener(egret.Event.COMPLETE, this.onImageLoadCompleteCallback, this);
        this.imageLoader.removeEventListener(egret.IOErrorEvent.IO_ERROR, this.onLoadErrorCallback, this);
        this.imageLoader.removeEventListener(egret.ProgressEvent.PROGRESS, this.onLoadProgressCallback, this);
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

    public dispose():void {
        super.dispose();
        this.imageLoader = null;
    }
}