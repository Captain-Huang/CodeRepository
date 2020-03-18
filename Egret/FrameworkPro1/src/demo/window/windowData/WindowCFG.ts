/**
 * 窗口表，临时测试数据，自动生成
 */
class WindowCFG {
    ID: number = 1;
    WindowName: string = "RoleWindow";
    IsSub: boolean = false;
    ParentType: number;
    SubType: number;
    TouchClose: boolean = true;
    CanCloseAll: boolean = false;
    IsModal: boolean = false;
    OpenMode: number = 1;
    OpenX: number = 0;
    OpenY: number = 0;
    CloseOthers: boolean;
    CloseWindowArr: Array<number> = [];
    OpenLinkArr: Array<number> = [];
    CloseLinkArr: Array<number> = [];
    ParallelArr: Array<number> = [];
    FollowArr: Array<number> = [];
    PlayOpenSoundEffect: boolean = false;
    PlayCloseSoundEffect: boolean = false;
    OpenSoundEffect: number;
    CloseSoundEffect: number;
    LabelTip: string;

    /**
     * 初始化数据
     */
    public initData(): void {
        this.WindowName = "RoleWindow";
        this.TouchClose = true;
    }

    /**
     * 读取txt文件填充数据, 返回配置ID
     */
    public fillData(row: Array<string>): any {

    }

    private _parentWindowCFG: WindowCFG;

    /**
     * 是否开启
     */
    public get isFuncOpen(): boolean {
        return true;
        // return GameModels.funcOpen.checkFunOpenByWindow(this.ID);
    }

    /**
     * 获取父窗体
     */
    public getParentWindowCFG(): WindowCFG {
        if (this.ParentType != 0) {
            if (this._parentWindowCFG == null) {
                // this._parentWindowCFG = getTable(Tables.WindowCFG, this.ParentType) as WindowCFG;
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
        // if (AppSetting.hasMargin) {
        //     if (this.OpenMode != WindowOpenMode.normal) {
        //         return this.OpenY + AppSetting.marginHeight;
        //     }
        // }
        return this.OpenY;
    }
}