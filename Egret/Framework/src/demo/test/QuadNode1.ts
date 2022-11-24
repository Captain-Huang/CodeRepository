class QuadNode1 extends egret.Sprite implements IQuadTreeItem {

    public bounds:QuadTreeBounds;
    public speedX:number;
    public speedY:number;

    public constructor() {
        super();
    }

    public init(x:number, y:number, width:number, height:number):void {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.bounds = new QuadTreeBounds(x, y, width, height);
    }

    public drawColor(color:number):void {
        this.graphics.clear();
        this.graphics.beginFill(color);
        this.graphics.drawRect(0, 0, this.width, this.height);
        this.graphics.endFill();
    }

    public update(deltaTime:number):void {
        this.x += this.speedX * deltaTime;
        this.y += this.speedY * deltaTime;

        this.bounds.x = this.x;
        this.bounds.y = this.y;
    }

    public intersect(target:QuadNode1):boolean {
         return this.bounds.left < target.bounds.right && this.bounds.right > target.bounds.left && this.bounds.top < target.bounds.bottom && this.bounds.bottom > target.bounds.top;
    }
}