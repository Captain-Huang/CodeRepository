/**
 * 纹理加载器
 */
class TextureAtlasLoader extends AbstractLoader {
    private textLoader: egret.URLLoader;
    private textRequest: egret.URLRequest;
    private imageLoader: egret.ImageLoader;

    private atlas: any;

    public constructor() {
        super();

        this.type = LoadType.TEXTURE_ATLAS;
        this.textLoader = new egret.URLLoader();
        this.textRequest = new egret.URLRequest();
        this.textRequest.requestHeaders = [UrlUtil.urlRequestHeader];

        this.imageLoader = new egret.ImageLoader();
    }

    /**
     * 执行开始下载
     */
    protected invokeStartLoad(): void {
        this.textRequest.url = UrlUtil.formatUrl(this.url + "_txt.txt");
        this.textLoader.addEventListener(egret.Event.COMPLETE, this.onTextLoadCompleteCallback, this);
        this.textLoader.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onIOErrorCallback, this);
        this.textLoader.load(this.textRequest);
    }

    private onTextLoadCompleteCallback(event: egret.Event): void {
        this.atlas = this.textLoader.data;

        this.imageLoader.addEventListener(egret.Event.COMPLETE, this.onImageLoadCompleteCallback, this);
        this.imageLoader.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onIOErrorCallback, this);
        this.imageLoader.addEventListener(egret.ProgressEvent.PROGRESS, this.onLoadProgressCallback, this);
        this.imageLoader.load(UrlUtil.formatUrl(this.url + "_tex.png"))
    }

    private onIOErrorCallback(event: egret.IOErrorEvent): void {
        this.error = "ioError";
    }

    private onImageLoadCompleteCallback(event: egret.Event): void {
        // 数据解析
        var tex: egret.Texture = new egret.Texture();
        tex.bitmapData = this.imageLoader.data;

        // var textureAtlas: TextureAtlas = ObjectPoolManager.inst.getObject(TextureAtlas) as TextureAtlas;
        // textureAtlas.name = UrlUtil.getFileName(this._url);
        // textureAtlas.initFromText(this.atlas, tex);
        // this.data = textureAtlas;
        this.complete();
    }

    private onLoadProgressCallback(event: egret.ProgressEvent): void {
        this.updateProgress(event.bytesLoaded, event.bytesTotal);
    }

    /**
     * 执行停止下载，子类重写
     */
    protected invokeStopLoad(): void {
        this.textLoader.removeEventListener(egret.Event.COMPLETE, this.onTextLoadCompleteCallback, this);
        this.textLoader.removeEventListener(egret.IOErrorEvent.IO_ERROR, this.onIOErrorCallback, this);
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
        this.textLoader = null;
        this.textRequest = null;
        this.imageLoader = null;
    }
}