/**
 * 事件处理器类
 */
class Handler {
    /**  handler对象池 */
    protected static _pool: Array<Handler> = [];
    private static _uid: number = 0;

    /**  执行域(this) */
    private thisObj: Object;
    /**  处理方法 */
    private callback: Function;
    /**  参数 */
    private args: Array<any>;
    /** 是否只执行一次。如果为true，回调后执行recover()进行回收，回收后会被再利用，默认为false */
    private once: boolean = false;

    private _id: number = 0;

    public constructor(callback: Function, thisObj: any, args: Array<any> = null, once: boolean = false) {
        this.setTo(callback, thisObj, args, once);
    }

    public static create(callback: Function, thisObj: any, args: Array<any> = null, once: boolean = false): Handler {
        if (Handler._pool.length > 0) {
            return (Handler._pool.pop() as Handler).setTo(callback, thisObj, args, once);
        }
        return new Handler(callback, thisObj, args, once);
    }

    public run(): any {
        if (this.callback != null) {
            var id: number = this._id;
            var result: any = this.callback.apply(this.thisObj, this.args);
            id === this._id && this.once && this.recover();
            return result;
        }
        return null;
    }

    public runWith(data: any): any {
        if (this.callback != null) {
            var id: number = this._id;
            if (data == null) {
                var result: any = this.callback.apply(this.thisObj, this.args);
            } else if (!this.args && !data.unshift) {
                result = this.callback.call(this.thisObj, data);
            } else if (this.args) {
                result = this.callback.apply(this.thisObj, this.args.concat(data));
            } else {
                result = this.callback.apply(this.thisObj, data);
            }
            this._id === id && this.once && this.recover();
            return result;
        }
        return null;
    }

    /**
     * 设置属性
     */
    private setTo(callback: Function, thisObj: any, args: Array<any> = null, once: boolean = false): Handler {
        this._id = ++Handler._uid;
        this.callback = callback;
        this.thisObj = thisObj;
        this.args = args;
        this.once = once;
        return this;
    }

    /**
     * 清理对象引用
     */
    public clear(): Handler {
        this.callback = null;
        this.thisObj = null;
        this.args = null;
        return this;
    }

    /**
     * 放回对象池
     */
    public recover(): void {
        if (this._id > 0) {
            this._id = 0;
            Handler._pool.push(this.clear());
        }
    }
}