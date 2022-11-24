/**
 * 图集参数
 */
class TextureAtlasParam implements IPoolObject {
    public index: number;
    public name: string;
    public x: number;
    public y: number;
    public width: number;
    public height: number;
    public offsetX: number;
    public offsetY: number;

    public texture: egret.Texture;

    /**
     * 取出
     */
    onPoolGet(): void {

    }

    /**
     * 放入池时重置
     */
    onPoolReset(): void {
        this.texture.dispose();
        this.texture = null;
    }

    /**
     * 销毁
     */
    onPoolDispose(): void {
        this.texture.dispose();
        this.texture = null;
    }
}