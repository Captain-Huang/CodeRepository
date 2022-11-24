/**
 * 动作渲染器接口
 */
interface IActionRenderer extends egret.DisplayObject, IPoolObject {
    /**
     * 类型
     */
    type:any;

    /**
     * 动作
     */
    action:number;

    /**
     * 方向
     */
    direction:Direction;

    /**
     * 当前索引
     */
    frameIndex:number;

    /**
     * 最大索引
     */
    maxFrameIndex:number;

    /**
     * 延迟帧
     */
    delayFrames:number;

    /**
     * 动作帧
     */
    frames:Array<number>;

    /**
     * 是否循环
     */
    loop:boolean;

    /**
     * 深度
     */
    depth:number;

    /**
     * 是否锁定动作
     */
    lockAction:boolean;

    /**
     * 动作资源
     */
    textureAtlasAsset:TextureAtlasAsset;

    /**
     * 设置动作
     */
    setAction(action:number, direction:Direction, callback?:Handler):void;

    /**
     * 跳转到下一帧
     */
    nextFrame():void;
    
    /**
     * 设置坐标
     */
    setPosition(x:number, y:number):void;

    /**
     * 设置纹理集资源
     */
    setTextureAtlasAsset(textureAtlasAsset:TextureAtlasAsset):void;

    /**
     * 动态加载动作资源
     */
    loadAction(url:string, defaultUrl?:string, priority?:LoadPriority, loadCallback?:Handler):void;

    /**
     * 停止加载动作资源
     */
    stopLoadAction():void;

    /**
     * 重置
     */
    reset():void;

    /**
     * 销毁
     */
    dispose():void;
}