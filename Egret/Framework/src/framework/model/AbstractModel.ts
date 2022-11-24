/**
 * 数据模型基类
 */
class AbstractModel extends egret.EventDispatcher implements IModel {

    public constructor() {
        super();
        this.init();
    }

    /**
     * 初始化
     */
    protected init(): void {

    }

    /**
     * 重置
     */
    public reset(): void {

    }
}