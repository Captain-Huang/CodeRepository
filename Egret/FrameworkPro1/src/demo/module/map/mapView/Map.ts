/**
 * 2D地图（卡马克滚轴）
 */
class Map {
    public mapVo: MapVo;

    public mapContainer: BaseSprite;
    public blockContainer: BaseSprite;
    private topLeftPos: egret.Point;    // 渲染区域的原点
    private centerPos: egret.Point;
    private startTileX: number;
    private startTileY: number;


    private prePos: egret.Point;


    // 当前缓冲区
    private curBlocks: Array<MapBlock>;
    // 移动后缓冲区
    private nextBlocks: Array<MapBlock>;
    private curBlockLoadItems: Array<LoadItem>;
    private nextBlockLoadItems: Array<LoadItem>;

    public init(): void {
        this.curBlocks = [];
        this.nextBlocks = [];
        this.curBlockLoadItems = [];
        this.nextBlockLoadItems = [];

        this.mapContainer = new BaseSprite();
        this.blockContainer = new BaseSprite();
        this.mapContainer.addChild(this.blockContainer);
        this.prePos = new egret.Point(0, 0);
        this.topLeftPos = new egret.Point();
        this.centerPos = new egret.Point();
    }

    public showMap(mapVo: MapVo, x?: number, y?: number): void {
        this.mapVo = mapVo;
        if (!x || !y) {
            x = mapVo.mapWidth / 2;
            y = mapVo.mapHeight / 2;
        }
        this.centerPos.x = x;
        this.centerPos.y = y;

        this.render();
    }

    public render(): void {
        // 计算block区域起点
        var xx: number = this.centerPos.x - this.mapVo.renderWidhtHalf;;
        var yy: number = this.centerPos.y - this.mapVo.renderHeightHalf;
        xx = xx - xx % this.mapVo.gridWidth;
        yy = yy - yy % this.mapVo.gridHeight;
        if (xx < 0) {
            xx = 0;
        }
        if (yy < 0) {
            yy = 0;
        }
        if (xx + this.mapVo.renderWidth > this.mapVo.mapWidth) {
            xx = this.mapVo.mapWidth - this.mapVo.renderWidth;
        }
        if (yy + this.mapVo.renderHeight > this.mapVo.mapHeight) {
            yy = this.mapVo.mapHeight - this.mapVo.renderHeight;
        }
        this.topLeftPos.x = xx;
        this.topLeftPos.y = yy;
        this.startTileX = Math.floor(xx / this.mapVo.gridWidth);
        this.startTileY = Math.floor(yy / this.mapVo.gridHeight);

        // 所有数据替换
        if (Math.abs(this.centerPos.x - this.prePos.x) > this.mapVo.renderWidth / 2 || Math.abs(this.centerPos.y - this.prePos.y) > this.mapVo.renderWidth / 2) {
            // 计算block区域
            var blockAreaWidth: number = this.mapVo.renderWidth + this.mapVo.gridWidth;
            var blockAreaHeight: number = this.mapVo.renderHeight + this.mapVo.gridHeight;

            this.curBlocks.length = 0;
            this.nextBlocks.length = 0;
            this.curBlockLoadItems.length = 0;
            this.nextBlockLoadItems.length = 0;

            var startTileX: number = this.topLeftPos.x / this.mapVo.gridWidth;
            var endTileX: number = startTileX + blockAreaWidth / this.mapVo.gridWidth;
            var startTileY: number = this.topLeftPos.y / this.mapVo.gridHeight;
            var endTileY: number = startTileY + blockAreaHeight / this.mapVo.gridHeight;
            for (var i = startTileX; i < endTileX; i++) {
                for (var j = startTileY; j < endTileY; j++) {
                    var block: MapBlock = new MapBlock();
                    block.id = i * 1000 + j;
                    block.setSize(this.mapVo.gridWidth, this.mapVo.gridHeight);
                    block.moveTo(i * this.mapVo.gridWidth, j * this.mapVo.gridHeight);
                    this.nextBlocks.push(block);

                    var loadItem: LoadItem = new LoadItem();
                    loadItem.url = block.id.toString();
                    this.nextBlockLoadItems.push(loadItem);
                }
            }
        } else {
            // 卷轴数据替换
            if (Math.abs(this.topLeftPos.x - this.mapContainer.x) < this.mapVo.gridWidth) {

            }
        }

        // 加载资源渲染
        this.loadRes();
    }

    private createBlocks():void {
        var maxTileX:number = Math.ceil(this.mapVo.renderWidth / this.mapVo.gridWidth) + 1;
        var maxTileY:number = Math.ceil(this.mapVo.renderHeight / this.mapVo.gridHeight) + 1;

    }

    private loadRes(): void {
        // TODO 加载新队列，释放老队列
        App.loadManager.loadItems(this.nextBlockLoadItems);
    }

    public moveMap(x: number, y: number): void {

    }

    public moveMapOffset(x: number, y: number): void {

    }
}