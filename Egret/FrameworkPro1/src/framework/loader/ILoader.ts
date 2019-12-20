/**
 * 下载器接口
 */
interface ILoader extends IPoolObject {
    url: string;

    /**
     * 开始下载
     */
    start();

    completeCallback;

    progressCallback;

    errorCallback;
}