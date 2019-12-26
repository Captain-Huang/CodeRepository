/**
 * JSON加载器
 */
class JsonLoader extends TextLoader {
    public constructor() {
        super();

        this.type = LoadType.JSON;
    }

    /**
     * 执行下载完成，解析数据，子类重写
     */
    protected invokeCompleteLoad(): void {
        // 数据解析
        this.data = JSON.parse(this.urlLoader.data);
    }
}