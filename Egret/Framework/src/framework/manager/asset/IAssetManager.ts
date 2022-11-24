/**
 * 资源管理器接口
 */
interface IAssetManager extends IManager {

    /**
     * 是否启用
     */
    enabled:boolean;

    /**
     * 自动清理检查时间
     */
    autoClearCheckTime:number;

    /**
     * 自动清理时间
     */
    autoClearTime:number;

    /**
     * 资源代理
     */
    assetProxy:IAssetProxy;

    /**
     * 清理资源
     */
    checkClearAsset(force?:boolean):void;

    /**
     * 添加资源
     */
    addAsset(asset:IAsset);

    /**
     * 移除资源
     */
    removeAsset(id:string):void;

    /**
     * 是否包含资源
     */
    hasAsset(id:string):boolean;

    /**
     * 根据ID获取资源
     */
    getAsset(id:string):IAsset;

    /**
     * 根据ID获取Package
     */
    getAssetPackage(id:string):IAssetPackage;

    /**
     * 获取package中的资源
     */
    getAssetInPackage(id:string, name:string):any;

    /**
     * 使用资源
     */
    useAsset(id:string, count:number):void;

    /**
     * 不使用资源
     */
    unUseAsset(id:string, count:number):void;
}