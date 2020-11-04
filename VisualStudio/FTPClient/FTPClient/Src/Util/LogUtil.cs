using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace FTPClient
{
    class LogUtil
    {
        public static bool isSaveLog = false;

        private static string logFilePath = null;

        public static void Init()
        {
            FileHelper.WriteText(LogFilePath(), "", true);
        }

        public static void Info(string log)
        {
            Console.WriteLine(log);
            if (isSaveLog)
            {
                using (StreamWriter file = new StreamWriter(LogFilePath(), true))
                {
                    file.WriteLine(log);
                    file.Close();
                }
            }
        }

        private static string LogFilePath()
        {
            if (string.IsNullOrEmpty(logFilePath))
            {
                logFilePath = Application.StartupPath + "/log.txt";
            }
            return logFilePath;
        }
    }
}
