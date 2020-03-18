/**
 * 数学帮助类
 */
class MathUtil {
	/**
	 * 范围限制
	 */
    public static rangeLimit(num: number, min: number, max: number):number {
		if (num < min) {
			num = min;
		}
		if (num > max) {
			num = max;
		}
		return num;
    }
} 


