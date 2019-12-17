/**
 * 对象帮助类
 */
class ObjectUtil {
    /**
     * 清理
     */
    public static clear(source:Object):void {
        if (source) {
            for (var key in source) {
                delete source[key];
            }
        }
    }
}