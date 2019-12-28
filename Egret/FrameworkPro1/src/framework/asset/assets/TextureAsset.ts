/**
 * 纹理资源
 */
class TextureAsset extends AbstractAsset {

    protected _texture: egret.Texture;

    protected onSetData():void {
        this._texture = new egret.Texture();
        this._texture._setBitmapData(this.data);
    }

    public get texture():egret.Texture {
        return this._texture;
    }

    /**
     * 放入池时重置
     */
    public onPoolReset(): void {
        super.onPoolReset();
        if (this._texture != null) {
            console.log("图片资源被销毁，url=" + this.url);
            this._texture.dispose();
            this._texture = null;
        }
    }
}