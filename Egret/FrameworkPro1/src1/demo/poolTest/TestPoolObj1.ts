
class TestPoolObj1 implements IPoolObject {

    public count:number = 0;

    public init():void {
        this.count = 22;
    }

    /**
     * 取出
     */
    public onPoolGet(): void {

    }

    /**
     * 放入池时重置
     */
    public onPoolReset(): void {
        console.log("对象入池，重置数据");
        this.count = 0;
    }

    /**
     * 销毁
     */
    public onPoolDispose(): void {
        console.log("对象销毁");
    }
}