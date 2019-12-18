/**
 * 计时器对象
 */
class TimerHandler implements IPoolObject {
    public isFrame: boolean = false;
    public delayTime: number;
    public curTime: number;
    public count: number;
    public args: Array<any>

    private _callback: Function;
    private _thisObj: any;

    private _hashCode: string;
    private _funcUid: string;
    private _thisObjUid: string;

    public get hashCode(): string {
        if (!this._hashCode) {
            this._hashCode = this._thisObjUid + "_" + this._funcUid;
        }
        return this._hashCode;
    }

    public set callback(value: Function) {
        if (value.hasOwnProperty("__uid") == false) {
            value["__uid"] = IntUtil.createUniqueInt().toString();
        }
        this._funcUid = value["__uid"];
        this._callback = value;
    }

    public get callback(): Function {
        return this._callback;
    }

    public set thisObj(value: any) {
        if (value.hasOwnProperty("__uid") == false) {
            value["__uid"] = IntUtil.createUniqueInt().toString();
        }
        this._thisObjUid = value["__uid"];
        this._thisObj = value;
    }

    public get thisObj(): any {
        return this._thisObj;
    }

    /**
     * 取出
     */
    onPoolGet(): void {

    }

    /**
     * 放入池时重置
     */
    onPoolReset(): void {
        this._callback = null;
        this.args = null;
        this._thisObj = null;
        this._funcUid = null;
        this._thisObjUid = null;
        this._hashCode = null;
    }

    /**
     * 销毁
     */
    onPoolDispose(): void {
        this._callback = null;
        this.args = null;
        this._thisObj = null;
        this._funcUid = null;
        this._thisObjUid = null;
        this._hashCode = null;
    }
}