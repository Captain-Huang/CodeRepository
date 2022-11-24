/**
 * 资源工厂
 */
class AssetFactory {
    public static createAsset(type: LoadType, data: any): IAsset {
        var asset: IAsset;
        switch (type) {
            case LoadType.BINARY:
                asset = ObjectPoolManager.inst.getObject(BinaryAsset) as BinaryAsset;
                break;
            case LoadType.TEXT:
                asset = ObjectPoolManager.inst.getObject(TextAssset) as TextAssset;
                break;
            case LoadType.JSON:
                asset = ObjectPoolManager.inst.getObject(JsonAsset) as JsonAsset;
                break;
            case LoadType.XML:
                asset = ObjectPoolManager.inst.getObject(XMLAsset) as XMLAsset;
                break;
            case LoadType.TEXTURE:
                asset = ObjectPoolManager.inst.getObject(TextureAsset) as TextureAsset;
                break;
            case LoadType.TEXTURE_ATLAS:
                asset = ObjectPoolManager.inst.getObject(TextureAtlasAsset) as TextureAtlasAsset;
                break;
            case LoadType.AUDIO:
                asset = ObjectPoolManager.inst.getObject(AudioAsset) as AudioAsset;
                break;
            case LoadType.SKELETON:
                asset = ObjectPoolManager.inst.getObject(SkeletonAsset) as SkeletonAsset;
                break;
        }
        asset.data = data;
        return asset;
    }
}