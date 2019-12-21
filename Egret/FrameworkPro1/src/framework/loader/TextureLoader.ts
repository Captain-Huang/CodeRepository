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
        this.imageLoader.addEventListener(egret.Event.COMPLETE, this.onLoadCompleteCallback, this);
        this.imageLoader.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onLoadErrorCallback, this);
        this.imageLoader.load(this.url);
    }

    protected onLoadCompleteCallback(event: egret.Event): void {
        console.log("图片加载完成：" + this.url);
    }

    protected onLoadErrorCallback(event: egret.Event): void {
        this.executeLoad();
    }
}