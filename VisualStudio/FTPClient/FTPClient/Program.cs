using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace FTPClient
{
    static class Program
    {
        private static FtpHelper ftpHelper;

        /// <summary>
        /// 应用程序的主入口点。
        /// </summary>
        [STAThread]
        static int Main(string[] arg)
        {
            //string[] _arg = { "UpLoadFile", "../../client/Unity.log" };
            //arg = _arg;
            CommandLineArgs.Init(arg);
            DataCenter.Init();

            if (arg != null && arg.Length > 0)
            {
                string action = arg[0];
                if(action != null)
                {
                    string args = CommandLineArgs.GetArgument(action);
                    switch (action)
                    {
                        case "UpLoadFile":
                            Console.WriteLine("执行UpLoadFile命令");
                            int result = UpLoadFile(args);
                            if (result == 0)
                            {
                                return SendFTPCompleteHttpReq();
                            }
                            return result;
                        case "UpLoadDirFiles":
                            Console.WriteLine("执行UpLoadDirFiles命令");
                            return UpLoadDirFiles();
                        case "DownloadFile":
                            Console.WriteLine("执行DownloadFile命令");
                            return DownloadFile();
                        case "DownloadDirFiles":
                            Console.WriteLine("执行DownloadDirFiles命令");
                            return DownloadDirFiles();
                    }
                }
            } else
            {
                // HttpUtil.Load("http://work.42bj.com/jenkins/job/test/job/test/build", "", "POST", "ftp-release", "iphone12");
                Application.EnableVisualStyles();
                Application.SetCompatibleTextRenderingDefault(false);
                Application.Run(new MainForm());
            }

            return 0;
        }

        static int UpLoadDirFiles()
        {
            // TODO
            return 0;
        }

        static int UpLoadFile(string args)
        {
            ftpHelper = new FtpHelper(DataCenter.ip, DataCenter.port, DataCenter.userName, DataCenter.password);
            ftpHelper.RelatePath = DataCenter.remoteDirPath;

            ftpHelper.RelatePath = string.Format("{0}/{1}", ftpHelper.RelatePath, Path.GetFileName(args));
            bool isOk;
            ftpHelper.UpLoad(args, out isOk);
            ftpHelper.SetPrePath();
            if (isOk)
            {
                Console.WriteLine("文件 " + args + "  上传成功");
                return 0;
            }
            else
            {
                Console.WriteLine("文件 " + args + "  上传失败");
                return 1;
            }
        }

        static int DownloadFile()
        {
            // TODO
            return 0;
        }

        static int DownloadDirFiles()
        {
            // TODO
            return 0;
        }

        static int SendFTPCompleteHttpReq()
        {
            int result = HttpUtil.Load(DataCenter.httpUrl, "", "POST", DataCenter.httpUser, DataCenter.httpPassword);
            if (result == 201)
            {
                Console.WriteLine("请求运维平台上传文件成功，返回值：" + result);
                return 0;
            }else
            {
                Console.WriteLine("请求运维平台上传文件失败，返回值：" + result);
                return result;
            }
        }
    }
}
