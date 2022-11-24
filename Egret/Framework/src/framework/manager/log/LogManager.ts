/**
 * 日志管理类
 */
class LogManager extends Manager implements ILogManager {

    private static LEVEL_TEXT: Object = {
        0: "INFO",
        1: "WARN",
        2: "ERROR",
        3: "FATEL"
    };

    private _enabled: boolean = true;
    private _isPrint: boolean = true;
    private _isPrintToScreen: boolean = false;

    private loggerDict: Object;
    private screenLogs: Array<string>;
    private screenString: string;

    public init(): void {
        this.loggerDict = {};
        this.screenLogs = [];
    }

    public set enabled(value: boolean) {
        this._enabled = value;
    }

    public get enabled(): boolean {
        return this._enabled;
    }

    public set isPrint(value: boolean) {
        this._isPrint = value;
    }

    public get isPrint(): boolean {
        return this._isPrint;
    }

    public set isPrintToScreen(value: boolean) {
        this._isPrintToScreen = value;
    }

    public get isPrintToScreen(): boolean {
        return this._isPrintToScreen;
    }

    public registerLogeer(owner: string, lv: LogLevel): Logger {
        lv = lv || LogLevel.INFO;
        var logger: Logger = this.loggerDict[owner] = new Logger(owner, lv);
        return logger;
    }

    public unRegisterLogger(owner: string): Logger {
        var logger: Logger = this.loggerDict[owner];
        if (logger != null) {
            delete this.loggerDict[owner];
        }
        return logger;
    }

    public log(owner: string, level: LogLevel, log: string): void {
        if (this._enabled == false) {
            return;
        }
        var logger: Logger = this.loggerDict[owner];
        if (logger == null) {
            logger = this.registerLogeer(owner, level);
        }
        if (level >= logger.level) {
            var logFormat = "[LOG] " + DateUtil.formatDate(new Date(), "yyyy-MM-dd hh:mm:ss") + " [Owner:\"" + owner + "\" Level:\"" + LogManager.LEVEL_TEXT[level] + "\"] - " + log;
            if (this._isPrint) {
                switch (level) {
                    case LogLevel.INFO:
                        egret.log(logFormat);
                        break;
                    case LogLevel.WARN:
                        egret.warn(logFormat);
                        break;
                    case LogLevel.FATAL:
                    case LogLevel.ERROR:
                        egret.error(logFormat);
                        break;
                }
            }
        }
    }

    public info(log:string, owner?:string): void {
        owner = owner || Logger.SYS_OWNER;
        this.log(owner, LogLevel.INFO, log);
    }

    public warn(log:string, owner?:string): void {
        owner = owner || Logger.SYS_OWNER;
        this.log(owner, LogLevel.WARN, log);
    }

    public fatal(log:string, owner?:string): void {
        owner = owner || Logger.SYS_OWNER;
        this.log(owner, LogLevel.FATAL, log);
    }

    public error(log:string, owner?:string): void {
        owner = owner || Logger.SYS_OWNER;
        this.log(owner, LogLevel.ERROR, log);
    }
}

/**
 * 日志等级
 */
enum LogLevel {
    INFO = 0,
    WARN = 1,
    ERROR = 2,
    FATAL = 3
}

/**
 * 日志记录项
 */
class Logger {
    public static readonly SYS_OWNER: string = "SYS";

    public owner: string;
    public level: LogLevel;

    public constructor(owner: string, level: LogLevel) {
        this.owner = owner;
        this.level = level;
    }
}


// ---------------------- 日志全局函数 ----------------------
function error(log: string, owner?: string): void {
    App.logManager.error(log, owner);
}
function fatel(log: string, owner?: string): void {
    App.logManager.fatal(log, owner);
}
function warn(log: string, owner?: string): void {
    App.logManager.warn(log, owner);
}
function info(log: string, owner?: string): void {
    App.logManager.info(log, owner);
}