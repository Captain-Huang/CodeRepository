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
        // Excel表路径
        public static string excelPath;
        // txt数据路径
        public static string txtPath;
        // ts表字段文件原始路径
        public static string codeBasePath;
        // 总路径
        public static string codePath;
        // ts表数据类路径
        public static string codeClassPath;

        public static string codeNamespace;
        public static bool packageMode;
        public static bool compress;


        static void Main(string[] args)
        {
            CommandLineArgs.Init(args);

            Console.WriteLine("开始导表!");
            /**
             * 1. 导出表数据类
             * 2. 导出表所有表索引文件
             * 3. 导出ts表字段文件
             * 4. 导出txt数据
             */

            Dictionary<string, string> configDict = new Dictionary<string, string>();
            Dictionary<string, string> tableNameDict = new Dictionary<string, string>();

             // 读取路径配置
             var doc = new XmlDocument();
            doc.Load("setting.config");
            var root = doc.DocumentElement;
            ParsePathSetting(root);

            // 读取配置中Excel表列表
            var nodes = doc.SelectSingleNode("setting/excelSettings").ChildNodes;
            foreach (XmlNode node in nodes)
            {
                if (node.Attributes != null)
                {
                    var key = node.Attributes[0].InnerText;
                    var value = node.Attributes[1].InnerText;
                    tableNameDict[key] = value;
                }
            }

            // 清空codeBasePath
            FileHelper.DeleteDirectory(codeBasePath);
            FileHelper.CreateDirectory(codeBasePath);
            FileHelper.CopyFile(codeBasePath + "../Common.ts", codeBasePath + "Common.ts", codeBasePath, true);

            // 生成数据
            foreach (KeyValuePair<string, string> item in tableNameDict)
            {
                Console.WriteLine("----------------------- 正在导出 " + item.Key + " -----------------------");

                var excelFilePath = excelPath + item.Key;
                var codeBaseOutPath = codeBasePath + "$" + item.Value + ".ts";
                var excelFileName = FileHelper.GetFileName(item.Key);
                var codeFileName = item.Value;
                var dataOutPath = txtPath + codeFileName + ".txt";
                var codeClassOutPath = codeClassPath + codeFileName + ".ts";

                // 读取Excel
                var tbData = ExcelHelper.ReadExcel(excelFilePath);
                // 生成表字段类
                var codeStr = TSGenerate.GenerateCode(tbData, excelFileName, codeFileName);
                FileHelper.WriteText(codeBaseOutPath, codeStr, true);
                // 生成表数据类
                var codeClassStr = TSGenerate.GenerateClassCode(excelFileName, codeFileName);
                FileHelper.WriteText(codeClassOutPath, codeClassStr, true);

                // 导出txt数据
                var txtTbStr = TxtTableGenerate.GenerateTxtTable(tbData);
                FileHelper.WriteText(dataOutPath, txtTbStr, true);
            }
            var tablesOutPath = codePath + "/Tables.ts";
            // 生成所有表索引文件
            var tablesStr = TSGenerate.GenerateTables(tableNameDict);
            FileHelper.WriteText(tablesOutPath, tablesStr, true);

            if (compress == true)
            {
                Console.WriteLine("----------------------- 正在压缩表数据 -----------------------");

                string zipPath = txtPath;
                Directory.CreateDirectory(Path.GetDirectoryName(zipPath));
                using (ZipOutputStream s = new ZipOutputStream(File.Create("table.byte")))
                {
                    s.SetLevel(6);
                    ZipUtil.CompressDir(s, zipPath);
                    s.Finish();
                    s.Close();
                }
                FileHelper.MoveFile("table.byte", zipPath + "table.byte");
                FileHelper.DeleteFile("table.byte");
            }
            
            Console.WriteLine("----------------------- 正在生成lib文件 -----------------------");

            string result = CmdUtil.ProcessCommand("build_config.bat");

            Console.WriteLine("----------------------- 导表完成，请按任意键退出 -----------------------");
            Console.Read();
        }

        private static void ParsePathSetting(XmlElement doc)
        {
            if (doc == null)
                return;
            // 路径配置
            XmlElement pathSettings = doc.GetElementsByTagName("pathSettings")[0] as XmlElement;
            if (pathSettings == null)
                return;

            excelPath = pathSettings.GetElementsByTagName("ExcelPath")[0].InnerText;
            txtPath = pathSettings.GetElementsByTagName("TxtPath")[0].InnerText;
            packageMode = pathSettings.GetElementsByTagName("PackageMode")[0].InnerText == "true";
            compress = pathSettings.GetElementsByTagName("Compress")[0].InnerText == "true";

            codePath = pathSettings.GetElementsByTagName("CodePath")[0].InnerText;
            codeBasePath = pathSettings.GetElementsByTagName("CodeBasePath")[0].InnerText;
            codeClassPath = pathSettings.GetElementsByTagName("CodeClassPath")[0].InnerText;
            codeNamespace = pathSettings.GetElementsByTagName("CodeNamespace")[0].InnerText;
        }
    }
}
