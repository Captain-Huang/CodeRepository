/**
 * 角色
 */
class Role implements IPoolObject {

    public roleData: RoleData;
    public roleObject: RoleObject;

    public pauseState: boolean = false;
    public pauseObject: boolean = false;
    public playRate: number = 1;

    public update(deltaTime: number): void {

    }

    protected updateState(deltaTime: number):void {
        
    }

    /**
     * 取出
     */
    onPoolGet(): void {

    }

    /**
     * 放入池时重置
     */
    onPoolReset(): void {

    }

    /**
     * 销毁
     */
    onPoolDispose(): void {

    }
}