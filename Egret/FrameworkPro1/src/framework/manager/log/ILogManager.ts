/**
 * 日志管理器接口
 */
interface ILogManager extends IManager {

    /**
     * 是否启用
     */
    enabled:boolean;
    
    /**
     * 是否打印
     */
    isPrint:boolean;

    /**
     * 是否打印到屏幕
     */
    isPrintToScreen:boolean;

    /**
     * 注册日志记录器
     */
    registerLogeer(owner:string, level?:LogLevel):Logger;

    /**
     * 注销日志记录器
     */
    unRegisterLogger(owner:string):Logger;

    /**
     * 记录日志
     */
    log(owner:string, level:LogLevel, log:string):void;

    /**
     * 记录日志（信息）
     */
    info(log:string, owner?:string):void;

    /**
     * 记录日志（警告）
     */
    warn(log:string, owner?:string):void;

    /**
     * 记录日志（错误）
     */
    error(log:string, owner?:string):void;

    /**
     * 记录日志（灾难）
     */
    fatal(log:string, owner?:string):void;
}