/**
 * 全局设置
 */
class AppSetting {

	// 调试模式
	public static debug:boolean = false;
	// 运行时平台
	public static runtimePlatform:string;
	// 是否为手机模式
	public static isMobile:boolean = false;
	// 是否为Web模式
	public static isWeb:boolean = false;
	// 设备ID
	public static deviceID:string;
	// fps
	public static fps:number;
	// 后台fps
	public static backFps:number;
	// 基础fps
	public static baseFps:number;
	// 语言环境
	public static locale:string;
	// 资源路径
	public static resHost:string;
	// 缓存版本
	public static cacheVersion:string;
	// 文件版本
	public static fileVersion:string;
	// 屏幕最大宽度（页游适配）
	public static maxScreenWidth:number;
	// 屏幕最大高度（页游适配）
	public static maxScreenHeight:number;
	// 屏幕最小宽度（页游适配）
	public static minScreenWidth:number;
	// 屏幕最小高度（页游适配）
	public static minScreenHeight:number;
	// 设计宽度（手游适配）
	public static designWidth:number;
	// 设计高度（手游适配）
	public static designHeight:number;
	// 刘海高度（手游适配）
	public static marginHeight:number = 0;
	// 是否有刘海
	public static hasMargin:boolean;

	/**
	 * 初始化
	 */
	public static init():void {
		// 初始化设置
        AppSetting.debug = Config.getConfig("debug");
        AppSetting.runtimePlatform = Config.getConfig("runtimePlatform");
        AppSetting.isMobile = Config.getConfig("isMobile");
		AppSetting.isWeb = Config.getConfig("isWeb");
		AppSetting.deviceID = Config.getConfig("deviceID");
        AppSetting.baseFps = +Config.getConfig("baseFps");
        AppSetting.fps = +Config.getConfig("fps");
		AppSetting.backFps = +Config.getConfig("backFps");
        AppSetting.locale = Config.getConfig("locale");
        AppSetting.resHost = Config.getConfig("resHost");
        AppSetting.cacheVersion = Config.getConfig("cacheVersion");
		AppSetting.fileVersion = Config.getConfig("fileVersion");
        AppSetting.maxScreenWidth = +Config.getConfig("maxScreenWidth");
        AppSetting.maxScreenHeight = +Config.getConfig("maxScreenHeight");
        AppSetting.minScreenWidth = +Config.getConfig("minScreenWidth");
        AppSetting.minScreenHeight = +Config.getConfig("minScreenHeight");
        AppSetting.designWidth = +Config.getConfig("designWidth");
        AppSetting.designHeight = +Config.getConfig("designHeight");
		AppSetting.marginHeight = +Config.getConfig("marginHeight");
		AppSetting.hasMargin = AppSetting.marginHeight > 0;
	}
}