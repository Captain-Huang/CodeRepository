using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace framework
{
    class LogHelper
    {
        public static void info(object msg)
        {
            string _msg = (string)msg;
            Console.WriteLine(msg);
        }
    }
}
