/**
 * 管理器基类
 */
class Manager extends egret.EventDispatcher implements IManager {

	public constructor() {
		super();
		this.init();
	}

	public get needUpdate():boolean {
		return false;
	}

	protected init():void {

	}

	public update(deltaTime:number) {

	}
}