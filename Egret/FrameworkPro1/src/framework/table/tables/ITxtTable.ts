interface ITxtTable extends ITable {

    /**
     * 填充表数据，返回唯一索引
     */
    fillData(data:Array<string>):any ;   
}