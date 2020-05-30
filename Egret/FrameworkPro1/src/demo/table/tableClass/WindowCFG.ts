/**
* 窗口表_h5
*/
class WindowCFG extends game_config.$WindowCFG implements ITxtTable {

    private _parentWindowCFG: WindowCFG;

    /**
     * 是否开启
     */
    public get isFuncOpen(): boolean {
        return true;
    }

    /**
     * 获取父窗体
     */
    public getParentWindowCFG(): WindowCFG {
        if (this.ParentType != 0) {
            if (this._parentWindowCFG == null) {
                this._parentWindowCFG = getTable(Tables.WindowCFG, this.ParentType) as WindowCFG;
            }
            return this._parentWindowCFG;
        }
        return this;
    }

    /**
     * 获取实际窗体配置
     */
    public getRealWindowCFG(): WindowCFG {
        if (this.IsSub) {
            return this.getParentWindowCFG();
        }
        return this;
    }

    /**
     * 获取实际窗体ID
     */
    public getRealWindowID(): number {
        return this.getRealWindowCFG().ID;
    }

    /**
     * 获取实际窗体名称
     */
    public getRealWindowName(): string {
        return this.getRealWindowCFG().WindowName;
    }

    /**
     * 获取实际平行ID
     */
    public getRealParallelID(): number {
        return this.getRealWindowCFG().ID;
    }

    /**
     * 获取实际平行数组
     */
    public getRealParallelArr(): Array<number> {
        return this.getRealWindowCFG().ParallelArr;
    }

    /**
     * 获取实际平行数组
     */
    public getRealFollowlArr(): Array<number> {
        return this.getRealWindowCFG().FollowArr;
    }

    /**
    * 获取实际Y偏移
    */
    public getRealOpenY(): number {
        if (AppSetting.hasMargin) {
            if (this.OpenMode != WindowOpenMode.normal) {
                return this.OpenY + AppSetting.marginHeight;
            }
        }
        return this.OpenY;
    }
}