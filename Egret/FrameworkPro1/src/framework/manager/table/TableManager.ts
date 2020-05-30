/**
 * 数据表管理类
 */
class TableManager extends Manager implements ITableManager {

    private _txtStructFolder: string;
    private _jsonStructFolder: string;
    private _xmlStructFolder: string;

    private _txtTables: Object;
    private _jsonTables: Object;
    private _xmlTables: Object;

    protected init(): void {
        this._txtTables = {};
        this._jsonTables = {};
        this._xmlTables = {};
    }


    /**
     * 文本结构目录
     */
    public get txtStructFolder(): string {
        return this._txtStructFolder;
    }

    public set txtStructFolder(value: string) {
        this._txtStructFolder = value;
    }

    /**
     * json结构目录
     */
    public get jsonStructFolder(): string {
        return this._jsonStructFolder;
    }

    public set jsonStructFolder(value: string) {
        this._jsonStructFolder = value;
    }

    /**
     * xml结构目录
     */
    public get xmlStructFolder(): string {
        return this._xmlStructFolder;
    }

    public set xmlStructFolder(value: string) {
        this._xmlStructFolder = value;
    }

    /**
     * 获取Txt数据表字典
     */
    public getTxtTables(name: string): Object {
        return this._txtTables[name];
    }

    /**
     * 获取Json数据表字典
     */
    public getJsonTables(name: string): Object {
        return this._jsonTables[name];
    }

    /**
     * 获取Xml数据表字典
     */
    public getXmlTables(name: string): Object {
        return this._xmlTables[name];
    }

    /**
     * 获取Txt数据表
     */
    public getTxtTable(name: string, id: any): ITxtTable {
        var dict: Object = this._txtTables[name];
        if (dict != null) {
            return dict[id];
        }
        return null;
    }

    /**
     * 获取Json数据表
     */
    public getJsonTable(name: string, id: any): IJSONTable {
        var dict: Object = this.getJsonTables(name);
        if (dict != null) {
            return dict[id];
        }
        return null;
    }

    /**
     * 获取Xml数据表
     */
    public getXmlTable(name: string, id: any): IXMLTable {
        var dict: Object = this.getXmlTables(name);
        if (dict != null) {
            return dict[id];
        }
        return null;
    }

    /**
     * 注册txt数据表
     */
    public registerTxtTables(name: string, text: string): void {
        if (this._txtStructFolder == null) {
            App.logManager.error("TableManager.registerTxtTables Error:TxtStructFolder has not set!");
            return;
        }
        var clazz: any = egret.getDefinitionByName(this._txtStructFolder + name);
        if (clazz == null) {
            return;
        }

        var dict: Object = this._txtTables[name];
        if (dict == null) {
            dict = this._txtTables[name] = {};
        }
        var tableLines: Array<string> = text.split("\r\n");
        var length: number = tableLines.length;
        for (var i = 0; i < length; i++) {
            var line: string = tableLines[i];
            if (line == "") {
                App.logManager.error("TableManager.registerTxtTables Error:Table " + name + " line " + (i + 1) + " is empty!");
                continue;
            }
            var table: ITxtTable = new clazz();
            var id: any = table.fillData(line.split("\t"));
            table.initData();
            dict[id] = table;
        }
    }

    /**
     * 注册Json数据表
     */
    public registerJsonTables(name: string, text: string): void {
        if (this._jsonStructFolder == null) {
            App.logManager.error("TableManager.registerJsonTables Error:JsonStructFolder has not set!");
            return;
        }

        var clazz: any = egret.getDefinitionByName(this._jsonStructFolder + name);
        if (clazz == null) {
            return;
        }

        var dict: Object = this._jsonTables[name];
        if (dict == null) {
            dict = this._jsonTables[name] = {};
        }

        var table: IJSONTable = new clazz();
        var id: any = table.fillData(text);
        table.initData();
        dict[id] = table;
    }

    /**
     * 注册Xml数据表
     */
    public registerXmlTables(name: string, text: string): void {
        if (this._xmlStructFolder == null) {
            App.logManager.error("TableManager.registerXmlTables Error:XmlStructFolder has not set!");
            return;
        }

        var clazz: any = egret.getDefinitionByName(this._xmlStructFolder + name);
        if (clazz == null) {
            return;
        }

        var dict: Object = this._xmlTables[name];
        if (dict == null) {
            dict = this._xmlTables[name] = {};
        }

        var table: IXMLTable = new clazz();
        var id: any = table.fillData(text);
        table.initData();
        dict[id] = table;
    }

    /**
     * 注销Txt数据表
     */
    public unregisterTxtTable(name: string, id: any): void {
        var dict: Object = this._txtTables[name];
        if (dict != null) {
            delete dict[id];
        }
    }

    /**
     * 注销Json数据表
     */
    public unregisterJsonTable(name: string, id: any): void {
        var dict: Object = this._jsonTables[name];
        if (dict != null) {
            delete dict[id];
        }
    }

    /**
     * 注销Xml数据表
     */
    public unregisterXmlTable(name: string, id: any): void {
        var dict: Object = this._xmlTables[name];
        if (dict != null) {
            delete dict[id];
        }
    }
}

function getTable(tableName: string, id: any): ITxtTable {
    return App.tableManager.getTxtTable(tableName, id);
}

function getTables(tableName: string): Object {
    return App.tableManager.getTxtTables(tableName);
}