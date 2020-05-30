/**
 * 角色数据
 */
class RoleVo extends AbstractVo implements IPoolObject {

    public spriteType: EnumSpriteType;


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