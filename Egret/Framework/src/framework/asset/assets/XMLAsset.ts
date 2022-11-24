/**
 * XML资源
 */
class XMLAsset extends AbstractAsset {
      
    protected _xml: Object;

    protected onSetData(): void {
        this._xml = egret.XML.parse(this.data);
    }

    public get xml(): Object {
        return this._xml;
    }

    /**
     * 放入池时重置
     */
    public onPoolReset(): void {
        super.onPoolReset();
        this._xml = null;
    }

}