/**
 * 动作视图接口
 */
interface IActionView extends egret.DisplayObject, IPoolObject {

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
     * 添加动作渲染器
     */
    addRenderer(renderer:IActionRenderer):void;

    /**
     * 移除动作渲染器
     */
    removeRenderer(renderer:IActionRenderer):IActionRenderer;

    /**
     * 根据类型移除渲染器
     */
    removeRendererByType(type:any):IActionRenderer;

    /**
     * 获取动作渲染器
     */
    getRenderer(type:any):IActionRenderer;

    /**
     * 刷新动作渲染器
     */
    refreshRenderers():void;

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
     * 重置
     */
    reset():void;

    /**
     * 销毁
     */
    dispose():void;
}