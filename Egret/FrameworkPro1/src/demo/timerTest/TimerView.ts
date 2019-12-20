/**
 * 测试计时器UI
 */
class TimerView extends AbstractUIView {
    private demoName: fgui.GTextField;
    private content: fgui.GTextField;
    private btnOnce: fgui.GButton;
    private btnLoop: fgui.GButton;
    private btnFrame: fgui.GButton;
    private btnFrameLoop: fgui.GButton;
    private btnFourTimes: fgui.GButton;
    private btnUnLoop: fgui.GButton;
    private btnUnFrameLoop: fgui.GButton;

    private count: number;

    /**
    * 初始化
    */
    protected onInit(): void {
        this.demoName = this._view.getChild("demoName").asTextField;
        this.demoName.text = DemoMenu.TIMER;
        this.content = this._view.getChild("content").asTextField;

        this.btnOnce = this._view.getChild("btnOnce").asButton;
        this.btnOnce.addClickListener(this.onBtnOnceClick, this);
        this.btnLoop = this._view.getChild("btnLoop").asButton;
        this.btnLoop.addClickListener(this.onBtnLoopClick, this);
        this.btnFrame = this._view.getChild("btnFrame").asButton;
        this.btnFrame.addClickListener(this.onBtnFrameClick, this);
        this.btnFrameLoop = this._view.getChild("btnFrameLoop").asButton;
        this.btnFrameLoop.addClickListener(this.onBtnFrameLoopClick, this);
        this.btnFourTimes = this._view.getChild("btnFourTimes").asButton;
        this.btnFourTimes.addClickListener(this.onBtnFourTimesClick, this);
        this.btnUnLoop = this._view.getChild("btnUnLoop").asButton;
        this.btnUnLoop.addClickListener(this.onBtnUnLoopClick, this);
        this.btnUnFrameLoop = this._view.getChild("btnUnFrameLoop").asButton;
        this.btnUnFrameLoop.addClickListener(this.onBtnUnFrameLoopClick, this);

        var btnClose = this._view.getChild("close").asButton;
        if (btnClose) {
            btnClose.addClickListener(this.onBtnCloseClick, this);
        }
    }

    /**
     * 显示
     */
    protected onShow(...args: Array<any>): void {
        this.count = 0;
        this.content.text = "点击按钮开始测试计时器 count=" + this.count;
    }

    /**
     * 关闭
     */
    protected onClose(): void {
        this.count = 0;
        this.onBtnUnFrameLoopClick();
        this.onBtnUnLoopClick();
    }

    /**
     * 销毁
     */
    protected onDispose(): void {
        console.log("登录UI被销毁");
    }

    private onBtnOnceClick(): void {
        TimerManager.inst.registerOnce(4000, () => {
            this.count++;
            this.content.text = "4秒后执行了计时器 一次  " + this.count;
        }, this)
    }

    private onBtnLoopClick(): void {
        TimerManager.inst.registerLoop(4000, this.timerLoopCallback, this)
    }

    private timerLoopCallback(): void {
        this.count++;
        this.content.text = "4秒后执行了计时器 循环  " + this.count;
    }

    private onBtnFrameClick(): void {
        TimerManager.inst.registerFrameOnce(300, () => {
            this.count++;
            this.content.text = "300帧后执行了计时器 一次  " + this.count;
        }, this)
    }

    private onBtnFrameLoopClick(): void {
        TimerManager.inst.registerFrameLoop(300, this.timerFrameLoopCallback, this)
    }

    private timerFrameLoopCallback(): void {
        this.count++;
        this.content.text = "300帧后执行了计时器 循环  " + this.count;
    }

    private onBtnFourTimesClick(): void {
        TimerManager.inst.register(false, 4000, () => {
            this.count++;
            this.content.text = "4秒后执行了计时器 多次  " + this.count;
        }, this, 4)
    }

    private onBtnUnLoopClick(): void {
        TimerManager.inst.unRegister(this.timerLoopCallback, this)
        this.count = 0;
        this.content.text = "移除循环计时器  " + this.count;
    }

    private onBtnUnFrameLoopClick(): void {
        TimerManager.inst.unRegister(this.timerFrameLoopCallback, this)
        this.count = 0;
        this.content.text = "移除帧循环计时器  " + this.count;
    }

    private onBtnCloseClick(): void {
        this.close();
        LayerManager.inst.dispatchUIEvent(UIViewEvent.MENU_VIEW_CLOSE, false, [DemoMenu.TIMER]);
    }
}