using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Net;
using System.IO;
using System.Threading;

namespace FTPClient
{

    public class FtpHelper
    {
        #region 属性与构造函数

        /// <summary>
        /// IP地址
        /// </summary>
        public string IpAddr { get; set; }

        /// <summary>
        /// 相对路径
        /// </summary>
        public string RelatePath { get; set; }

        /// <summary>
        /// 端口号
        /// </summary>
        public string Port { get; set; }

        /// <summary>
        /// 用户名
        /// </summary>
        public string UserName { get; set; }

        /// <summary>
        /// 密码
        /// </summary>
        public string Password { get; set; }



        public FtpHelper()
        {

        }

        public FtpHelper(string ipAddr, string port, string userName, string password)
        {
            this.IpAddr = ipAddr;
            this.Port = port;
            this.UserName = userName;
            this.Password = password;
        }

        #endregion

        #region 方法


        /// <summary>
        /// 下载文件
        /// </summary>
        /// <param name="filePath"></param>
        /// <param name="isOk"></param>
        public void DownLoad(string filePath, out bool isOk)
        {
            string method = WebRequestMethods.Ftp.DownloadFile;
            var statusCode = FtpStatusCode.OpeningData;
            FtpWebResponse response = callFtp(method);
            ReadByBytes(filePath, response, statusCode, out isOk);
        }

        /// <summary>
        /// 上传文件
        /// </summary>
        /// <param name="file"></param>
        /// <param name="isOk"></param>
        public void UpLoad(string file, out bool isOk)
        {
            isOk = false;
            FileInfo fi = new FileInfo(file);
            FileStream fs = fi.OpenRead();
            long length = fs.Length;
            string uri = string.Format("ftp://{0}:{1}{2}", this.IpAddr, this.Port, this.RelatePath);
            FtpWebRequest request = (FtpWebRequest)WebRequest.Create(uri);
            request.Credentials = new NetworkCredential(UserName, Password);
            request.Method = WebRequestMethods.Ftp.UploadFile;
            request.UseBinary = true;
            request.ContentLength = length;
            request.Timeout = 10 * 1000;
            try
            {
                Stream stream = request.GetRequestStream();

                int BufferLength = 2048; //2K   
                byte[] b = new byte[BufferLength];
                int i;
                while ((i = fs.Read(b, 0, BufferLength)) > 0)
                {
                    stream.Write(b, 0, i);
                }
                stream.Close();
                stream.Dispose();
                isOk = true;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.ToString());
            }
            finally
            {
                if (request != null)
                {
                    if (fs != null)
                    {
                        fs.Close();
                    }
                    request.Abort();
                    request = null;
                }
            }
        }

        /// <summary>
        /// 下载文件（断点下载）
        /// </summary>
        /// <param name="localFileName">保存本地的文件名（包含路径）</param>
        /// <returns>是否下载成功</returns>
        public bool DownLoadBroken(string localFileName)
        {
            try
            {
                long size = 0;
                if (File.Exists(localFileName))
                {
                    using (FileStream outputStream = new FileStream(localFileName, FileMode.Open))
                    {
                        size = outputStream.Length;
                    }
                }
                else
                {
                    Console.WriteLine("error: 本地不存在此文件 " + localFileName);
                }
                return FtpBrokenDownload(localFileName, size);
            }
            catch
            {
                throw;
            }
        }

        /// <summary>
        /// 上传文件(断点续传)
        /// </summary>
        /// <param name="filePath">本地文件全路径名称：C:\Users\JianKunKing\Desktop\IronPython脚本测试工具</param>
        /// <param name="remoteFilepath">远程文件所在文件夹路径</param>
        /// <returns></returns>
        public bool UploadBroken(string filePath)
        {
            return FtpUploadBroken(filePath);
        }

        /// <summary>
        /// 删除文件
        /// </summary>
        /// <param name="isOk"></param>
        /// <returns></returns>
        public string[] DeleteFile(out bool isOk)
        {
            string method = WebRequestMethods.Ftp.DeleteFile;
            var statusCode = FtpStatusCode.FileActionOK;
            FtpWebResponse response = callFtp(method);
            return ReadByLine(response, statusCode, out isOk);
        }

        /// <summary>
        /// 展示目录
        /// </summary>
        public string[] ListDirectory(out bool isOk)
        {
            string method = WebRequestMethods.Ftp.ListDirectoryDetails;
            var statusCode = FtpStatusCode.OpeningData;
            FtpWebResponse response = callFtp(method);
            return ReadByLine(response, statusCode, out isOk);
        }

