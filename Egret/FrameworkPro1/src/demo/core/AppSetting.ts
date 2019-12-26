/**
 * 游戏全局设置
 */
class AppSetting {
    public static resHost: string;
    public static cacheVersion:string;

    public static init():void {
        this.resHost = GameConfig.getConfig("resHost");
        this.cacheVersion = GameConfig.getConfig("cacheVersion");
    }
}
