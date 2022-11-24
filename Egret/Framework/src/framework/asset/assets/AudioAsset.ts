/**
 * 音频资源
 */
class AudioAsset extends AbstractAsset {

    protected _sound: egret.Sound;

    public onAdd():void {
        super.onAdd();
        this.lastUseTime = egret.getTimer();
    }

    protected onSetData(): void {
        this._sound = this.data;
    }

    public get sound(): egret.Sound {
        return this._sound;
    }

    /**
     * 放入池时重置
     */
    public onPoolReset(): void {
        super.onPoolReset();
        this._sound = null;
    }
}