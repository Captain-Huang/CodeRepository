/**
 * 资源代理
 */
interface IAssetProxy {
    /**
     * 清理代理的资源前准备，将要忽略的资源处理下
     */
    prepareClearAsset(): void;

    /**
     * 检查代理的资源是否可以被清理，如果是准备期间忽略的资源就不清理
     */
    checkClearAsset(asset: IAsset): boolean;
}