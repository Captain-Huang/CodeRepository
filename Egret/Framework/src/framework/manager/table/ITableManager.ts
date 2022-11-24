/**
 * 数据表管理器接口
 */
interface ITableManager extends IManager {
    /**
     * 文本结构目录
     */
    txtStructFolder: string;

    /**
     * json结构目录
     */
    jsonStructFolder: string;

    /**
     * xml结构目录
     */
    xmlStructFolder: string;

    /**
     * 获得txt数据表字典
     */
    getTxtTables(name: string): Object;

    /**
     * 获取Json数据表字典
     */
    getJsonTables(name: string): Object;

    /**
     * 获取Xml数据表字典
     */
    getXmlTables(name: string): Object;

    /**
     * 获取Txt数据表
     */
    getTxtTable(name: string, id: any): any;

    /**
     * 获取Json数据表
     */
    getJsonTable(name: string, id: any): any;

    /**
     * 获取Xml数据表
     */
    getXmlTable(name: string, id: any): any;

    /**
     * 注册Txt数据表
     */
    registerTxtTables(name: string, text: string): void;

    /**
     * 注册Json数据表
     */
    registerJsonTables(name: string, text: string): void;

    /**
     * 注册Xml数据表
     */
    registerXmlTables(name: string, text: string): void;
}