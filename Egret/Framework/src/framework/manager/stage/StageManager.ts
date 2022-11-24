/**
 * 场景管理器接口
 */
class StageManager extends Manager implements IStageManager {

    private _stage: egret.Stage;
    private _fps: number;
    private _baseFps: number;
    private _fpsFactor: number;
    private _interval: number;
    private _intervalSeconds: number;
    private _baseInterval: number;
    private _baseIntervalSeconds: number;
    private _designWidth: number;
    private _designHeight: number;
    private _screenWidth: number;
    private _screenHeight: number;
    private _scaleFacotr: number;
    private _callbackDict: Object;
    private _windowCallbackDict: Object;
    private _windowEventCallback: any;

    protected init(): void {
        this._stage = App.inst.stage;
        // TODO 会导致渲染出问题，还未找到原因
        // this._stage.setContentSize(AppSetting.designWidth, AppSetting.designHeight);
        this._callbackDict = {};
        this._windowCallbackDict = {};
        this._windowEventCallback = (event: Event) => {
            this.onWindowEventCallback(event);
        };
        this.baseFps = AppSetting.baseFps;
        this.fps = AppSetting.fps;
        this.register(egret.Event.RESIZE, this.onResize, this);
        this.onResize();
    }

    /**
     * 场景
     */
    public get stage(): egret.Stage {
        return this._stage;
    }

    /**
     * 帧频
     */
    public get fps(): number {
        return this._fps;
    }

    public set fps(value: number) {
        if (this._fps != value) {
            this._fps = value;
            this._interval = 1000 / this._fps;
            this._intervalSeconds = 1 / this._fps;
            this._fpsFactor = this._fps / this._baseFps;
            this._stage.frameRate = this._fps;
        }
    }

    /**
     * 基础帧频
     */
    public get baseFps(): number {
        return this._baseFps;
    }

    public set baseFps(value: number) {
        if (this._baseFps != value) {
            this._baseFps = value;
            this._baseInterval = 1000 / this._baseFps;
            this._baseIntervalSeconds = 1 / this._baseFps;
        }
    }

    /**
     * fps缩放
     */
    public get fpsFactor(): number {
        return this._fpsFactor;
    }

    /**
     * 帧间隔（毫秒）
     */
    public get interval(): number {
        return this._interval;
    }

    /**
     * 帧间隔（秒）
     */
    public get intervalSeconds(): number {
        return this._intervalSeconds;
    }

    /**
     * 基础帧间隔（毫秒）
     */
    public get baseInterval(): number {
        return this._baseInterval;
    }

    /**
     * 基础帧间隔（秒）
     */
    public get baseIntervalSeconds(): number {
        return this._baseIntervalSeconds;
    }

    /**
     * 设计宽度
     */
    public get designWidth(): number {
        return this._designWidth;
    }

    /**
     * 设计高度
     */
    public get designHeight(): number {
        return this._designHeight;
    }

    /**
     * 屏幕宽度
     */
    public get screenWidth(): number {
        return this._screenWidth;
    }

    /**
     * 屏幕高度
     */
    public get screenHeight(): number {
        return this._screenHeight;
    }

    /**
     * 缩放比例
     */
    public get scaleFactor(): number {
        return this._scaleFacotr;
    }

    /**
     * 设置设计尺寸
     */
    public setDesignSize(designWidth: number, designHeight: number): void {
        this._designWidth = designWidth;
        this._designHeight = designHeight;
    }

    /**
     * 设置屏幕尺寸
     */
    public setScreenSize(screenWidth: number, screenHeight: number): void {
        this._screenWidth = screenWidth;
        this._screenHeight = screenHeight;
        var sx: number = this._screenWidth / this._designWidth;
        var sy: number = this._screenHeight / this._designHeight;
        this._scaleFacotr = Math.min(sx, sy);
        // this.dispatchEventWithData(StageManagerEvent.RESIZE);
    }

