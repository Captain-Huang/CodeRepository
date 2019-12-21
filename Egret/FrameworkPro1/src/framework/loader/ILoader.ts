/**
 * 下载器接口
 */
interface ILoader extends IPoolObject {
    url: string;
    asset: IAsset;

    /**
     * 开始下载
     */
    start();

    completeCallback: Handler;

    progressCallback: Handler;

    errorCallback: Handler;
}