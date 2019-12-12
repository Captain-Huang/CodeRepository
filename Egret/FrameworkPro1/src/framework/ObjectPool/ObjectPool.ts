
class ObjectPool {
    private _minimumNum: number;
    private _maximumNum: number;
    private poolSize: number;
    private createCount: number;
    private poolType: string;
    private poolClazz: { new (): IPoolObject };

    private _poolObjectStack: Array<IPoolObject>;

    public constructor(clazz: { new (): IPoolObject }, minimumNum: number = 0, maximumNum: number = Number.MAX_VALUE) {
        this._poolObjectStack = [];
        this.poolSize = 0;
        this.createCount = 0;
        this.poolType = egret.getQualifiedClassName(clazz);
        this.poolClazz = clazz;
        this.minimumNum = minimumNum;
        this.maximumNum = maximumNum;
    }

    public getObject(): IPoolObject {
        var obj:IPoolObject = this.dequeue();
        obj.onPoolGet();
        return obj;
    }

    public releaseObject(obj: IPoolObject): void {
        if (this.poolSize == this._maximumNum) {
            obj.onPoolDispose();
        } else {
            this.enqueue(obj);
        }
    }

    public clear(): void {
        for (var obj of this._poolObjectStack) {
            obj.onPoolDispose();
        }
        this._poolObjectStack.length = 0;
        this.poolSize = 0;
        this.createCount = 0;
        this.adjustPoolSize();
    }

    public set minimumNum(value: number) {
        this._minimumNum = value;
        this.adjustPoolSize();
    }

    public set maximumNum(value: number) {
        this._maximumNum = value;
    }

    public adjustPoolSize(): void {
        while (this.poolSize < this._minimumNum) {
            this.enqueue(this.createObj());
        }
    }

    private dequeue(): IPoolObject {
        var obj: IPoolObject;
        if (this.poolSize <= this._minimumNum) {
            obj = new this.poolClazz();
        } else {
            obj = this._poolObjectStack.pop();
            this.poolSize--;
        }
        return obj;
    }

    private enqueue(obj: IPoolObject): void {
        if (this.poolSize == this._maximumNum) {
            return;
        }
        this.poolSize++;
        this._poolObjectStack.push(obj);
        obj.onPoolReset();
    }

    private createObj(): IPoolObject {
        this.createCount++;
        return new this.poolClazz();
    }
}