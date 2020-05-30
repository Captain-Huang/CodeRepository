/**
 * 基础精灵
 */
class BaseSprite extends egret.Sprite {
    public constructor(){
        super();
        this.touchEnabled = true;
    }

    
    /**
     * 居中
     */
    public center(offsetX:number = 0, offsetY:number = 0):void {
        DisplayUtil.center(this, offsetX, offsetY);
    }

    /**
     * 居中于父对象
     */
    public centerToParent(offsetX:number = 0, offsetY:number = 0):void {
        DisplayUtil.centerToParent(this, offsetX, offsetY);
    }

    /**
     * 移动到
     */
    public moveTo(x:number, y:number):void {
        this.x = x;
        this.y = y;
    }

    /**
     * 设置尺寸
     */
    public setSize(width:number, height:number):void {
        this.width = width;
        this.height = height;
    }

    /**
     * 缩放
     */
    public get scale():number {
        return this.scaleX;
    }

    public set scale(value:number) {
        this.scaleX = this.scaleY = value;
    }

    /**
     * 根据名称移除子对象
     */
    public removeChildByName(name:string):egret.DisplayObject {
        var child:egret.DisplayObject = this.getChildByName(name);
        if (child != null) {
            return this.removeChild(child);
        }
        return null;
    }

    /**
     * 从父对象中移除
     */
    public remove():void {
        if (this.parent != null && this.parent.contains(this)) {
            this.parent.removeChild(this);
        }
    }

}
