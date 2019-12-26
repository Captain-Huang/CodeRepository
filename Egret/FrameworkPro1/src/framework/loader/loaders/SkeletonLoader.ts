/**
 * 骨骼动画加载器
 */
class SkeletonLoader extends AbstractLoader {
    private dbbinLoader: egret.URLLoader;
    private dbbinRequest: egret.URLRequest;
    private jsonLoader: egret.URLLoader;
    private jsonRequest: egret.URLRequest;
    private imageLoader: egret.ImageLoader;

    private dbbinData: any;
    private jsonData: any;

    public constructor() {
        super();

        this.type = LoadType.SKELETON;
        this.dbbinLoader = new egret.URLLoader();
        this.dbbinRequest = new egret.URLRequest();
        this.dbbinRequest.requestHeaders = [UrlUtil.urlRequestHeader];

        this.jsonLoader = new egret.URLLoader();
        this.jsonRequest = new egret.URLRequest();
        this.jsonRequest.requestHeaders = [UrlUtil.urlRequestHeader];

        this.imageLoader = new egret.ImageLoader();
    }

    /**
     * 执行开始下载
     */
    protected invokeStartLoad(): void {
        this.dbbinRequest.url = UrlUtil.formatUrl(this.url + "_ske.dbbin");
        this.dbbinLoader.addEventListener(egret.Event.COMPLETE, this.onDBBinLoadCompleteCallback, this);
        this.dbbinLoader.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onIOErrorCallback, this);
        this.dbbinLoader.load(this.dbbinRequest);
    }

    private onDBBinLoadCompleteCallback(event: egret.Event): void {
        this.dbbinData = this.dbbinLoader.data;

        this.jsonRequest.url = UrlUtil.formatUrl(this.url + "_tex.json");
        this.jsonLoader.addEventListener(egret.Event.COMPLETE, this.onJsonLoadCompleteCallback, this);
        this.jsonLoader.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onIOErrorCallback, this);
        this.dbbinLoader.load(this.jsonRequest);
    }

    private onIOErrorCallback(event: egret.IOErrorEvent): void {
        this.error = "ioError";
    }

    private onJsonLoadCompleteCallback(event: egret.Event): void {
        this.jsonData = this.jsonLoader.data;

        this.imageLoader.addEventListener(egret.Event.COMPLETE, this.onImageLoadCompleteCallback, this);
        this.imageLoader.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onIOErrorCallback, this);
        this.imageLoader.addEventListener(egret.ProgressEvent.PROGRESS, this.onLoadProgressCallback, this);
        this.imageLoader.load(UrlUtil.formatUrl(this.url + "_tex.png"));
    }

    private onImageLoadCompleteCallback(event: egret.Event): void {
        // 数据解析
        var tex: egret.Texture = new egret.Texture();
        tex.bitmapData = this.imageLoader.data;
        var name: string = this.url.substring(this.url.lastIndexOf("/") + 1);
        var skeleton: any = this.dbbinData;
        var atlas: any = JSON.parse(this.jsonData);

        // var skeletonData:SkeletonData = ObjectPoolManager.inst.getObject(SkeletonData) as SkeletonData;
        // skeletonData.init(name, skeleton, atlas, texture);
        // this.data = skeletonData;

        this.complete();
    }

    private onLoadProgressCallback(event: egret.ProgressEvent): void {
        this.updateProgress(event.bytesLoaded, event.bytesTotal);
    }

    /**
     * 执行停止下载，子类重写
     */
    protected invokeStopLoad(): void {
        this.dbbinLoader.removeEventListener(egret.Event.COMPLETE, this.onDBBinLoadCompleteCallback, this);
        this.dbbinLoader.removeEventListener(egret.IOErrorEvent.IO_ERROR, this.onIOErrorCallback, this);
        this.jsonLoader.removeEventListener(egret.Event.COMPLETE, this.onJsonLoadCompleteCallback, this);
        this.jsonLoader.removeEventListener(egret.IOErrorEvent.IO_ERROR, this.onIOErrorCallback, this);
        this.imageLoader.removeEventListener(egret.Event.COMPLETE, this.onImageLoadCompleteCallback, this);
        this.imageLoader.removeEventListener(egret.IOErrorEvent.IO_ERROR, this.onIOErrorCallback, this);
        this.imageLoader.removeEventListener(egret.ProgressEvent.PROGRESS, this.onLoadProgressCallback, this);
    }

    /**
     * 执行下载完成，解析数据，子类重写
     */
    protected invokeCompleteLoad(): void {

    }

    public dispose(): void {
        super.dispose();
        this.dbbinLoader = null;
        this.dbbinRequest = null;
        this.jsonLoader = null;
        this.jsonRequest = null;
        this.imageLoader = null;
    }
}