/**
 * 游戏配置
 */
class GameConfig {
    private static configs: Object = {};

    /**
     * 设置配置
     */
    public static setConfigs(cfgs: Object): void {
        for (var key in cfgs) {
            this.configs[key] = cfgs[key];
        }
    }

    /**
     * 设置配置
     */
    public static setConfig(key: string, value: any): void {
        this.configs[key] = value;
    }

    /**
     * 获取配置
     */
    public static getConfig(key: string): any {
        return this.configs[key];
    }

    /**
     * 初始化游戏设置
     */
    public static init(): void {
        this.setConfig("resHost", "");
        this.setConfig("cacheVersion", "");
    }
}