/**
 * 测试用例类
 */
class Test {

    public objects: Array<QuadNode1>;
    public tree: BoundsQuadTree<QuadNode1>;
    private currentTime: number = 0;
    protected testQuadTree(): void {
        this.objects = new Array<QuadNode1>();
        this.tree = new BoundsQuadTree<QuadNode1>(new QuadTreeRect(0, 0, 2000, 1000), 4, 10);

        for (var i = 0; i < 100; i++) {
            var obj: QuadNode1 = new QuadNode1();
            obj.init(Math.random() * 2000, Math.random() * 1000, MathUtil.randomRange(2, 10), MathUtil.randomRange(2, 10));
            obj.drawColor(0xffffff);
            this.objects.push(obj);
            obj.speedX = MathUtil.randomRange(-200, 200);
            obj.speedY = MathUtil.randomRange(-200, 200);
            this.tree.insert(obj);
            // this.addChild(obj);
        }

        egret.startTick(this.update, this);
    }

    private update(time: number): boolean {
        if (this.currentTime == 0) {
            this.currentTime = time;
            return false;
        }
        var deltaTime: number = (time - this.currentTime) / 1000;
        this.currentTime = time;

        for (var obj of this.objects) {
            obj.update(deltaTime);
            obj.drawColor(0xffffff);
        }

        for (var obj of this.objects) {
            if (obj.x < 0 || obj.x > 2000 || obj.y < 0 || obj.y > 1000) {
                obj.speedX = MathUtil.randomRange(-200, 200);
                obj.speedY = MathUtil.randomRange(-200, 200);
            }

            this.tree.relocate(obj);
            var objs: Array<QuadNode1> = this.tree.retrieve(obj.bounds);
            for (var o of objs) {
                if (obj != o && obj.intersect(o)) {
                    o.drawColor(0xff0000);
                    obj.drawColor(0xff0000);
                }
            }
        }

        return false;
    }
}