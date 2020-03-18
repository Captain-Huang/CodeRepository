/**
 * 时间管理器接口
 */
interface ITimerManager extends IManager {

    /**
     * 当前时间（毫秒）
     */
    time:number;

    /**
     * 当前时间（秒）
     */
    timeSecond:number;

    /**
     * 计时器运行时间（毫秒）
     */
    curTime:number;

    /**
     * 帧间隔时间（毫秒）
     */
    deltaTime:number;

    /**
     * 注册计时器回调函数
     */
    register(isFrame:boolean, delayTime:number, callback:Function, thisObj:any, count?:number, args?:Array<any>):void;

    /**
     * 注销计时器回调函数
     */
    unRegister(callback:Function, thisObj:any):void;

    /**
     * 注册计时器回调函数（毫秒，执行一次）
     */
    registerOnce(delayTime:number, callback:Function, thisObj:any, args?:Array<any>):void;

    /**
     * 注册计时器回调函数（毫秒，循环执行）
     */
    registerLoop(delayTime:number, callback:Function, thisObj:any, args?:Array<any>):void;

    /**
     * 注册帧回调函数（执行一次）
     */
    registerFrameOnce(delayTime:number, callback:Function, thisObj:any, args?:Array<any>):void;

    /**
     * 注册帧回调函数（循环执行）
     */
    registerFrameLoop(delayTime:number, callback:Function, thisObj:any, args?:Array<any>):void;
}