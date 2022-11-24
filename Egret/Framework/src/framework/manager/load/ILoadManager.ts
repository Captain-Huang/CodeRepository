/**
 * 下载管理器接口
 */
interface ILoadManager extends IManager {

    /**
     * 下载资源
     */
    load(url:string, type?:LoadType, priority?:LoadPriority, completeCallback?:Handler, progressCallback?:Handler, errorCallback?:Handler, cache?:boolean, loadParams?:Array<LoadParam>):LoadItem;

    /**
     * 下载资源
     */
    loadItem(item:LoadItem):LoadItem;

    /**
     * 下载资源列表
     */
    loadItems(items:Array<LoadItem>, completeCallback?:Handler, progressCallback?:Handler, errorCallback?:Handler, dispatchEvent?:boolean):LoadQueue;

    /**
     * 下载资源列表
     */
    loadQueue(queue:LoadQueue):LoadQueue;

    /**
     * 停止下载
     */
    stopLoad(url:string):void;

    /**
     * 移除加载回调
     */
    removeLoadCallback(url:string, completeCallback?:Handler, progressCallback?:Handler, errorCallback?:Handler):void;

    /**
     * 是否正在下载
     */
    isLoading(url:string):boolean;

    /**
     * 对象池派发事件
     */
    // dispatchEventWithData(type:string, item?:LoadItem, queue?:LoadQueue):void;
}