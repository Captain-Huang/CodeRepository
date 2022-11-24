/**
 * 对象池
 */
class ObjectPool {
    public createCount: number;
    
    private _minimumNum: number;
    private _maximumNum: number;
    private _poolSize: number;
    private poolType: string;
    private poolClazz: { new (): IPoolObject };

    private _poolObjectStack: Array<IPoolObject>;

    public constructor(clazz: { new (): IPoolObject }, minimumNum: number = 0, maximumNum: number = Number.MAX_VALUE) {
        this._poolObjectStack = [];
        this._poolSize = 0;
        this.createCount = 0;
        this.poolType = egret.getQualifiedClassName(clazz);
        this.poolClazz = clazz;
        this.minimumNum = minimumNum;
        this.maximumNum = maximumNum;
    }

    /**
     * 获取池对象
     */
    public getObject(): IPoolObject {
        var obj:IPoolObject = this.dequeue();
        obj.onPoolGet();
        return obj;
    }

    /**
     * 将对象放入池
     */
    public releaseObject(obj: IPoolObject): void {
        if (this._poolSize == this._maximumNum) {
            obj.onPoolDispose();
        } else {
            this.enqueue(obj);
            obj.onPoolReset();
        }
    }

    /**
     * 清理对象池
     */
    public clear(): void {
        for (var obj of this._poolObjectStack) {
            obj.onPoolDispose();
        }
        this._poolObjectStack.length = 0;
        this._poolSize = 0;
        this.createCount = 0;
        this.adjustMinPoolSize();
    }

    /**
     * 设置池对象最小数量，当对象池创建时会自动填充最小数量的对象数
     */
    public set minimumNum(value: number) {
        this._minimumNum = value;
        this.adjustMinPoolSize();
    }

    public get minimumNum():number {
        return this._minimumNum;
    }

    /**
     * 设置池对象最大数量。当池对象达到最大数量时将不会再放入池，而是将对象销毁
     */
    public set maximumNum(value: number) {
        if (value <= this._minimumNum) {
            console.error("对象池最大对象数要比最小对象数大")
        }
        this._maximumNum = value;
        this.adjustMaxPoolSize();
    }

    public get maximumNum():number {
        return this._maximumNum;
    }

    /**
     * 池中对象数
     */
    public get poolSize():number {
        return this._poolSize;
    }

    public adjustMinPoolSize(): void {
        while (this._poolSize < this._minimumNum) {
            this.enqueue(this.createObj());
        }
    }

    public adjustMaxPoolSize(): void {
        while (this._poolSize > this._maximumNum) {
            this.dequeue().onPoolDispose();
        }
    }

    /**
     * 对象出队
     */
    private dequeue(): IPoolObject {
        var obj: IPoolObject;
        if (this._poolSize <= 0) {
            obj = this.createObj();
        } else {
            obj = this._poolObjectStack.pop();
            this._poolSize--;
        }
        return obj;
    }

    /**
     * 对象入队
     */
    private enqueue(obj: IPoolObject): void {
        if (this._poolSize == this._maximumNum) {
            obj.onPoolDispose();
            return;
        }
        this._poolSize++;
        this._poolObjectStack.push(obj);
    }

    /**
     * 创建对象
     */
    private createObj(): IPoolObject {
        this.createCount++;
        return new this.poolClazz();
    }
}