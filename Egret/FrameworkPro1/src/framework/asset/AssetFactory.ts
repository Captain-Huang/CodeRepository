/**
 * 资源工厂
 */
class AssetFactory {
    public static createAsset(type: LoadType, data: any): IAsset {
        var asset: IAsset;
        switch (type) {
            case LoadType.TEXTURE:
                asset = ObjectPoolManager.inst.getObject(TextureAsset) as TextureAsset;
        }
        asset.data = data;
        return asset;
    }
}