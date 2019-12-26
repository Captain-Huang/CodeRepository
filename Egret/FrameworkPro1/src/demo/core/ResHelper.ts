/**
 * 资源帮助类
 */
class ResHelper {
    public static rootPath:string = "";
    public static assetsPath:string = "";
    public static configPath:string = "";
    public static imagePath:string = "";
    public static moviePath:string = "";
    public static actionPath:string = "";
    public static mapPath:string = "";
    public static uiPath:string = "";
    public static skeletonPath:string = "";
    public static audioPath:string = "";

    public static init():void {
        this.rootPath = "resource/";
        this.assetsPath = this.rootPath + "assets/";
        this.configPath = this.assetsPath + "config/";
        this.imagePath = this.assetsPath + "image/";
        this.moviePath = this.assetsPath + "movie/";
        this.actionPath = this.assetsPath + "action/";
        this.mapPath = this.assetsPath + "map/";
        this.uiPath = this.assetsPath + "ui/";
        this.skeletonPath = this.assetsPath + "skeleton/";
        this.audioPath = this.assetsPath + "audio/";
    }
}