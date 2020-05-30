/**
 * 角色数据工厂
 */
class RoleDataFactory {
    /**
     * 创建角色数据
     */
    public static createRoleData(type:EnumSpriteType):RoleData {
        var roleData:RoleData;
        switch (type) {
            default:
                roleData = ObjectPoolManager.inst.getObject(RoleData) as RoleData;
                break;
        }
        return roleData;
    }

    /**
     * 创建角色数据
     */
    public static createRoleDataByRoleVo(roleVo:RoleVo):RoleData {
        var roleData:RoleData = this.createRoleData(roleVo.spriteType);
        if (roleData != null) {
            roleData.setRoleVo(roleVo);
        }
        return roleData;
    }
}