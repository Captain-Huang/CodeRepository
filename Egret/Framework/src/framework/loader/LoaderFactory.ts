/**
 * 下载器工厂
 */
class LoaderFactory {
    public static readonly text: string = "text";
    public static readonly json: string = "json";
    public static readonly xml: string = "xml";
    public static readonly jpg: string = "jpg";
    public static readonly jpeg: string = "jpeg";
    public static readonly png: string = "png";
    public static readonly bmp: string = "bmp";
    public static readonly binary: string = "binary";
    public static readonly atlas: string = "atlas";
    public static readonly skeleton: string = "skeleton";
    public static readonly MP3: string = "mp3";
    public static readonly WAV: string = "wav";

    public static createLoader(url: string, loadType: LoadType = LoadType.AUTO, loadParams: Array<LoadParam> = null): ILoader {
        if (loadType == LoadType.AUTO) {
            loadType = this.getLoadTypeByUrl(url);
        }
        var loader: ILoader;
        switch (loadType) {
            case LoadType.BINARY:
                loader = ObjectPoolManager.inst.getObject(BinaryLoader) as BinaryLoader;
                break;
            case LoadType.TEXT:
                loader = ObjectPoolManager.inst.getObject(TextLoader) as TextLoader;
                break;
            case LoadType.JSON:
                loader = ObjectPoolManager.inst.getObject(JsonLoader) as JsonLoader;
                break;
            case LoadType.XML:
                loader = ObjectPoolManager.inst.getObject(XMLLoader) as XMLLoader;
                break;
            case LoadType.TEXTURE:
                loader = ObjectPoolManager.inst.getObject(TextureLoader) as TextureLoader;
                break;
            case LoadType.TEXTURE_ATLAS:
                loader = ObjectPoolManager.inst.getObject(TextureAtlasLoader) as TextureAtlasLoader;
                break;
            case LoadType.AUDIO:
                loader = ObjectPoolManager.inst.getObject(AudioLoader) as AudioLoader;
                break;
            case LoadType.SKELETON:
                loader = ObjectPoolManager.inst.getObject(SkeletonLoader) as SkeletonLoader;
                break;
        }
        loader.url = url;
        if (loadParams != null) {
            for (var param of loadParams) {
                loader.addParam(param);
            }
        }
        return loader;
    }

    /**
     * 自解析类型
     */
    private static getLoadTypeByUrl(url: string): LoadType {
        var pIndex: number = url.lastIndexOf(".");
        if (pIndex == -1) {
            return LoadType.TEXT;
        }
        var qIndex: number = url.lastIndexOf("?")
        if (qIndex != -1) {
            url = url.substring(0, qIndex);
        }
        var extension: string = url.substring(pIndex + 1).toLowerCase();
        switch (extension) {
            case LoaderFactory.skeleton:
                return LoadType.SKELETON;
            case LoaderFactory.jpg:
            case LoaderFactory.jpeg:
            case LoaderFactory.png:
            case LoaderFactory.bmp:
                return LoadType.TEXTURE;
            case LoaderFactory.text:
                return LoadType.TEXT;
            case LoaderFactory.json:
                return LoadType.JSON;
            case LoaderFactory.xml:
                return LoadType.XML;
            case LoaderFactory.binary:
                return LoadType.BINARY;
            default:
                return LoadType.TEXT;
        }
    }
}