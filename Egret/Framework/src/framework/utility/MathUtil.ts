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
	
	/**
	 * 随机浮点数
	 */
	public static randomRange(min:number, max:number):number {
		return Math.random() * (max - min) + min;
	}

	/**
	 * 随机整数
	 */
	public static randomRangeInt(min:number, max:number):number {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}

} 


