class AlertWindow extends AbstractUIWindow {

    protected _txtInfo: fairygui.GRichTextField;
    private _txtTitle:fairygui.GTextField;
    private _checkText: fairygui.GTextField;
    private _ckeckBtnCtr: fairygui.Controller;
    private _checkBtn: fairygui.GButton;

    protected _defaultOKText: string;
    protected _defaultCancelText: string;
    protected _defaultTitleText: string;

    protected _text: string;
    protected _type: AlertType;
    protected _okCallback: Handler;
    protected _cancelCallback: Handler;
    protected _closeCallback: Handler;
    protected _callback: Handler;
    protected _okText: string;
    protected _cancelText: string;

    protected getResList(): Array<string> {
        return ["Alert"];
    }

    protected onInit(): void {
        this._view = UICore.createObject("Alert", "AlertWindow").asCom;

        this._txtInfo = this._view.getChild("txtInfo").asRichTextField;
        this._txtTitle = this._view.getChild("txtTitle").asTextField;
        this._checkText = this._view.getChild("checkText").asTextField;
        this._ckeckBtnCtr = this._view.getController("ckeckBtnCtr");
        this._checkBtn = this._view.getChild("checkBtn").asButton;

        this._defaultOKText = "确定";
        this._defaultCancelText = "取消";
        this._defaultTitleText = "";
    }

    protected onShow(text: string, titleText?: string, type?: AlertType, okCallback?: Handler, cancelCallback?: Handler, closeCallback?: Handler, callback?: Handler, okText?: string, cancelText?: string, checkText?: string): void {
        this._text = text;
        this._type = type || AlertType.ok;
        this._okCallback = okCallback;
        this._cancelCallback = cancelCallback;
        this._closeCallback = closeCallback;
        this._callback = callback;
        this._okText = okText || this._defaultOKText;
        this._cancelText = cancelText || this._defaultCancelText;
        this._txtTitle.text = titleText || this._defaultTitleText;

        if (this._type == AlertType.ok) {
            this._cancelButton.visible = false;
            this._okButton.x = (this._view.width - this._okButton.width) / 2;
        } else {
            this._cancelButton.visible = true;
            var w: number = this._cancelButton.width + this._okButton.width + 60;
            var x = (this._view.width - w) / 2;
            this._cancelButton.x = x;
            this._okButton.x = x + this._cancelButton.width + 60;
            this._cancelButton.text = this._cancelText;
        }
        this._okButton.text = this._okText;
        this._txtInfo.text = this._text;
    }

    protected onClose(closeType: string): void {
        var clickCallback: Handler;
        if (closeType == WindowCloseType.OK) {
            clickCallback = this._okCallback;
        } else if (closeType == WindowCloseType.CANCEL) {
            clickCallback = this._cancelCallback;
        } else {
            clickCallback = this._closeCallback;
        }
        var callback: Handler = this._callback;

        this._okCallback = null;
        this._cancelCallback = null;
        this._closeCallback = null;
        this._callback = null;

        if (clickCallback != null) {
            clickCallback.run();
        }
        if (callback != null) {
            callback.run();
        }
    }

    protected onDispose(): void {

    }
}