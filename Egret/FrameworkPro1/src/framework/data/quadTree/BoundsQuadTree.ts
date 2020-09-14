/**
 * 范围四叉树
 */
class BoundsQuadTree<T extends IQuadTreeItem> {

    public root:BoundsTreeNode<T>;

    public constructor(rect:QuadTreeRect, maxDepth:number, maxChildren:number) {
        this.root = new BoundsTreeNode<T>(rect, 0, maxDepth, maxChildren);
    }

    /**
     * 插入
     */
    public insert(item:T):void {
        this.root.insert(item);
    }

    /**
     * 移除
     */
    public remove(item:T):void {
        var node:BoundsTreeNode<T> = (<any>item).parentNode;
        if (node) {
            var index:number = node.children.indexOf(item);
            if (index != -1) {
                node.children.splice(index, 1);
            }
            (<any>item).parentNode = null;
        }
    }

    /**
     * 重定位
     */
    public relocate(item:T):void {
        var oldNode:BoundsTreeNode<T> = (<any>item).parentNode;
        if (oldNode) {
            var newNode:BoundsTreeNode<T> = this.findNode(item.bounds);
            if (oldNode != newNode) {
                var index:number = oldNode.children.indexOf(item);
                if (index != -1) {
                    oldNode.children.splice(index, 1);
                }
                (<any>item).parentNode = null;
                newNode.insert(item);
            }
        }
    }

    /**
     * 查找节点
     */
    private findNode(bounds:QuadTreeBounds):BoundsTreeNode<T> {
        var node:BoundsTreeNode<T> = this.root;
        while (node.divided) {
            if (bounds.left >= node.rect.left && bounds.right <= node.rect.right &&
                bounds.top >= node.rect.top && bounds.bottom <= node.rect.bottom) {
                node = node.findNode(bounds);
            } else {
                break;
            }
        }
        return node;
    }

    /**
     * 返回对象列表
     */
    public retrieve(bounds:QuadTreeBounds, outList:Array<T> = null):Array<T> {
        if (outList == null) {
            outList = [];
        }
        return this.root.retrieve(bounds, outList);
    }

    /**
     * 清理
     */
    public clear():void {
        this.root.clear();
    }
}