        /// <summary>
        /// 设置上级目录
        /// </summary>
        public void SetPrePath()
        {
            string relatePath = this.RelatePath;
            if (string.IsNullOrEmpty(relatePath) || relatePath.LastIndexOf("/") == 0)
            {
                relatePath = "";
            }
            else
            {
                relatePath = relatePath.Substring(0, relatePath.LastIndexOf("/"));
            }
            this.RelatePath = relatePath;
        }

        #endregion

        #region 私有方法

        /// <summary>
        /// 调用Ftp,将命令发往Ftp并返回信息
        /// </summary>
        /// <param name="method">要发往Ftp的命令</param>
        /// <returns></returns>
        private FtpWebResponse callFtp(string method, int offsetSize = 0)
        {
            string uri = string.Format("ftp://{0}:{1}{2}", this.IpAddr, this.Port, this.RelatePath);
            FtpWebRequest request; request = (FtpWebRequest)FtpWebRequest.Create(uri);
            request.UseBinary = true;
            request.UsePassive = true;
            request.Credentials = new NetworkCredential(UserName, Password);
            request.KeepAlive = false;
            request.Method = method;
            if (offsetSize != 0)
            {
                request.ContentOffset = offsetSize;
            }
            FtpWebResponse response = (FtpWebResponse)request.GetResponse();
            return response;
        }

        /// <summary>
        /// 按行读取
        /// </summary>
        /// <param name="response"></param>
        /// <param name="statusCode"></param>
        /// <param name="isOk"></param>
        /// <returns></returns>
        private string[] ReadByLine(FtpWebResponse response, FtpStatusCode statusCode, out bool isOk)
        {
            List<string> lstAccpet = new List<string>();
            int i = 0;
            while (true)
            {
                if (response.StatusCode == statusCode)
                {
                    using (StreamReader sr = new StreamReader(response.GetResponseStream(), System.Text.Encoding.UTF8))
                    {
                        string line = sr.ReadLine();
                        while (!string.IsNullOrEmpty(line))
                        {
                            lstAccpet.Add(line);
                            line = sr.ReadLine();
                        }
                    }
                    isOk = true;
                    break;
                }
                i++;
                if (i > 10)
                {
                    isOk = false;
                    break;
                }
                Thread.Sleep(200);
            }
            response.Close();
            return lstAccpet.ToArray();
        }

        private void ReadByBytes(string filePath, FtpWebResponse response, FtpStatusCode statusCode, out bool isOk)
        {
            isOk = false;
            int i = 0;
            while (true)

            {
                if (response.StatusCode == statusCode)
                {
                    long length = response.ContentLength;
                    int bufferSize = 2048;
                    int readCount;
                    byte[] buffer = new byte[bufferSize];
                    using (FileStream outputStream = new FileStream(filePath, FileMode.Create))
                    {

                        using (Stream ftpStream = response.GetResponseStream())
                        {
                            readCount = ftpStream.Read(buffer, 0, bufferSize);
                            while (readCount > 0)
                            {
                                outputStream.Write(buffer, 0, readCount);
                                readCount = ftpStream.Read(buffer, 0, bufferSize);
                            }
                        }
                    }
                    break;
                }
                i++;
                if (i > 10)
                {
                    isOk = false;
                    break;
                }
                Thread.Sleep(200);
            }
            response.Close();
        }

        #endregion



        /// <summary>
        /// 从FTP服务器下载文件，指定本地路径和本地文件名（支持断点下载）
        /// </summary>
        /// <param name="localFilePath">保存本地的文件名（包含路径）</param>
        /// <param name="size">已下载文件流大小</param>
        /// <returns>是否下载成功</returns>
        private bool FtpBrokenDownload(string localFilePath, long size)
        {
            Stream ftpStream = null;
            FtpWebResponse response = null;
            FileStream outputStream = null;
            try
            {
                outputStream = new FileStream(localFilePath, FileMode.Append);
                string method = WebRequestMethods.Ftp.DownloadFile;
                response = callFtp(method);
                ftpStream = response.GetResponseStream();
                
                long totalDownloadedByte = 0;
                int bufferSize = 2048;
                int readCount;
                byte[] buffer = new byte[bufferSize];
                readCount = ftpStream.Read(buffer, 0, bufferSize);
                while (readCount > 0)
                {
                    totalDownloadedByte = readCount + totalDownloadedByte;
                    outputStream.Write(buffer, 0, readCount);
                    readCount = ftpStream.Read(buffer, 0, bufferSize);
                }
                ftpStream.Close();
                outputStream.Close();
                response.Close();
                return true;
            }
            catch (Exception)
            {
                return false;
                throw;
            }
            finally
            {
                if (ftpStream != null)
                {
                    ftpStream.Close();
                }
                if (outputStream != null)
                {
                    outputStream.Close();
                }
                if (response != null)
                {
                    response.Close();
                }
            }
        }