    /**
     * 基础帧转换为运行帧
     */
    public baseFramesToCurrentFrames(frames: number): number {
        return Math.floor(frames * this._fpsFactor);
    }

    /**
     * 基础时间转换为运行时间
     */
    public baseIntervalToCurrentInterval(interval: number): number {
        return interval * this._fpsFactor;
    }

    /**
     * 运行帧转换为基础帧
     */
    public currentFramesToBaseFrames(frames: number): number {
        return Math.floor(frames / this._fpsFactor);
    }

    /**
     * 运行时间转换为基础时间
     */
    public currentIntervalToBaseInterval(interval: number): number {
        return interval / this._fpsFactor;
    }

    /**
     * 时间转换为帧
     */
    public timeToFrames(time: number): number {
        return this.baseFramesToCurrentFrames(Math.floor(time / this._baseInterval));
    }

    /**
     * 帧转换为时间
     */
    public framesToTime(frames: number): number {
        return frames / this._baseFps;
    }

    /**
     * 注册全局事件
     */
    public register(type: string, callback: Function, thisObj: any, args?: Array<any>): void {
        // var callbacks: Array<Handler> = this._callbackDict[type];
        // if (callbacks == null) {
        //     callbacks = [];
        //     this._callbackDict[type] = callbacks;
        //     this._stage.addEventListener(type, this.onEventCallback, this);
        // }
        // callbacks.push(Handler.create(callback, thisObj, args));
    }

    /**
     * 注销全局事件
     */
    public unregister(type: string, callback: Function, thisObj: any): void {
        var callbacks: Array<Handler> = this._callbackDict[type];
        if (callbacks != null) {
            // TODO
            // callbacks.remove(callback, thisObj);
            if (callbacks.length == 0) {
                delete this._callbackDict[type];
                this._stage.removeEventListener(type, this.onEventCallback, this);
            }
        }
    }

    /**
     * 全局事件回调
     */
    private onEventCallback(event: egret.Event): void {
        var callbacks: Array<Handler> = this._callbackDict[event.type];
        if (callbacks != null) {
            // callbacks.applyWith([event]);
        }
    }

    /**
     * 注册全局事件
     */
    public registerWindow(type: string, callback: Function, thisObj: any, args?: Array<any>): void {
        var callbacks: Array<Handler> = this._windowCallbackDict[type];
        if (callbacks == null) {
            callbacks = [];
            this._windowCallbackDict[type] = callbacks;
            this._stage.addEventListener(type, this.onWindowEventCallback, this);
        }
        callbacks.push(Handler.create(callback, thisObj, args));
    }

    /**
     * 注销全局事件
     */
    public unregisterWindow(type: string, callback: Function, thisObj: any): void {
        var callbacks: Array<Handler> = this._windowCallbackDict[type];
        if (callbacks != null) {
            // callbacks.remove(callback, thisObj);
            if (callbacks.length == 0) {
                delete this._windowCallbackDict[type];
                window.removeEventListener(type, this._windowEventCallback);
            }
        }
    }

    /**
     * 全局事件回调
     */
    private onWindowEventCallback(event: Event): void {
        var callbacks: Array<Handler> = this._callbackDict[event.type];
        if (callbacks != null) {
            // callbacks.applyWith([event]);
        }
    }

    private onResize(): void {
        var width: number = MathUtil.rangeLimit(this._stage.stageWidth, AppSetting.minScreenWidth, AppSetting.maxScreenWidth);
        var height: number = MathUtil.rangeLimit(this._stage.stageHeight, AppSetting.minScreenHeight, AppSetting.maxScreenHeight);
        this.setScreenSize(width, height);
    }

    /**
     * 对象池派发事件
     */
    public dispatchEventWithData(type: string): void {
        // var event:StageManagerEvent = ObjectPoolManager.inst.getObject(StageManagerEvent) as StageManagerEvent;
        // event.$type = type;
        // this.dispatchEvent(event);
        // ObjectPoolManager.inst.releaseObject(event);
    }
}

