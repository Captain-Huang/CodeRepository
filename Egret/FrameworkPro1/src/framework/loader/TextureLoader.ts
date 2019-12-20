/**
 * 纹理加载器
 */
class TextureLoader extends AbstractLoader {
    private imageLoader: egret.ImageLoader;

    public constructor() {
        super();
        this.imageLoader = new egret.ImageLoader();
    }

    protected executeLoad(): void {
        super.executeLoad();
        this.imageLoader.addEventListener(egret.Event.COMPLETE, this.loadCompleteCallback, this);
        this.imageLoader.addEventListener(egret.IOErrorEvent.IO_ERROR, this.loadErrorCallback, this);
        this.imageLoader.load(this.url);
    }

    protected loadCompleteCallback(event: egret.Event): void {
        super.loadCompleteCallback(event);
        console.log("图片加载完成：" + this.url);
    }
}