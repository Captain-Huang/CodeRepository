/**
 * 范围四叉树节点
 */
class BoundsTreeNode<T extends IQuadTreeItem> {

    public rect:QuadTreeRect;
    public depth:number;
    public maxDepth:number;
    public maxChildren:number;
    public n1:BoundsTreeNode<T>;
    public n2:BoundsTreeNode<T>;
    public n3:BoundsTreeNode<T>;
    public n4:BoundsTreeNode<T>;
    public children:Array<T>;
    public divided:boolean;

    public constructor(rect:QuadTreeRect, depth:number, maxDepth:number, maxChildren:number) {
        this.rect = rect;
        this.depth = depth;
        this.maxDepth = maxDepth;
        this.maxChildren = maxChildren;
        this.children = [];
    }

    public get isLeaf():boolean {
        return this.depth >= this.maxDepth;
    }

    /**
     * 插入对象
     */
    public insert(item:T):void {
        if (this.divided) {
            var b:QuadTreeBounds = item.bounds;
            var node:BoundsTreeNode<T> = this.findNode(b);

            if (b.left >= node.rect.left && b.right <= node.rect.right &&
                b.top >= node.rect.top && b.bottom <= node.rect.bottom) {
                node.insert(item);
            } else {
                this.children.push(item);
                (<any>item).parentNode = this;
            }
            return;
        }

        this.children.push(item);
        (<any>item).parentNode = this;

        var length:number = this.children.length;
        if (!this.isLeaf && length > this.maxChildren) {
            this.subdivide();
            for (var i = 0; i < length; i++) {
                item = this.children[i];
                (<any>item).parentNode = null;
                this.insert(item);
            }
            this.children.length = 0;
        }
    }

    /**
     * 返回对象列表
     */
    public retrieve(bounds:QuadTreeBounds, outList:Array<T>):Array<T> {
        if (this.divided) {
            var node:BoundsTreeNode<T> = this.findNode(bounds);

            if (bounds.left >= node.rect.left && bounds.right <= node.rect.right &&
                bounds.top >= node.rect.top && bounds.bottom <= node.rect.bottom) {
                node.retrieve(bounds, outList);
            } else {
                if (bounds.left <= this.n2.rect.left) {
                    if (bounds.top <= this.n3.rect.top) {
                        this.n1.getAllChildren(outList);
                    }

                    if (bounds.bottom > this.n3.rect.top) {
                        this.n3.getAllChildren(outList);
                    }
                }
                
                if (bounds.right > this.n2.rect.left) {
                    if (bounds.top <= this.n4.rect.top) {
                        this.n2.getAllChildren(outList);
                    }

                    if (bounds.bottom > this.n4.rect.top) {
                        this.n4.getAllChildren(outList);
                    }
                }
            }
        }

        for (var child of this.children) {
            outList.push(child);
        }

        return outList;
    }

    /**
     * 获取所有对象
     */
    public getAllChildren(outList:Array<T>):Array<T> {
        if (this.divided) {
            this.n1.getAllChildren(outList);
            this.n2.getAllChildren(outList);
            this.n3.getAllChildren(outList);
            this.n4.getAllChildren(outList);
        }
        for (var child of this.children) {
            outList.push(child);
        }
        return outList;
    }

    /**
     * 查找索引
     */
    public findNode(bounds:QuadTreeBounds):BoundsTreeNode<T> {
        var left:boolean = bounds.x > this.rect.centerX ? false : true;
        var top:boolean = bounds.y > this.rect.centerY ? false : true;

        if (left) {
            return top ? this.n1 : this.n3;
        } else {
            return top ? this.n2 : this.n4;
        }
    }

    /**
     * 拆分节点
     */
    protected subdivide():void {
        if (this.divided) {
            return;
        }

        var depth:number = this.depth + 1;
        var bx:number = this.rect.x;
        var by:number = this.rect.y;
        var b_w_h:number = this.rect.width / 2;
        var b_h_h = this.rect.height / 2;
        var bx_b_w_h = bx + b_w_h;
        var by_b_h_h = by + b_h_h;
        this.n1 = new BoundsTreeNode<T>(new QuadTreeRect(bx, by, b_w_h, b_h_h), depth, this.maxDepth, this.maxChildren);
        this.n2 = new BoundsTreeNode<T>(new QuadTreeRect(bx_b_w_h, by, b_w_h, b_h_h), depth, this.maxDepth, this.maxChildren);
        this.n3 = new BoundsTreeNode<T>(new QuadTreeRect(bx, by_b_h_h, b_w_h, b_h_h), depth, this.maxDepth, this.maxChildren);
        this.n4 = new BoundsTreeNode<T>(new QuadTreeRect(bx_b_w_h, by_b_h_h, b_w_h, b_h_h), depth, this.maxDepth, this.maxChildren);

        this.divided = true;
    }

    /**
     * 清理
     */
    public clear():void {
        this.children.length = 0;
        if (this.divided) {
            this.n1.clear();
            this.n2.clear();
            this.n3.clear();
            this.n4.clear();
            this.n1 = null;
            this.n2 = null;
            this.n3 = null;
            this.n4 = null;
            this.divided = false;
        }
    }
}