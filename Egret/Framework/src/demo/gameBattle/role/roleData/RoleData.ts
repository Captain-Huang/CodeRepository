// /**
//  * 角色数据
//  */
// class RoleData implements IPoolObject {

//     protected _type: number;

//     public id: number;
//     public roleVo: RoleVo;

//     public state: RoleActionState;
//     public lastState: RoleActionState;
//     public lastNoneEmptyState: RoleActionState;

//     public avatar: RoleAvatar;
//     public direction: Direction;
//     public position: MapPos;
//     public destPosition: MapPos;
//     public realPosition: MapPos;
//     public moveTime: number = 0;
//     public prepareTime: number = 0;
//     public moveFrame: number = 0;
//     public avatarVisible: boolean = true;
//     public shadowVisible: boolean = true;
//     public skillEffectVisible: boolean = true;
//     public hasShadow: boolean = true;
//     public sortingIndex: number = 0;
//     public clickSortingIndex: number = 0;
//     public ownerID: number = 0;
//     public skillChecking: boolean = false;
//     public scale: number = 1;
//     public isFlying: boolean = false;

//     public buffDict: Object;
//     public buffCount: number;
//     public buffEffectDict: Object;
//     public buffKindDict: Object;

//     public constructor() {
//         this.avatar = new RoleAvatar();
//         this.position = new MapPos();
//         this.destPosition = new MapPos();
//         this.realPosition = new MapPos();
//         this.buffDict = {};
//         this.buffEffectDict = {};
//         this.buffKindDict = {};
//         this.buffCount = 0;
//     }

//     public get type(): number {
//         return this._type;
//     }

//     public set type(value: number) {
//         this._type = value;
//         this.sortingIndex = RoleSetting.ROLE_TYPE_SORTING_MAP[value] || 0;
//         this.clickSortingIndex = RoleSetting.ROLE_TYPE_CLICK_SORTING_MAP[value] || 0;
//     }

//     public setRoleVo(roleVo: RoleVo): void {
//         this.roleVo = roleVo;
//         this.refreshRoleVo();
//     }

//     /**
//      * 刷新角色数据
//      */
//     protected refreshRoleVo(): void {
//         this.id = this.roleVo.spriteID;
//         this.type = this.roleVo.spriteType;
//         this.position.x = this.destPosition.x = this.realPosition.x = this.roleVo.x;
//         this.position.y = this.destPosition.y = this.realPosition.y = this.roleVo.y;
//         this.direction = this.roleVo.direction;
//         this.moveTime = this.roleVo.moveTime;
//         // buff
//         for (var buffID in this.roleVo.buffDict) {
//             var buffVo: BuffVo = this.roleVo.buffDict[buffID];
//             this.addBuff(buffVo);
//         }
//         this.refreshRoleAvatar();
//     }

//     /**
//      * 刷新外观
//      */
//     public refreshRoleAvatar(): void {
//         this.avatar.clothesResID = this.roleVo.clothesResID;
//         this.avatar.weaponResID = this.roleVo.weaponResID;
//         this.avatar.wingResID = this.roleVo.wingResID;
//     }

//     /**
//      * 角色拥有者
//      */
//     public get roleOwnerID(): number {
//         if (this.ownerID != 0) {
//             return this.ownerID;
//         }
//         return this.id;
//     }

//     /**
//      * 初始化
//      */
//     public init(): void {
//         this.prepareTime = 0;
//         this.moveFrame = 0;
//     }

//     /**
//      * 更新
//      */
//     public update(deltaTime: number): void {
//         if (this.prepareTime > 0) {
//             this.prepareTime -= deltaTime;
//             if (this.prepareTime < 0) {
//                 this.prepareTime = 0;
//             }
//         }
//     }

//     /**
//      * 添加到场景
//      */
//     public onAdd(): void {

//     }

//     /**
//      * 从场景中移除
//      */
//     public onRemove(): void {

//     }

//     /**
//      * 是否处于当前状态
//      */
//     public isInState(state: RoleActionState): boolean {
//         return this.state == state;
//     }

//     /**
//      * 前一state是否为指定state
//      */
//     public isInStateLast(state: RoleActionState): boolean {
//         return this.lastState == state;
//     }

//     /**
//      * 是否可设置状态
//      */
//     public canSetState(state: RoleActionState): boolean {
//         return this.state != state;
//     }

//     /**
//      * 设置状态
//      */
//     public setState(state: RoleActionState): boolean {
//         if (this.state != state) {
//             if (this.state != RoleActionState.NONE && this.state != RoleActionState.IDLE) {
//                 this.lastNoneEmptyState = this.state;
//             }
//             this.lastState = this.state;
//             this.state = state;
//             return true;
//         } else {
//             this.lastState = this.state;
//             return false;
//         }
//     }

