
class IntUtil {
    public static readonly MIN_VALUE: number = -2147483648;
	public static readonly MAX_VALUE: number = 2147483647;

    private static counter:number = IntUtil.MIN_VALUE;

    public static createUniqueInt():number {
        return ++IntUtil.counter;
    }
}