/**
 * 对象池对象接口类
 */
interface IPoolObject {

    /**
     * 取出
     */
    onPoolGet(): void;

    /**
     * 放入池时重置
     */
    onPoolReset(): void;

    /**
     * 销毁
     */
    onPoolDispose(): void;
}