/**
 * 二进制流加载器
 */
class BinaryLoader extends DataLoader {
    public constructor() {
        super();

        this.type = LoadType.BINARY;
        this.setDataFormat(egret.URLLoaderDataFormat.BINARY);
    }

    /**
     * 执行下载完成，解析数据，子类重写
     */
    protected invokeCompleteLoad(): void {
        // 数据解析
        this.data = new egret.ByteArray(this.urlLoader.data);
    }
}