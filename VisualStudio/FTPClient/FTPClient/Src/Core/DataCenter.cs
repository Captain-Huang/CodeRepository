using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace FTPClient
{
    public class DataCenter
    {
        public static string localFilePath;
        public static string localDirPath;
        public static string remoteDirPath;
        public static string ip;
        public static string port;
        public static string userName;
        public static string password;

        public static string httpUser;
        public static string httpPassword;
        public static string httpUrl;

        private static string configPath;
        private static Dictionary<string, string> configKeyValues;

        /// <summary>
        /// 初始化
        /// </summary>
        public static void Init()
        {
            configKeyValues = new Dictionary<string, string>();
            configPath = Application.StartupPath + "/config.txt";
            string[] lines = FileHelper.ReadLines(configPath);
            for (var i = 0; i < lines.Length; i++)
            {
                string line = lines[i];
                if (!string.IsNullOrEmpty(line))
                {
                    string[] strs = line.Split('=');
                    configKeyValues[strs[0]] = strs[1];
                }
            }
            localFilePath = configKeyValues["localFilePath"];
            if (string.IsNullOrEmpty(localFilePath))
            {
                localFilePath = "";
            }
            localDirPath = configKeyValues["localDirPath"];
            if (string.IsNullOrEmpty(localDirPath))
            {
                localDirPath = "";
            }
            remoteDirPath = configKeyValues["remoteDirPath"];
            if (string.IsNullOrEmpty(remoteDirPath))
            {
                remoteDirPath = "";
            }
            ip = configKeyValues["ip"];
            if (string.IsNullOrEmpty(ip))
            {
                ip = "";
            }
            port = configKeyValues["port"];
            if (string.IsNullOrEmpty(port))
            {
                port = "";
            }
            userName = configKeyValues["userName"];
            if (string.IsNullOrEmpty(userName))
            {
                userName = "";
            }
            password = configKeyValues["password"];
            if (string.IsNullOrEmpty(password))
            {
                password = "";
            }
            httpUrl = configKeyValues["httpUrl"];
            httpUser = configKeyValues["httpUser"];
            httpPassword = configKeyValues["httpPassword"];
            if (string.IsNullOrEmpty(httpUrl) || string.IsNullOrEmpty(httpUrl) || string.IsNullOrEmpty(httpUrl) )
            {
                Console.WriteLine("Http配置信息未配置");
            }
        }

        /// <summary>
        /// 保存设置
        /// </summary>
        public static void SaveSetting()
        {
            string configContents = "";
            string str1 = "localFilePath=" + localFilePath + "\n";
            configContents += str1;
            str1 = "localDirPath=" + localDirPath + "\n";
            configContents += str1;
            str1 = "remoteDirPath=" + remoteDirPath + "\n";
            configContents += str1;
            str1 = "ip=" + ip + "\n";
            configContents += str1;
            str1 = "port=" + port + "\n";
            configContents += str1;
            str1 = "userName=" + userName + "\n";
            configContents += str1;
            str1 = "password=" + password + "\n";
            configContents += str1;
            str1 = "httpUrl=" + httpUrl + "\n";
            configContents += str1;
            str1 = "httpUser=" + httpUser + "\n";
            configContents += str1;
            str1 = "httpPassword=" + httpPassword + "\n";
            configContents += str1;
            FileHelper.WriteText(configPath, configContents, true);
        }
    }
}
