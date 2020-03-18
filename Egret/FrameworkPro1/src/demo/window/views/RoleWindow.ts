/**
 * 测试窗口
 */
class RoleWindow extends AbstractUIWindow {
    private content:fgui.GTextField;

	/**
	 * 资源列表
	 */
	protected getResList(): Array<string> {
		return ["RoleWindow"];
	}

	protected onInit(): void {
        this._view = UICore.createObject("RoleWindow", "RoleWindow").asCom;
        this.content = this._view.getChild("content").asTextField;
	}

	protected onShow(...args: Array<any>): void {   
        this.content.text = "点击空白处关闭窗口";
	}

	protected onClose(closeType: string): void {

	}

	protected onDispose(): void {

	}
}