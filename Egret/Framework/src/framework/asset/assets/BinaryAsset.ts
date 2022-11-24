/**
 * 字节流资源
 */
class BinaryAsset extends AbstractAsset {

    protected _bytes: egret.ByteArray;

    protected onSetData(): void {
        this._bytes = this.data;
    }

    public get bytes(): egret.ByteArray {
        return this._bytes;
    }

    /**
     * 放入池时重置
     */
    public onPoolReset(): void {
        super.onPoolReset();
        this._bytes = null;
    }
}