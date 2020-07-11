/**
 * 2D地图（卡马克滚轴）
 */
class Map {
    public mapContainer: BaseSprite;
    public blockContainer: BaseSprite;

    public mapVo: MapVo;

    // 当前缓冲区
    private curBlocks: Array<MapBlock>;
    // 移动后缓冲区
    private nextBlocks: Array<MapBlock>;

    public init(): void {
        this.curBlocks = [];
        this.nextBlocks = [];

        this.mapContainer = new BaseSprite();

    }

    public showMap(mapVo: MapVo, x?: number, y?: number): void {
        this.mapVo = mapVo;
        if (!x || !y) {
            x = mapVo.mapWidth / 2;
            y = mapVo.mapHeight / 2;
        }
    }

    public render(): void {

    }

    public moveMap(x: number, y: number): void {

    }

    public moveMapOffset(x: number, y: number): void {

    }
}