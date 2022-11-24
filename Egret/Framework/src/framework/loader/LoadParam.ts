
class LoadParam {
    public static readonly RETRY_COUNT: string = "RETRY_COUNT";
    public static readonly VERSION: string = "VERSION";
    public static readonly WEIGHT: string = "WEIGHT";

    public id: string;
    public value: any;

    public constructor(id: string, value: any) {
        this.id = id;
        this.value = value;
    }
}