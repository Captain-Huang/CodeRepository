/**
 * 场景处理器
 */
class SceneProcessor implements IAssetProxy {

    public type:SceneType;

    public constructor() {
        this.init();
    }

    /**
     * 初始化
     */
    protected init():void {
        
    }

    /**
     * 进入
     */
    public enter():void {
        this.onEnter();
        this.addEventListeners();
    }

    /**
     * 离开
     */
    public exit():void {
        this.onExit();
        this.removeEventListeners();
    }

    /**
     * 显示
     */
    public show(...args:Array<any>):void {

    }

    /**
     * 进入
     */
    protected onEnter():void {
        App.timerManager.registerFrameLoop(1, this.onUpdate, this);
    }

    /**
     * 离开
     */
    protected onExit():void {
        App.timerManager.unRegister(this.onUpdate, this);
    }

    /**
     * 更新
     */
    protected onUpdate():void {

    }

    /**
     * 添加事件监听
     */
    protected addEventListeners():void {

    }

    /**
     * 移除事件监听
     */
    protected removeEventListeners():void {

    }

    /**
     * 开始清理资源
     */
    public prepareClearAsset():void {

    }

    /**
     * 检查清理资源
     */
    public checkClearAsset(asset:IAsset):boolean {
        return true;
    }

    /**
     * 重置
     */
    public reset():void {
        App.timerManager.unRegister(this.onUpdate, this);
    }
}