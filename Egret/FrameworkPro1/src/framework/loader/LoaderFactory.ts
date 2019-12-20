/**
 * 下载器工厂
 */
class LoaderFactory {
    public static createLoader(url: string, loadType: LoadType): ILoader {
        var loader: ILoader;
        switch (loadType) {
            case LoadType.TEXTURE:
                loader = ObjectPoolManager.inst.getObject(TextureLoader) as TextureLoader;
        }
        loader.url = url;
        return loader;
    }
}