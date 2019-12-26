/**
 * 资源基类
 */
class AbstractAsset implements IAsset {
    public url: string;
    public data: any;


    /**
     * 取出
     */
    onPoolGet(): void {

    }

    /**
     * 放入池时重置
     */
    onPoolReset(): void {

    }

    /**
     * 销毁
     */
    onPoolDispose(): void {

    }
}