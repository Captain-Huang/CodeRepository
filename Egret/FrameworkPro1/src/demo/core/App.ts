class App {
    private static _inst: App;

    private _curTime: number;
    private _timeId: number;

    public static get inst(): App {
        if (!this._inst) {
            this._inst = new App();
        }
        return this._inst;
    }

    public startUp(): void {
        this._curTime = egret.getTimer();
        egret.startTick(this.onTick, this);
        egret.lifecycle.onPause = () => {
            var self = this;
            egret.stopTick(this.onTick, this);
            this._curTime = egret.getTimer();
            this._timeId = window.setInterval(function (): void {
                self.onTick(egret.getTimer());
            }, 1000 / 60);
        };

        egret.lifecycle.onResume = () => {
            window.clearInterval(this._timeId);
            egret.startTick(this.onTick, this);
        };
    }

    public onTick(time: number): boolean {
        TimerManager.inst.update(time - this._curTime);
        this._curTime = time;
        return false;
    }
}