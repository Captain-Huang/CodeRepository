using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Configuration;
using System.Xml;
using ICSharpCode.SharpZipLib.Zip;

namespace 客户端导表
{
    class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine("开始导表!");

            Dictionary<string, string> configDict = new Dictionary<string, string>();
            Dictionary<string, string> tableNameDict = new Dictionary<string, string>();

            string excelPath = "";
            string txtPath = "";
            string codePath = "";
            string codeBasePath = "";
            string codeClassPath = "";
            string codeNamespace = "game_config";
            string packageMode = "true";
            string compress = "true";

             // 读取配置
             var doc = new XmlDocument();
            doc.Load("setting.config");

            var root = doc.DocumentElement;
            var pathElemList = root.SelectSingleNode("pathSettings").ChildNodes;
            foreach (XmlNode item in pathElemList)
            {
                if (item.NextSibling != null)
                {
                    configDict[item.NextSibling.Name] = item.NextSibling.InnerText;
                }
            }
            // 读取到所有表格
            var nodes = doc.SelectSingleNode("setting/excelSettings").ChildNodes;
            foreach (XmlNode node in nodes)
            {
                if (node.Attributes != null)
                {
                    var key = node.Attributes[0].InnerText;
                    var value = node.Attributes[1].InnerText;
                    tableNameDict[key] = value;
                }
            }             foreach (KeyValuePair<string, string> item in tableNameDict)
            {
                Console.WriteLine(" ------------------  正在导出 " + item.Key + "  ------------------");
                var excelFilePath = excelPath + item.Key;
                var codeBaseOutPath = codeBasePath + item.Value;
                var excelFileName = FileHelper.GetFileName(item.Key);
                var codeFileName = item.Key;
                var dataFileName = item.Key;
                var dataOutPath = txtPath + codeFileName + ".txt";

                // 读取Excel
                var tbData = ExcelHelper.ReadExcel(excelFilePath);
                // 将Excel数据转成对应的文本格式
                var codeStr = TSGenerate.GenerateCode(tbData, excelFileName, codeFileName);
                // 导出转化后的文本
                FileHelper.WriteText(codeBaseOutPath, codeStr, true);
                // 导出数据
                var txtTbStr = TxtTableGenerate.GenerateTxtTable(tbData);
                FileHelper.WriteText(dataOutPath, txtTbStr, true);
            }

            if (compress == "true")
            {
                Console.WriteLine("----------------------- 正在压缩表数据 -----------------------");

                string zipPath = txtPath;
                Directory.CreateDirectory(Path.GetDirectoryName(zipPath));
                using (ZipOutputStream s = new ZipOutputStream(File.Create(zipPath + "table.byte")))
                {
                    s.SetLevel(6);
                    ZipUtil.CompressDir(s, zipPath);
                    s.Finish();
                    s.Close();
                }
            }
            
            Console.WriteLine("----------------------- 正在copy代码类 -----------------------");

            //CmdUtil.ProcessCommand()

            Console.WriteLine("----------------------- 导表完成，请按任意键退出 -----------------------");
            Console.Read();
        }
    }
}
