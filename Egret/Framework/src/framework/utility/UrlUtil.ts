class UrlUtil {
    public static urlRequestHeader: egret.URLRequestHeader = new egret.URLRequestHeader("Content-Type", "application/x-www-form-urlencoded;charset=UTF-8");

    public static formatUrl(url: string, cleanCache: boolean = false): string {
        // 处理版本号
        var fileVersion: string = VersionUtil.getVersion(url);
        if (fileVersion != null) {
            var index: number = url.lastIndexOf(".");
            url = url.substring(0, index) + "_" + fileVersion + url.substring(index);
        }
        // 处理url
        if (RELEASE) {
            if (url.indexOf("http") == -1) {
                url = AppSetting.resHost + url;
            }
        } else {
            // 开发环境
            if (url.indexOf(ResHelper.configPath) == -1 && url.indexOf(ResHelper.imagePath) == -1 && url.indexOf(ResHelper.uiPath) == -1) {
                if (url.indexOf("http") == -1) {
                    url = AppSetting.resHost + url;
                }
            }
        }
        // 处理资源版本
        if (AppSetting.cacheVersion) {
            url += "?v=" + AppSetting.cacheVersion;
        }
        // 清理资源后缀
        if (cleanCache) {
            var r: string = "t=" + new Date().getTime();
            url += (AppSetting.cacheVersion ? "&" : "?") + r;
        }
        return url;
    }
}