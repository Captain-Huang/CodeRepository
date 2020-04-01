using OfficeOpenXml;
using System;
using System.Collections.Generic;
using System.Data;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


class ExcelHelper
{
    /// <summary>
    /// 读取Excel内容，返回DataTable格式数据
    /// </summary>
    /// <param name="file"></param>
    /// <returns></returns>
    public static DataTable ReadExcel(string file)
    {
        DataTable dt = new DataTable();
        using (ExcelPackage package = new ExcelPackage(new FileStream(file, FileMode.Open)))
        {
            ExcelWorksheet sheet = package.Workbook.Worksheets[1];
            int rowCount = sheet.Dimension.End.Row - sheet.Dimension.Start.Row;
            int colCount = sheet.Dimension.End.Column - sheet.Dimension.Start.Column;
            int realColCount = 0;

            //生成列头
            for (int i = 0; i < colCount; i++)
            {
                string str = (string)GetValue(sheet, 1, i + 1);
                if (!string.IsNullOrEmpty(str))
                {
                    while (dt.Columns.Contains(str)) str = str + "_1";
                    dt.Columns.Add(new DataColumn(str, typeof(string)));
                    realColCount++;
                }
            }
            // 生成行数据
            for (int iRow = 1; iRow <= rowCount; ++iRow)
            {
                DataRow dr = dt.NewRow();
                for (int iCol = 1; iCol <= realColCount; ++iCol)
                {
                    string str = (string)GetValue(sheet, iRow, iCol).ToString();
                    dr[iCol - 1] = str;
                }
                dt.Rows.Add(dr);
            }
        }
        return dt;

    }

    private static object GetValue(ExcelWorksheet sheet, int row, int column)
    {
        var str = sheet.GetValue(row, column);
        return str == null ? "" : str;
    }

    /// <summary>
    /// 将DataTable格式数据写入到Excel文件
    /// </summary>
    /// <param name="file"></param>
    /// <param name="data"></param>
    public static void WriteToExcel(string file, DataTable data)
    {
        FileInfo newFile = new FileInfo(file);
        if (newFile.Exists)
        {
            newFile.Delete();  // ensures we create a new workbook  
            newFile = new FileInfo(file);
        }
        using (ExcelPackage package = new ExcelPackage(newFile))
        {
            // add a new worksheet to the empty workbook  
            ExcelWorksheet worksheet = package.Workbook.Worksheets.Add("Sheet1");

            // --------------------
            for (int i = 0; i < data.Rows.Count; i++)
            {
                DataRow row = data.Rows[i];
                for (int j = 0; j < data.Columns.Count; j++)
                {
                    worksheet.Cells[i + 1, j + 1].Value = row[j].ToString();
                }
            }
            package.Save();
        }
    }
}
