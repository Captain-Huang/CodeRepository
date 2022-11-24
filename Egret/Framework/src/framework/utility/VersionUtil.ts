/**
 * 版本帮助类
 */
class VersionUtil {
    public static versions: Object = {};

    /**
     * 设置版本数据
     */
    public static setVersionData(versions: Object): void {
        if (versions) {
            this.versions = versions;
        }
    }

    /**
     * 设置版本数据
     */
    public static setVersions(versionStr: string): void {
        var urlArr: Array<string> = versionStr.split("\n");
        for (var url of urlArr) {
            var index = url.indexOf("=");
            if (index != -1) {
                var key = url.substring(0, index);
                var value = url.substring(index + 1);
                this.versions[key] = value;
            }
        }
    }

    /**
     * 设置版本
     */
    public static setVersion(url: string, value: string): void {
        this.versions[url] = value;
    }

    /**
     * 获取版本
     */
    public static getVersion(url: string): string {
        return this.versions[url];
    }
}