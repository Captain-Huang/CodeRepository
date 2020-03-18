/**
 * 场景管理器接口
 */
interface IStageManager extends IManager {

    /**
     * 场景
     */
    stage:egret.Stage;

    /**
     * 帧频
     */
    fps:number;

    /**
     * 基础帧频
     */
    baseFps:number;

    /**
     * 帧频倍数
     */
    fpsFactor:number;

    /**
     * 帧间隔（毫秒）
     */
    interval:number;

    /**
     * 帧间隔（秒）
     */
    intervalSeconds:number;

    /**
     * 基础帧间隔（毫秒）
     */
    baseInterval:number;

    /**
     * 基础帧间隔（秒）
     */
    baseIntervalSeconds:number;

    /**
     * 设计高度
     */
    designWidth:number;

    /**
     * 设计宽度
     */
    designHeight:number;

    /**
     * 场景高度
     */
    screenWidth:number;

    /**
     * 场景宽度
     */
    screenHeight:number;

    /**
     * 缩放比例
     */
    scaleFactor:number;

    /**
     * 设置设计尺寸
     */
    setDesignSize(designWidth:number, designHeight):void;

    /**
     * 设置屏幕尺寸
     */
    setScreenSize(screenWidth:number, screenHeight:number):void;

    /**
     * 基础帧转换为运行帧
     */
    baseFramesToCurrentFrames(frames:number):number;

    /**
     * 基础时间转换为运行时间
     */
    baseIntervalToCurrentInterval(interval:number):number;

    /**
     * 运行帧转换为基础帧
     */
    currentFramesToBaseFrames(frames:number):number;

    /**
     * 运行时间转换为基础时间
     */
    currentIntervalToBaseInterval(interval:number):number;

    /**
     * 时间转换为帧
     */
    timeToFrames(time:number):number;

    /**
     * 帧转换为时间
     */
    framesToTime(frames:number):number;

    /**
     * 注册全局事件
     */
    register(type:string, callback:Function, thisObj:any, args?:Array<any>):void;

    /**
     * 注销全局事件
     */
    unregister(type:string, callback:Function, thisObj:any):void;

    /**
     * 注册全局事件
     */
    registerWindow(type:string, callback:Function, thisObj:any, args?:Array<any>):void;

    /**
     * 注销全局事件
     */
    unregisterWindow(type:string, callback:Function, thisObj:any):void;
}