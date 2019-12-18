/**
 * 舞台管理器
 */
class StageManager {
    private _stage: egret.Stage;
    private static _inst: StageManager;

    public static get inst(): StageManager {
        if (!this._inst) {
            this._inst = new StageManager();
        }
        return this._inst;
    }

    public set stage(value: egret.Stage) {
        this._stage = value;
    }

    public get stage(): egret.Stage {
        return this._stage;
    }

    public get screenWidth(): number {
        return this.stage.stageWidth;
    }

    public get screenHeight(): number {
        return this.stage.stageHeight;
    }
}