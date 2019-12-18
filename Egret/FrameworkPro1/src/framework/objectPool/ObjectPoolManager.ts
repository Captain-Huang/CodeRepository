/**
 * 对象池管理类
 */
class ObjectPoolManager {
    private static _inst: ObjectPoolManager;
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

    /**
     * 从池中取出对象
     */
    public getObject(clazz: any): IPoolObject {
        return this.getObjectPool(clazz).getObject();
    }

    /**
     * 将对象放入池
     */
    public releaseObject(obj: IPoolObject): void {
        this.getObjectPool(obj).releaseObject(obj);
    }

    /**
     * 获取对象池
     */
    public getObjectPool(clazz: any): ObjectPool {
        var type:string = egret.getQualifiedClassName(clazz);
        var pool:ObjectPool = this._poolDict[type];
        if (!pool) {
            pool = this._poolDict[type] = this.registerObjectPool(clazz);
        }
        return pool;
    }

    /**
     * 注册对象池
     */
    public registerObjectPool(clazz: any, minimum: number = 0, maximun:number = IntUtil.MAX_VALUE): ObjectPool {
        var type:string = egret.getQualifiedClassName(clazz);
        var pool:ObjectPool = this._poolDict[type];
        if (!pool) {
            pool = this._poolDict[type] = new ObjectPool(clazz, minimum, maximun);
        } else {
            console.error("对象池已经存在，无需注册");
        }
        return pool;
    }

    /**
     * 注销对象池
     */
    public unRegisterObjectPool(clazz: any): void {
        var type:string = egret.getQualifiedClassName(clazz);
        var pool:ObjectPool = this._poolDict[type];
        if (!pool) {
            pool.clear();
            pool = null;
        }
    }
}