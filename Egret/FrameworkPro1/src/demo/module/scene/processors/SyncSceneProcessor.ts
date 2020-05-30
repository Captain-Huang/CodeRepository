/**
 * 同步场景处理器
 */
class SyncSceneProcessor extends SceneProcessor {

    private static readonly DELAY_ADD_ROLE_SIZE: number = 5;
    private static readonly DELAY_ADD_COUNT: number = 5;

    private ignoreActionDict: Object;
    private ignoreSoundDict: Object;
    private ignoreTextureDict: Object;

    public controlRole: Role;

    protected init(): void {

        this.ignoreActionDict = {};
        this.ignoreSoundDict = {};
        this.ignoreTextureDict = {};
    }

    /**
     * 进入
     */
    protected onEnter(): void {
        super.onEnter();
    }

    /**
     * 离开
     */
    protected onExit(): void {
        super.onExit();
        App.assetManager.assetProxy = null;
        ObjectUtil.clear(this.ignoreActionDict);
        ObjectUtil.clear(this.ignoreSoundDict);
        ObjectUtil.clear(this.ignoreTextureDict);
    }

    /**
     * 开始清理资源
     */
    public beginClearAsset(): void {
        ObjectUtil.clear(this.ignoreActionDict);
        ObjectUtil.clear(this.ignoreSoundDict);
        ObjectUtil.clear(this.ignoreTextureDict);
    }

    /**
     * 检查清理资源
     */
    public checkClearAsset(asset: IAsset): boolean {
        if (asset instanceof TextureAtlasAsset) {
            var actionID: any = (asset as TextureAtlasAsset).customData;
            if (actionID) {
                if (this.ignoreActionDict[actionID]) {
                    return false;
                }
            }
        } else if (asset instanceof AudioAsset) {
            if (this.ignoreSoundDict[asset.url]) {
                return false;
            }
        } else if (asset instanceof TextureAsset) {
            if (this.ignoreTextureDict[asset.url]) {
                return false;
            }
        }

        return true;
    }

    /**
     * 更新
     */
    protected onUpdate(): void {

    }

    /**
     * 显示
     */
    public show(): void {

    }


    /**
     * 进入场景
     */
    protected onEnterScene(event: egret.Event): void {
        var roleVo: RoleVo = GameModels.world.myRole;
        this.addRole(roleVo, true);
    }

    /**
     * 创建角色
     */
    protected createRole(roleVo: RoleVo): Role {
        var roleData: RoleData = RoleDataFactory.createRoleDataByRoleVo(roleVo);
        return GameModules.role.createRole(roleData);
    }

    // ---------------------- 客户端测试接口 ----------------------
    public enterScene(): void {
        this.onEnterScene(null);
    }

    public addRole(roleVo: RoleVo, setControl: boolean = false): void {
        var role: Role = this.createRole(roleVo);
        if (setControl) {
            this.controlRole = role;
            GameModules.role.setControlRole(role);
        }
    }
}