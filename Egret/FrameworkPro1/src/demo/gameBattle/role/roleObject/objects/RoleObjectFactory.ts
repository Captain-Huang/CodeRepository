/**
 * 角色对象工厂
 */
class RoleObjectFactory {

	/**
	 * 创建角色对象
	 */
	public static createRoleObject(roleData: RoleData): RoleObject {
		var roleObject: RoleObject;
		switch (roleData.type) {
			default:
				roleObject = ObjectPoolManager.inst.getObject(RoleObject) as RoleObject;
				break;
		}
		roleObject.roleData = roleData;
		return roleObject;
	}
}