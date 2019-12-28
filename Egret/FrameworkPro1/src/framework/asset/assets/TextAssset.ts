/**
 * 文本资源
 */
class TextAssset extends AbstractAsset {
  
    protected _text: Object;

    protected onSetData(): void {
        this._text = this.data;
    }

    public get text(): Object {
        return this._text;
    }

    /**
     * 放入池时重置
     */
    public onPoolReset(): void {
        super.onPoolReset();
        this._text = null;
    }
}