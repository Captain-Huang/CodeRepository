/**
 * 计时器管理类
 */
class TimerManager {
    private _time: number;
    private _timeSecond: number;
    private _curTime: number;
    private _curFrame: number;
    private timerHandlers: Object;

    private static _inst: TimerManager;

    public constructor() {
        this.timerHandlers = [];
        this._curTime = 0;
        this._curFrame = 0;
    }

    public static get inst(): TimerManager {
        if (!this._inst) {
            this._inst = new TimerManager();
        }
        return this._inst;
    }

    public set time(value: number) {
        this._time = value;
    }

    public get time(): number {
        return this._time;
    }

    public get timeSecond(): number {
        return this._time * 1000;
    }

    /**
     * 游戏运行的时间
     */
    public get curTime(): number {
        return this._curTime;
    }

    /**
     * 游戏运行的帧数
     */
    public get curFrame(): number {
        return this._curFrame;
    }

    public update(deltaTime: number): void {
        for (var key in this.timerHandlers) {
            this._curFrame++;
            this._curTime += deltaTime;
            var handler: TimerHandler = this.timerHandlers[key];
            var time = handler.isFrame ? this._curFrame : this._curTime;
            if (time >= handler.curTime) {
                var callback = handler.callback
                if (callback) {
                    while (time >= handler.curTime && handler.count != 0) {
                        handler.curTime += handler.delayTime;
                        if (handler.count > 0) {
                            handler.count--;
                            if (handler.count == 0) {
                                this.unRegister(callback, handler.thisObj);
                            }
                        }
                        callback.apply(handler.thisObj, handler.args);
                    }
                }
            }
        }
    }

    public register(isFrame: boolean, delayTime: number, callback: Function, thisObj: any, count: number = 1, args: Array<any> = null): void {
        var key = this.getHandlerHashCode(callback, thisObj);
        var handler: TimerHandler = this.timerHandlers[key];
        // 存在就更新计时器
        if (handler) {
            handler.isFrame = isFrame;
            handler.delayTime = delayTime;
            handler.count = count;
            handler.args = args;
            handler.curTime = (isFrame ? this._curFrame : this._curTime) + delayTime
            return;
        }
        // 不存在创建计时器
        handler = ObjectPoolManager.inst.getObject(TimerHandler) as TimerHandler;
        handler.isFrame = isFrame;
        handler.delayTime = delayTime;
        handler.thisObj = thisObj;
        handler.callback = callback;
        handler.count = count;
        handler.args = args;
        handler.curTime = (isFrame ? this._curFrame : this._curTime) + delayTime;
        this.timerHandlers[handler.hashCode] = handler;
    }

    public unRegister(callback: Function, thisObj: any): void {
        var key = this.getHandlerHashCode(callback, thisObj);
        var handler = this.timerHandlers[key];
        if (handler) {
            ObjectPoolManager.inst.releaseObject(handler);
            delete this.timerHandlers[key];
        }
    }

    public registerOnce(deltaTime: number, callback: Function, thisObj: any, args: Array<any> = null): void {
        this.register(false, deltaTime, callback, thisObj, 1, args);
    }

    public registerLoop(deltaTime: number, callback: Function, thisObj: any, args: Array<any> = null): void {
        this.register(false, deltaTime, callback, thisObj, -1, args);
    }

    public registerFrameOnce(deltaTime: number, callback: Function, thisObj: any, args: Array<any> = null): void {
        this.register(true, deltaTime, callback, thisObj, 1, args);
    }

    public registerFrameLoop(deltaTime: number, callback: Function, thisObj: any, args: Array<any> = null): void {
        this.register(true, deltaTime, callback, thisObj, -1, args);
    }

    private getHandlerHashCode(callback: Function, thisObj: any): string {
        var funcUid = callback["__uid"];
        var thisObjUid = thisObj["__uid"];
        if (funcUid && thisObj) {
            return thisObjUid + "_" + funcUid;
        } else {
            return null;
        }
    }
}