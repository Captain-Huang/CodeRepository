
class EmptyView extends AbstractUIView {
    private contentText: fgui.GTextField;
    private demoNameText: fgui.GTextField;

    /**
     * 初始化
     */
    protected onInit(): void {
        this.demoNameText = this._view.getChild("demoName").asTextField;
        this.contentText = this._view.getChild("content").asTextField;
        var btnClose = this._view.getChild("close").asButton;
        if (btnClose) {
            btnClose.addClickListener(this.onBtnCloseClick, this);
        }
    }

    /**
     * 显示
     */
    protected onShow(demoName: string = "", content: string = ""): void {
        this.demoNameText.text = demoName;
        this.contentText.text = content;
    }

    /**
     * 关闭
     */
    protected onClose(): void {

    }

    /**
     * 销毁
     */
    protected onDispose(): void {

    }

    private onBtnCloseClick(): void {
        this.close();
        LayerManager.inst.dispatchUIEvent(UIViewEvent.MENU_VIEW_CLOSE, false, [this.demoNameText.text]);
    }
}