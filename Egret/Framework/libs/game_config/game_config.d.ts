/**
* File is automatically generated, Please do not modify
* 物品表
*/
declare module game_config {
    class $ItemCFG {
        ID: number;
        Name: string;
        Icon: string;
        DropIcon: string;
        Job: number;
        LvR: number;
        BeforeLV: number;
        BeforeLVMax: number;
        Lv: number;
        LvMax: number;
        ZhuanMin: number;
        ZhuanMax: number;
        Rank: number;
        LvRMax: number;
        AwakenLv: number;
        Day: number;
        WingLv: number;
        Quality: number;
        ItemEffectID: number;
        IsShowLight: number;
        NoLightDate: number;
        GetShow: boolean;
        Type1: number;
        Type2: number;
        Type3: number;
        Type4: number;
        ShowType: string;
        sort: number;
        Gender: number;
        Price: number;
        Stack: number;
        CanDestroy: number;
        UseType: number;
        ContinuousUse: number;
        CanAuction: number;
        CanNeedBuy: number;
        IsSellNotice: boolean;
        FuncType: number;
        LimitTime: number;
        CanLvUp: number;
        CanRecord: number;
        Unusual: number;
        team: number;
        RecoverID: number;
        EquipID: number;
        donate: number;
        Treasure: number;
        CanStorage: boolean;
        IntensifyLvMax: number;
        AceIntensifyLvMax: number;
        RefineLvMax: number;
        CDType: number;
        CDPub: number;
        CD: number;
        CanPush: number;
        PushType: number;
        CanDress: number;
        CanShow: number;
        DayLimit: number;
        DropShowSort: number;
        IsTop: boolean;
        IsShowUse: boolean;
        PlayUseEffect: string;
        Funcid: number;
        Funcparams: Array<number>;
        UseNotice: number;
        CFuncID: number;
        CFuncParam: Array<string>;
        CanShortcut: boolean;
        Score: number;
        SuitID: Array<number>;
        Desc: string;
        DropDesc: string;
        noticeID: number;
        IsShowIcon: boolean;
        RelicWeight: number;
        RelicStar: number;
        RelicJobPush: number;
        GatWayID: Array<number>;
        ShowGatWay: boolean;
        ShowEffect: number;
        IconEffect: number;
        RareMine: number;
        MineSort: number;
        MovieID: number;
        MovieDesID: number;
        /**
         * 初始化数据
         */
        initData(): void;
        /**
         * 读取txt文件填充数据, 返回配置ID
         */
        fillData(row: Array<string>): any;
    }
}
/**
* File is automatically generated, Please do not modify
* 邮件表
*/
declare module game_config {
    class $MailCFG {
        ID: number;
        From: string;
        Title: string;
        Content: string;
        /**
         * 初始化数据
         */
        initData(): void;
        /**
         * 读取txt文件填充数据, 返回配置ID
         */
        fillData(row: Array<string>): any;
    }
}
/**
* File is automatically generated, Please do not modify
* 窗口表_h5
*/
declare module game_config {
    class $WindowCFG {
        ID: number;
        WindowName: string;
        IsSub: boolean;
        ParentType: number;
        SubType: number;
        TouchClose: boolean;
        CanCloseAll: boolean;
        IsModal: boolean;
        OpenMode: number;
        OpenX: number;
        OpenY: number;
        CloseOthers: boolean;
        CloseWindowArr: Array<number>;
        OpenLinkArr: Array<number>;
        CloseLinkArr: Array<number>;
        ParallelArr: Array<number>;
        FollowArr: Array<number>;
        PlayOpenSoundEffect: boolean;
        PlayCloseSoundEffect: boolean;
        OpenSoundEffect: number;
        /**
         * 初始化数据
         */
        initData(): void;
        /**
         * 读取txt文件填充数据, 返回配置ID
         */
        fillData(row: Array<string>): any;
    }
}
/**
 * File is automatically generated, Please do not modify
 * 数据表通用函数
 */
declare module game_config {
    function replace(str: string): string;
}
