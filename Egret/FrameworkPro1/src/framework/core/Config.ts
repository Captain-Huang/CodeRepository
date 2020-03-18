class Config {
    private static configDict: Object;

    public static getConfig(key: string): any {
        return this.configDict[key];
    }

    public static setConfig(key: string, value: string): void {
        this.configDict[key] = value;
    }

    public static setConfigs(cfgObj: Object): void {
        if (cfgObj) {
            for (var name in cfgObj) {
                this.setConfig(name, cfgObj[name]);
            }
        }
    }

    public static hasConfig(key: string):boolean {
        return this.configDict.hasOwnProperty(key);
    }
}