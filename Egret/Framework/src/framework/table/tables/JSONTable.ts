class JSONTable implements IJSONTable {

    protected _jsonObject:Object;
    /**
     * 初始化数据
     */
    initData(): void {

    }

    /**
    * 填充表数据，返回唯一索引
    */
    fillData(data: string): any {
        this._jsonObject = JSON.parse(data);
        this.init();
        return 0;
    }

    protected init():void {
        
    }
}