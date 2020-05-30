using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

class TSGenerate
{
    public static string GenerateCode(DataTable data, string fileName, string className)
    {
        string codeStr = "";

        // 生成类注释
        string annotationStr = @"/**
* File is automatically generated, Please do not modify
* " + fileName + @"
*/
";
        codeStr += annotationStr;
        // 生成命名空间和类
        string classNameStr = @"module game_config {
export class $" + className + @" {

";
        codeStr += classNameStr;

        // 生成变量和函数
        string varStr = "";
        string varAssignmentStr = "";

        for (int i = 0; i < data.Columns.Count; ++i)
        {
            string varAnnotation = "";
            string varName = "";
            string varType = "";
            bool isExport = false;
            for (int j = 0; j < data.Rows.Count; ++j)
            {
                if (j > 3) break; ;
                var cellValue = data.Rows[j][i].ToString();
                // 生成变量
                if (j == 0)
                {
                    // 字段注释
                    varAnnotation ="    // " + cellValue + "\r\n";
                }
                if (j == 1)
                {   
                    // 字段名
                    varName = cellValue;
                }
                if (j == 2)
                {
                    // 字段类型
                    varType = GenerateVarCode(cellValue);
                }
                if (j == 3)
                {
                    // 是否导出客户端
                    isExport = (cellValue == "cs" || cellValue == "c");
                    if (isExport)
                    {
                        varStr += (varAnnotation + "    public " + varName + ":" + varType + ";\r\n");

                        // 生成函数
                        varAssignmentStr += GenerateVarAssignmentCode(i, varName, varType);
                    }
                }
            }
        }
        codeStr += varStr;
        codeStr += @"
	/**
	 * 初始化数据
	 */
	public initData():void {
	}

	/**
	 * 读取txt文件填充数据, 返回配置ID
	 */
	public fillData(row:Array<string>):any {
		var filedArr:Array<string>;

";
        codeStr += varAssignmentStr;
        codeStr += @"
        return this.ID;
";
        // 处理结尾
        var endStr = "    }\r\n}\r\n}";
        codeStr += endStr;
        return codeStr;
    }

    public static string GenerateClassCode(string fileName, string className)
    {
        string codeStr = "";

        // 生成类注释
        string annotationStr = @"/**
* " + fileName + @"
*/
";
        codeStr += annotationStr;
        // 生成类名
        string classNameStr = String.Format("class {0} extends game_config.${1} implements ITxtTable {2}", className, className, "{\r\n\r\n}");

        codeStr += classNameStr;
        return codeStr;
    }

    public static string GenerateTables(Dictionary<string, string> keyValuePairs)
    {
        string codeStr = "";
        string annotationStr = @"/**
 * File is automatically generated, Please do not modify
 */
class Tables {
";
        codeStr += annotationStr;
        foreach (var item in keyValuePairs)
        {
            string annotationTableStr = @"    /**
    * " + item.Key + @"
    */
";
            codeStr += annotationTableStr;
            string tableVarStr = string.Format("    public static readonly {0}:string = \"{1}\";\r\n\r\n", item.Value, item.Value);
            codeStr += tableVarStr;
        }
        string str1 = @"
	/**
	 * 所有表数组
	 */
	public static readonly allTables:Array<string> = [
";
        codeStr += str1;
        foreach (var item in keyValuePairs)
        {
            string str2 = string.Format("        Tables.{0},\r\n", item.Value);
            codeStr += str2;
        }
        codeStr += @"	];
}
";
        return codeStr;
    }

        private static string GenerateVarCode(string tbVar)
    {
        string newStr = "";
        switch (tbVar)
        {
            case "int":
                newStr = TSParamType.number;
                break;
            case "int[]":
                newStr = TSParamType.number_array;
                break;
            case "string":
                newStr = TSParamType.str;
                break;
            case "string[]":
                newStr = TSParamType.str_array;
                break;
            case "bool":
                newStr = TSParamType.boolean;
                break;
        }
        return newStr;
    }

    private static string GenerateVarAssignmentCode(int index, string tsVar, string varType)
    {
        string newStr = "";
        switch (varType)
        {
            case "number":
                newStr = "        this." + tsVar + " = " + "+row[" + index + "];\r\n";
                break;
            case "Array<number>":
                newStr = "        if (row[" + index + "] == \"\") {\r\n" + "            this." + tsVar + " = new Array<number>();\r\n        } else {\r\n            filedArr = row[" + index + "].split(\',\');\r\n            this." + tsVar + " = new Array<number>()\r\n            for (var i = 0; i < filedArr.length; i++) {\r\n                this." + tsVar + "[" + index + "] = +filedArr[" + index + "];\r\n            }\r\n        }\r\n"; 
                break;
            case "string":
                newStr = "        this." + tsVar + " = " + "row[" + index + "];\r\n";
                break;
            case "Array<string>":
                newStr = "        if (row[" + index + "] == \"\") {\r\n" + "            this." + tsVar + " = new Array<string>();\r\n        } else {\r\n            filedArr = row[" + index + "].split(\',\');\r\n            this." + tsVar + " = new Array<string>()\r\n            for (var i = 0; i < filedArr.length; i++) {\r\n                this." + tsVar + "[i] = filedArr[i];\r\n            }\r\n        }\r\n";
                break;
            case "boolean":
                newStr = "        this." + tsVar + " = " + "row[" + index + "]" + " == \"1\" ? true : false;\r\n";
                break;
        }
        return newStr;
    }
}

class TSParamType
{
    public static readonly string number = "number";
    public static readonly string number_array = "Array<number>";
    public static readonly string str = "string";
    public static readonly string str_array = "Array<string>";
    public static readonly string boolean = "boolean";
    public static readonly string nul = "null";
}

class TbParamType
{
    public static readonly string _int = "int";
    public static readonly string _int_array = "int[]";
    public static readonly string _str = "string";
    public static readonly string _str_array = "string[]";
    public static readonly string _bool = "bool";
    public static readonly string nul = "null";
}