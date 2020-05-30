
class DisplayUtil {
    
    /**
     * 居中
     */
    public static center(target:egret.DisplayObject, offsetX:number = 0, offsetY:number = 0):void {
        var x:number = (App.stageManager.screenWidth - target.width) * 0.5;
        var y:number = (App.stageManager.screenHeight - target.height) * 0.5;
        target.x = x + offsetX;
        target.y = y + offsetY;
    }

    /**
     * 居中于父对象
     */
    public static centerToParent(target:egret.DisplayObject, offsetX:number = 0, offsetY:number = 0):void {
        var parent:egret.DisplayObject = target.parent;
        if (parent != null) {
            var x:number = (parent.width - target.width) * 0.5;
            var y:number = (parent.height - target.height) * 0.5;
            target.x = x + offsetX;
            target.y = y + offsetY;
        }
    }
}