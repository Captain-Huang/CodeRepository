/**
 * 下载器接口
 */
interface ILoader extends IPoolObject {
    url: string;
    asset: IAsset;
    error: string;

    /**
     * 开始下载
     */
    start(): void;

    addParam(param:LoadParam): void;

    completeCallback: Handler;

    progressCallback: Handler;

    errorCallback: Handler;
}