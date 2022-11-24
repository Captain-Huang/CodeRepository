// /**
//  * 动作渲染器
//  */
// class ActionRenderer extends egret.Bitmap implements IActionRenderer {
//     public static depthChecker:ActionRendererDepthChecker;

//     public type:any;
//     public action:number = 0;

//     protected textureAtlasAsset:TextureAtlasAsset;

//     protected _direction:Direction = Direction.NONE;
//     protected _frameIndex:number = 0;
//     protected _maxFrameIndex:number = -1;

//     protected _isLoading:boolean = false;
//     protected _url:string;
//     protected _defaultUrl:string;
//     protected _loadCallback:Handler;
//     protected _loadCompleteCallback:Handler;

//     public constructor() {
//         super();
//         this._loadCompleteCallback = new Handler(this.loadComplete, this);
//     }

//     /**
//      * 当前索引
//      */
//     public get frameIndex():number {
//         return this._frameIndex;
//     }

//     public set frameIndex(value:number) {
//         this._frameIndex = value;

//         if (this._frameIndex <= this._maxFrameIndex) {
//             if (this.textureAtlasAsset != null) {
//                 if (this.)
//             }
//         }
//     }

//     /**
//      * 重置
//      */
//     public reset():void {

//     }

//     /**
//      * 销毁
//      */
//     public dispose():void {
//         this.reset();
//     }

//     /**
// 	 * 取出
// 	 */
// 	public onPoolGet():void {

//     }

// 	/**
// 	 * 重置
// 	 */
// 	public onPoolReset():void {
//         this.reset();
//     }

// 	/**
// 	 * 销毁
// 	 */
// 	public onPoolDispose():void {
//         this.dispose();
//     }
// }