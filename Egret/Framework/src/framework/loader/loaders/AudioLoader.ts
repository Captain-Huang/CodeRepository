/**
 * 音频加载器
 */
class AudioLoader extends DataLoader {
    public constructor() {
        super();

        this.type = LoadType.AUDIO;
        this.setDataFormat(egret.URLLoaderDataFormat.SOUND);
    }

    /**
     * 执行下载完成，解析数据，子类重写
     */
    protected invokeCompleteLoad(): void {
        // 数据解析
        this.data = this.urlLoader.data as egret.Sound;
    }
}