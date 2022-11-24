/**
 * 世界数据模型
 * 场景内的单位信息（包括玩家自己的场景数据）
 */
class ModelWorld extends AbstractModel {

    public myRole: RoleVo;

    protected init():void {
        // 客户端模拟数据
        this.myRole = new RoleVo();
    }

    
}