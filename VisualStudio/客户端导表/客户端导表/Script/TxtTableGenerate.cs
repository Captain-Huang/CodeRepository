using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

class TxtTableGenerate
{
    public static string GenerateTxtTable(DataTable data)
    {
        string txtTbStr = "";                                                                                                                                                     

        Dictionary<int, bool> exportKeyValues = new Dictionary<int, bool>();

        for (int j = 0; j < data.Columns.Count; ++j)
        {
            string exportStr = data.Rows[3][j].ToString();
            bool isExport = (exportStr == "cs" || exportStr == "c");
            exportKeyValues[j] = isExport;
        }

        for (int i = 0; i < data.Rows.Count; ++i)
        {
            for (int j = 0; j < data.Columns.Count; ++j)
            {
                if (i > 3)
                {
                    if (exportKeyValues[j] == true)
                    {
                        txtTbStr += (data.Rows[i][j].ToString() + "    ");
                    }
                }
            }
            if (i > 3)
            {
                txtTbStr += "\r\n";
            }
        }
        return txtTbStr;
    }
}

