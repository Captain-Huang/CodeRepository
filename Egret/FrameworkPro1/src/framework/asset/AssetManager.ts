/**
 * 资源管理
 */
class AssetManager {
    private static _inst: AssetManager;

    private assetDict: Object;

    public constructor() {
        this.assetDict = {};
    }

    public static get inst(): AssetManager {
        if (!this._inst) {
            this._inst = new AssetManager();
        }
        return this._inst;
    }

    public addAsset(asset: IAsset): void {
        this.assetDict[asset.url] = asset;
    }

    public hasAsset(url: string): boolean {
        return this.assetDict[url] == null;
    }

    public getAsset(url: string): IAsset {
        return this.assetDict[url];
    }
}