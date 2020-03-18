/**
 * 数据表管理类
 */
class TableManager {
    private static _inst:TableManager;

    public static get inst(): TableManager {
        if (!this._inst) {
            this._inst = new TableManager();
        }
        return this._inst;
    }

 
}

function getTable(tableName:string, id:any):ITable {
    return new WindowCFG();
}

function getTables(tableName:string):Object {
    return null;
}