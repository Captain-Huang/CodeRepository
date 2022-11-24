/**
 * 物体外包框
 */
class QuadTreeBounds {
    x:number;
    y:number;
    width:number;
    height:number;

    public constructor(x:number, y:number, width:number = 0, height:number = 0) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    public get left():number {
        return this.x - this.width / 2;
    }

    public get right():number {
        return this.x + this.width / 2;
    }

    public get top():number {
        return this.y - this.height / 2;
    }

    public get bottom():number {
        return this.y + this.height / 2;
    }
}