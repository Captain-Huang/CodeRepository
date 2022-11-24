/**
 * 数组帮助类
 */
class ArrayUtil {
    /**
     * 非重复项添加
     */
    public static addItems<T>(source: Array<T>, ...args: Array<T>): void {
        if (source) {
            for (var item of args) {
                if (source.indexOf(item) == -1) {
                    source.push(item);
                }
            }
        }
    }

    /**
     * 移除存在项
     */
    public static removeItems<T>(source: Array<T>, ...args: Array<T>): void {
        if (source) {
            for (var item of args) {
                var index = source.indexOf(item);
                if (index != -1) {
                    source.splice(index, 1);
                }
            }
        }
    }

    /**
     * 非重复项添加
     */
    public static addArrayItems<T>(source: Array<T>, target: Array<T>): void {
        if (source && target) {
            for (var item of target) {
                if (source.indexOf(item) == -1) {
                    source.push(item);
                }
            }
        }
    }
}