using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

public class CommandLineArgs
{
    public static string[] args;

    public static void Init(string[] args)
    {
        CommandLineArgs.args = args;

        string arg = "";
        for (int i = 0; i < args.Length; i++)
        {
            arg += args[i] + ":\n\t";
            i++;
            if (i < args.Length)
                arg += args[i];
            arg += "\n";
        }
        Console.WriteLine("==================== 命令行参数 ====================");
        Console.WriteLine(arg);
    }

    /// <summary>
    /// 获取参数
    /// </summary>
    /// <param name="name"></param>
    /// <returns></returns>
    public static string GetArgument(string name)
    {
        for (int i = 0; i < args.Length; i++)
        {
            string arg = args[i];
            if (arg == name && args.Length > i + 1)
            {
                return args[i + 1];
            }
        }
        return null;
    }

    public static bool HasArgument(string name)
    {
        return args.Contains(name);
    }
}