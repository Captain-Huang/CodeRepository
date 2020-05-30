/**
 * 数据模型
 */
class GameModels {
    public static world: ModelWorld;

    public static init():void {
        this.world = new ModelWorld();
    }

    public static reset():void {
        this.world.reset();
    }
}