
class PoolTest implements IDemoTest {
    begin(): void {
        // 注册对象池
        ObjectPoolManager.inst.registerObjectPool(TestPoolObj1, 2, 4);
        console.log("对象池数量：" + ObjectPoolManager.inst.getObjectPool(TestPoolObj1).poolSize);

        var obj1 = ObjectPoolManager.inst.getObject(TestPoolObj1);
        console.log("对象池数量：" + ObjectPoolManager.inst.getObjectPool(TestPoolObj1).poolSize);

        var obj2 = ObjectPoolManager.inst.getObject(TestPoolObj1);
        console.log("对象池数量：" + ObjectPoolManager.inst.getObjectPool(TestPoolObj1).poolSize);

        var obj3 = ObjectPoolManager.inst.releaseObject(obj1);
        var obj4 = ObjectPoolManager.inst.getObject(TestPoolObj1);
        var obj5 = ObjectPoolManager.inst.getObject(TestPoolObj1);
        console.log("对象池数量：" + ObjectPoolManager.inst.getObjectPool(TestPoolObj1).poolSize + "   对象创建数量:" + ObjectPoolManager.inst.getObjectPool(TestPoolObj1).createCount);


    }

    stop(): void {
        ObjectPoolManager.inst.getObjectPool(TestPoolObj1).clear();
        console.log("对象池数量：" + ObjectPoolManager.inst.getObjectPool(TestPoolObj1).poolSize);
    }
}