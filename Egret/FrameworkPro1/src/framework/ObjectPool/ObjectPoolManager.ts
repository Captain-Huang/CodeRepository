
class ObjectPoolManager {
    public static _inst: ObjectPoolManager;
    private _poolDict: Object;

    public constructor() {
        this._poolDict = {};
    }

    static get inst(): ObjectPoolManager {
        if (!this._inst) {
            this._inst = new ObjectPoolManager();
        }
        return this._inst;
    }

    public getObject(clazz: any): IPoolObject {
        return this.getOjbectPool(clazz).getObject();
    }

    public releaseObject(obj: IPoolObject): void {
        this.getOjbectPool(obj).releaseObject(obj);
    }

    public getOjbectPool(clazz: any): ObjectPool {
        var type:string = egret.getQualifiedClassName(clazz);
        var pool:ObjectPool = this._poolDict[type];
        if (!pool) {
            pool = this._poolDict[type] = this.registerObjectPool(clazz);
        }
        return pool;
    }

    public registerObjectPool(clazz: any, minimum: number = 0, maximun:number = IntUtil.MAX_VALUE): ObjectPool {
        var type:string = egret.getQualifiedClassName(clazz);
        var pool:ObjectPool = this._poolDict[type];
        if (!pool) {
            this._poolDict[clazz] = new ObjectPool(clazz, minimum, maximun);
        }
        return pool;
    }

    public unRegisterObjectPool(clazz: any): void {
        var type:string = egret.getQualifiedClassName(clazz);
        var pool:ObjectPool = this._poolDict[type];
        if (!pool) {
            pool.clear();
            pool = null;
        }
    }
}