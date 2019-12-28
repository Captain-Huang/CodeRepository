/**
 * 资源基类
 */
class AbstractAsset implements IAsset {

    public url: string;
    public useCount: number;
    public lastUseTime: number;
    public autoClear: boolean;
    public customData: any;

    private _data: any;

    public set data(value: any) {
        this._data = value;
        this.onSetData();
    }

    public get data(): any {
        return this._data;
    }

    /**
     * 获取字节数组
     */
    public getBytes(): egret.ByteArray {
        return this.createBytes();
    }

    /**
     * 使用计数
     */
    public use(count: number = 1): void {
        this.useCount += count;
        this.lastUseTime = egret.getTimer();
    }

    /**
     * 不使用计数
     */
    public unuse(count: number = 1): void {
        this.useCount -= count;
        if (this.useCount < 0) {
            this.useCount = 0;
        }
        if (this.useCount == 0) {
            this.lastUseTime = egret.getTimer();
        }
    }

    /**
     * 添加到资源管理器
     */
    public onAdd(): void {

    }

    /**
     * 销毁
     */
    public dispose(): void {

    }

    /**
     * 设置数据，子类实现
     */
    protected onSetData(): void {

    }

    /**
     * 创建字节数据，子类实现
     */
    protected createBytes(): egret.ByteArray {
        return null;
    }

    /**
     * 取出
     */
    public onPoolGet(): void {

    }

    /**
     * 放入池时重置
     */
    public onPoolReset(): void {
        this.url = null;
        this.data = null;
        this.customData = null;
        this.useCount = 0;
        this.lastUseTime = 0;
    }

    /**
     * 销毁
     */
    public onPoolDispose(): void {
        this.dispose();
    }
}