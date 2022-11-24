/**
 * json资源
 */
class JsonAsset extends AbstractAsset {
   
    protected _json: Object;

    protected onSetData(): void {
        this._json = JSON.parse(this.data);
    }

    public get json(): Object {
        return this._json;
    }

    /**
     * 放入池时重置
     */
    public onPoolReset(): void {
        super.onPoolReset();
        this._json = null;
    }
}