        /// <summary>
        /// 上传文件到FTP服务器(断点续传)
        /// </summary>
        /// <param name="filePath">本地文件全路径名称：C:\Users\JianKunKing\Desktop\IronPython脚本测试工具</param>
        /// <returns></returns>
        private bool FtpUploadBroken(string filePath)
        {
            string newFileName = string.Empty;
            bool success = true;
            FileInfo fileInf = new FileInfo(filePath);
            long allbye = (long)fileInf.Length;
            if (fileInf.Name.IndexOf("#") == -1)
            {
                newFileName = RemoveSpaces(fileInf.Name);
            }
            else
            {
                newFileName = fileInf.Name.Replace("#", "＃");
                newFileName = RemoveSpaces(newFileName);
            }
            long startfilesize = GetFileSize(this.RelatePath);
            if (startfilesize >= allbye)
            {
                startfilesize = 0;
            }
            long startbye = startfilesize;
            string uri = string.Format("ftp://{0}:{1}{2}", this.IpAddr, this.Port, this.RelatePath);
            FtpWebRequest request = (FtpWebRequest)FtpWebRequest.Create(new Uri(uri));
            request.Credentials = new NetworkCredential(UserName, Password);
            request.Method = WebRequestMethods.Ftp.AppendFile;
            request.UseBinary = true;
            request.KeepAlive = false;
            request.ContentLength = fileInf.Length;
            int buffLength = 2048;// 缓冲大小设置为2kb
            byte[] buff = new byte[buffLength];
            // 打开一个文件流 (System.IO.FileStream) 去读上传的文件
            FileStream fs = fileInf.OpenRead();
            Stream strm = null;
            try
            {
                // 把上传的文件写入流
                strm = request.GetRequestStream();
                // 每次读文件流的2kb
                fs.Seek(startfilesize, 0);
                int contentLen = fs.Read(buff, 0, buffLength);
                // 流内容没有结束
                while (contentLen != 0)
                {
                    // 把内容从file stream 写入 upload stream
                    strm.Write(buff, 0, contentLen);
                    contentLen = fs.Read(buff, 0, buffLength);
                    startbye += contentLen;
                }
                // 关闭两个流
                strm.Close();
                fs.Close();
            }
            catch
            {
                success = false;
                throw;
            }
            finally
            {
                if (fs != null)
                {
                    fs.Close();
                }
                if (strm != null)
                {
                    strm.Close();
                }
            }
            return success;
        }

        /// <summary>
        /// 去除空格
        /// </summary>
        /// <param name="str"></param>
        /// <returns></returns>
        private static string RemoveSpaces(string str)
        {
            string a = "";
            CharEnumerator CEnumerator = str.GetEnumerator();
            while (CEnumerator.MoveNext())
            {
                byte[] array = new byte[1];
                array = System.Text.Encoding.ASCII.GetBytes(CEnumerator.Current.ToString());
                int asciicode = (short)(array[0]);
                if (asciicode != 32)
                {
                    a += CEnumerator.Current.ToString();
                }
            }
            string sdate = System.DateTime.Now.Year.ToString() + System.DateTime.Now.Month.ToString() + System.DateTime.Now.Day.ToString() + System.DateTime.Now.Hour.ToString()
            + System.DateTime.Now.Minute.ToString() + System.DateTime.Now.Second.ToString() + System.DateTime.Now.Millisecond.ToString();
            return a.Split('.')[a.Split('.').Length - 2] + "." + a.Split('.')[a.Split('.').Length - 1];
        }

        /// <summary>
        /// 获取已上传文件大小
        /// </summary>
        /// <param name="filename">文件名称</param>
        /// <param name="path">服务器文件路径</param>
        /// <returns></returns>
        public long GetFileSize(string remoteFilepath)
        {
            long filesize = 0;
            try
            {
                FtpWebRequest reqFTP;
                string uri = string.Format("ftp://{0}:{1}{2}", this.IpAddr, this.Port, remoteFilepath);
                reqFTP = (FtpWebRequest)FtpWebRequest.Create(uri);
                reqFTP.KeepAlive = false;
                reqFTP.UseBinary = true;
                reqFTP.Credentials = new NetworkCredential(UserName, Password);//用户，密码
                reqFTP.Method = WebRequestMethods.Ftp.GetFileSize;
                FtpWebResponse response = (FtpWebResponse)reqFTP.GetResponse();
                filesize = response.ContentLength;
                return filesize;
            }
            catch
            {
                return 0;
            }
        }
    }

    /// <summary>
    /// Ftp内容类型枚举
    /// </summary>
    public enum FtpContentType
    {
        undefined = 0,
        file = 1,
        folder = 2
    }
}