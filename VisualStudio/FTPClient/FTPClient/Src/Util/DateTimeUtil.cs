using System;
using System.Collections.Generic;
using System.Text;

public static class DateTimeUtil
{
    static public string NowTime2String()
    {
        return Time2String(System.DateTime.Now);
    }

    static public string Time2String(DateTime date)
    {
        return date.ToString("yyyy:MM:dd:HH:mm:ss");
    }
}
