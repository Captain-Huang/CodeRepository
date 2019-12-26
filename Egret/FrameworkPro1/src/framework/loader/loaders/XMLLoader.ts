/**
 * XML加载器
 */
class XMLLoader extends TextLoader {
    public constructor() {
        super();

        this.type = LoadType.XML;
    }

    /**
     * 执行下载完成，解析数据，子类重写
     */
    protected invokeCompleteLoad(): void {
        // 数据解析
        this.data = egret.XML.parse(this.urlLoader.data);
    }
}