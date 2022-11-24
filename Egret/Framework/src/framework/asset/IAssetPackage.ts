/**
 * 资源包接口
 */
interface IAssetPackage extends IAsset {
    /**
     * 是否包含资源
     */
    hasAsset(assetName: string): boolean;

    /**
     * 获取资源
     */
    getAsset(assetName: string): any;

    /**
     * 获取所有资源
     */
    getAssets(): Array<any>;
}