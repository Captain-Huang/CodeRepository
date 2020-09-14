/**
 * 四叉树范围
 */
class QuadTreeRect {
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
        return this.x;
    }

    public get right():number {
        return this.x + this.width;
    }

    public get top():number {
        return this.y;
    }

    public get bottom():number {
        return this.y + this.height;
    }

    public get centerX():number {
        return this.x + this.width / 2;
    }

    public get centerY():number {
        return this.y + this.height / 2;
    }
}