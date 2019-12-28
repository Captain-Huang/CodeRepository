/**
 * 资源接口
 */
interface IAsset extends IPoolObject {

    /**
     * 地址
     */
    url: string;

    /**
     * 资源
     */
    data: any;

    /**
     * 自定义数据
     */
    customData: any;

    /**
     * 使用计数
     */
    useCount: number;

    /**
     * 最后使用时间
     */
    lastUseTime: number;

    /**
     * 是否自动清理
     */
    autoClear: boolean;

    /**
     * 获取字节数组
     */
    getBytes(): egret.ByteArray;

    /**
     * 使用计数
     */
    use(count: number): void;

    /**
     * 不使用计数
     */
    unuse(count: number): void;

    /**
     * 添加到资源管理器
     */
    onAdd(): void;

    /**
     * 销毁
     */
    dispose(): void;
}