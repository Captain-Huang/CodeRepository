/**
 * 角色对象
 */
class RoleObject extends BaseSprite implements IPoolObject {
    protected _roleData: RoleData;

    protected _viewList: Array<RoleActionView>;


    /**
     * 角色数据
     */
    public get roleData(): RoleData {
        return this._roleData;
    }

    public set roleData(value: RoleData) {
        this._roleData = value;
        for (var view of this._viewList) {
            view.roleData = this._roleData;
        }
        this.refreshRoleData();
        this.showInfo();
    }

    /**
     * 刷新角色数据
     */
    protected refreshRoleData(): void {
        // this.setPositionXYZ(this._roleData.position.realX, this._roleData.position.realY);
        // this.refreshAvatarVisible();
        // this.refreshShadowVisible();
        // this.refreshScaleInfo();
    }

    /**
     * 显示信息
     */
    public showInfo(): void {
        // if (this._roleInfo == null) {
        //     this._roleInfo = RoleInfoFactory.createRoleInfo(this._roleData);
        //     if (this._roleInfo != null) {
        //         this._roleInfo.setRoleObject(this);
        //     }
        // }
    }

    public reset():void {
        
    }

    /**
     * 取出
     */
    onPoolGet(): void {

    }

    /**
     * 放入池时重置
     */
    onPoolReset(): void {

    }

    /**
     * 销毁
     */
    onPoolDispose(): void {

    }
}