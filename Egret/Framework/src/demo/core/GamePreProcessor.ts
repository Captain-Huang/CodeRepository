/**
 * 游戏预处理器
 */
class GamePreProcessor {
    /**
     * 初始化
     */
    public static init(): void {
        GamePreProcessor.initData();
    }

    /**
     * 初始化数据
     */
    private static initData(): void {
        GamePreProcessor.initTable();
    }

    /**
     * 初始化表数据
     */
    private static initTable(): void {
        var zip: JSZip = new JSZip(RES.getRes("table_byte"));
        var zipFiles: any = zip["files"];
        for (var key in zipFiles) {
            var name: string = key.substr(0, key.indexOf("."));
            var data: string = zipFiles[key].asText();
            App.tableManager.registerTxtTables(name, data);
        }
        RES.destroyRes("table_byte");
    }
}