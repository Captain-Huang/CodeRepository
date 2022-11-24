/**
 * 文本加载器
 */
class TextLoader extends DataLoader {
    public constructor() {
        super();

        this.type = LoadType.TEXT;
        this.setDataFormat(egret.URLLoaderDataFormat.TEXT);
    }
}