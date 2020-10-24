using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;


namespace FTPClient
{
    public class HttpUtil
    {
        public static int Load(string url, string json, string method, string user = "", string password = "")
        {
            byte[] data = Encoding.UTF8.GetBytes(json);

            Uri uri = new Uri(url);
            HttpWebRequest request = (HttpWebRequest)WebRequest.Create(uri);
            request.ContentType = "application/x-www-form-urlencoded";
            request.ContentLength = data.Length;
            request.Method = method;

            String authorization = user + ":" + password;
            request.Headers.Add("Authorization", "Basic " + Convert.ToBase64String(Encoding.UTF8.GetBytes(authorization)));
            //using (Stream reqStream = request.GetRequestStream())
            //{
            //    reqStream.Write(data, 0, data.Length);
            //}
            //using (HttpWebResponse response = (HttpWebResponse)request.GetResponse())
            //{
            //    using (StreamReader sr = new StreamReader(response.GetResponseStream(), Encoding.Default))
            //    {
            //        string responseContent = sr.ReadToEnd().ToString();
            //    }
            //}

            using (Stream myRequestStream = request.GetRequestStream())
            {
                myRequestStream.Write(data, 0, data.Length);
                myRequestStream.Close();
            }
            HttpWebResponse response;
            int stateCode = 0;
            try
            {
                response = (HttpWebResponse)request.GetResponse();
                stateCode = Convert.ToInt32(response.StatusCode);
                Console.Write(stateCode + " " + response.StatusCode.ToString() + "\r\n");
            }
            catch (WebException ex)
            {
                response = (HttpWebResponse)ex.Response;
            }
            Stream myResponseStream = response.GetResponseStream();
            //获取响应内容
            using (StreamReader myStreamReader = new StreamReader(myResponseStream, Encoding.GetEncoding("gb2312")))
            {
                string retString = myStreamReader.ReadToEnd();
            }
            myResponseStream.Close();
            return stateCode;
        }

        private static void OnComplete()
        {

        }
    }
}
