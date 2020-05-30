/**
 * 角色模块
 */
class ModuleRole extends AbstractModule {

    // public mapObjectView: MapObjectView;
    public controller: RoleController;
    public controlRole: Role;

    public createRole(roleData: RoleData): Role {
        var roleObject: RoleObject = RoleObjectFactory.createRoleObject(roleData);
		var role: Role = ObjectPoolManager.inst.getObject(Role) as Role;
		role.roleData = roleData;
		role.roleObject = roleObject;
		return role;
    }

    public setControlRole(role:Role):void {
        this.controlRole = role;
    }
}