//     /**
//      * 是否可取消状态
//      */
//     public canCancelState(state: RoleActionState): boolean {
//         return this.state == state;
//     }

//     /**
//      * 取消状态
//      */
//     public cancelState(state: RoleActionState): boolean {
//         if (this.state == state) {
//             this.setState(RoleActionState.NONE);
//             return true;
//         }
//         return false;
//     }

//     /**
//      * 是否处于空闲状态
//      */
//     public isIdleState(): boolean {
//         return this.state == RoleActionState.NONE || this.state == RoleActionState.IDLE;
//     }

//     /**
//      * 是否需要更新
//      */
//     public needUpdate(): boolean {
//         return true;
//     }
    
//     /**
//      * 空闲状态
//      */
//     public get idleAction(): number {
//         return RoleActionType.IDLE;
//     }

//     /**
//      * 备战动作
//      */
//     public get prepareAction(): number {
//         return RoleActionType.PREPARE;
//     }

//     /**
//      * 移动动作
//      */
//     public get moveAction(): number {
//         return RoleActionType.WALK;
//     }

//     /**
//      * 受击动作
//      */
//     public get beAttackAction(): number {
//         return RoleActionType.BE_ATTACK;
//     }

//     /**
//      * 被冲撞动作
//      */
//     public get beCrashAction(): number {
//         return RoleActionType.WALK;
//     }

//     /**
//      * 是否存活
//      */
//     public get isAlive(): boolean {
//         return this.roleVo.hpCur > 0;
//     }

//     /**
//      * 是否满血
//      */
//     public get isHPFull(): boolean {
//         return this.roleVo.hpCur >= this.roleVo.hpMax;
//     }

//     /**
//      * 是否锁定
//      */
//     public get isLock(): boolean {
//         return !this.isAlive;
//     }

//     /**
//      * 是否可触摸
//      */
//     public get touchable(): boolean {
//         return true;
//     }

//     /**
//      * 是否是控制自己
//      */
//     public get isMyRole(): boolean {
//         return this.roleVo.isMyRole;
//     }

//     /**
//      * 是否可播放受击动作
//      */
//     public get canPlayBeAttackAction(): boolean {
//         return false;
//     }

//     /**
//      * 是否可播放备战动作
//      */
//     public get canPlayPrepareAction(): boolean {
//         return false;
//     }

//     /**
//      * 是否可被自动攻击
//      */
//     public get canBeAutoFightTarget(): boolean {
//         return this.isAlive;
//     }

//     /**
//      * 是否可点击
//      */
//     public get canClick(): boolean {
//         return this.roleVo.clickState != protocol.EnumClickState.none;
//     }

//     /**
//      * 获取动作时间
//      */
//     public getActionTime(action: number): number {
//         if (this.avatar.clothesResCFG != null) {
//             var actionResCFG: ActionResCFG = this.avatar.clothesResCFG.getAction(action);
//             if (actionResCFG != null) {
//                 return actionResCFG.maxAnimTime;
//             }
//         }
//         return 0;
//     }

//     /**
//      * 添加buff
//      */
//     public addBuff(buffVo: BuffVo): void {
//         this.buffDict[buffVo.buffCFG.ID] = buffVo;
//         this.buffCount++;
//         this.buffEffectDict[buffVo.buffCFG.EffectType] = true;
//         this.buffKindDict[buffVo.buffCFG.KindType] = true;
//     }

//     /**
//      * 移除buff
//      */
//     public removeBuff(buffVo: BuffVo): void {
//         delete this.buffDict[buffVo.buffCFG.ID];
//         this.buffCount--;
//         delete this.buffEffectDict[buffVo.buffCFG.EffectType];
//         delete this.buffKindDict[buffVo.buffCFG.KindType];
//     }

//     /**
//      * 是否存在指定EffectType类型buff
//      */
//     public hasBuffByEffectType(effectType:number):boolean {
//         return this.buffEffectDict[effectType] == true;
//     }

//     /**
//      * 是否存在指定KindType类型buff
//      */
//     public hasBuffByKindType(kindType:number):boolean {
//         return this.buffKindDict[kindType] == true;
//     }

//     /**
//      * 清除buff
//      */
//     public clearBuff(): void {
//         ObjectUtil.clear(this.buffDict);
//         ObjectUtil.clear(this.buffEffectDict);
//         ObjectUtil.clear(this.buffKindDict);
//         this.buffCount = 0;
//     }

//     /**
//      * 取出
//      */
//     onPoolGet(): void {

//     }

//     /**
//      * 放入池时重置
//      */
//     onPoolReset(): void {

//     }

//     /**
//      * 销毁
//      */
//     onPoolDispose(): void {

//     }
// }