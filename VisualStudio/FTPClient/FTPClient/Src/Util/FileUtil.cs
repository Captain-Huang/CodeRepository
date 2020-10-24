using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

public static class FileUtil
{
    /// <summary>
    /// 创建目录
    /// </summary>
    /// <param name="path"></param>
    /// <returns></returns>
    public static bool CreateDirectory(string path)
    {
        if (Directory.Exists(path))
            return true;

        Directory.CreateDirectory(path);

        return true;
    }

    /// <summary>
    /// 删除目录
    /// </summary>
    /// <param name="path"></param>
    /// <returns></returns>
    public static bool DeleteDirectory(string path)
    {
        if (!Directory.Exists(path))
            return true;

        Directory.Delete(path, true);

        return true;
    }

    /// <summary>
    /// 写入文本
    /// </summary>
    /// <param name="path"></param>
    /// <param name="text"></param>
    /// <param name="overwrite"></param>
    /// <returns></returns>
    public static bool WriteText(string path, string text, bool overwrite)
    {
        if (text == null)
            return false;

        byte[] bytes = Encoding.UTF8.GetBytes(text);
        return WriteFile(path, bytes, overwrite);
    }

    /// <summary>
    /// 写入文件
    /// </summary>
    /// <param name="path"></param>
    /// <param name="bytes"></param>
    /// <param name="overwrite"></param>
    /// <returns></returns>
    public static bool WriteFile(string path, byte[] bytes, bool overwrite)
    {
        if (bytes == null)
            return false;

        int index = path.LastIndexOf("\\");
        string name = path.Substring(index + 1, path.Length - index - 1);
        string folder = path.Substring(0, index);

        return WriteFile(path, folder, name, bytes, overwrite);
    }

    /// <summary>
    /// 写入文本
    /// </summary>
    /// <param name="path"></param>
    /// <param name="folder"></param>
    /// <param name="name"></param>
    /// <param name="text"></param>
    /// <param name="overwrite"></param>
    /// <returns></returns>
    public static bool WriteText(string path, string folder, string name, string text, bool overwrite)
    {
        if (text == null)
            return false;

        byte[] bytes = Encoding.UTF8.GetBytes(text);
        return WriteFile(path, folder, name, bytes, overwrite);
    }

    /// <summary>
    /// 写入文件
    /// </summary>
    /// <param name="path"></param>
    /// <param name="folder"></param>
    /// <param name="name"></param>
    /// <param name="bytes"></param>
    /// <param name="overwrite"></param>
    /// <returns></returns>
    public static bool WriteFile(string path, string folder, string name, byte[] bytes, bool overwrite)
    {
        if (bytes == null)
            return false;

        if (overwrite == false && File.Exists(path))
            return false;

        if (!CreateDirectory(folder))
            return false;

        File.WriteAllBytes(path, bytes);

        return true;
    }

    /// <summary>
    /// 获取相对路径
    /// </summary>
    /// <param name="filespec"></param>
    /// <param name="folder"></param>
    /// <returns></returns>
    public static string GetRelativePath(string filespec, string folder)
    {
        if (filespec == "")
            return "";
        const string directorySeparatorChar = "\\";
        Uri pathUri = new Uri(filespec);

        if (!folder.EndsWith(directorySeparatorChar))
        {
            folder += directorySeparatorChar;
        }
        Uri folderUri = new Uri(folder);
        return Uri.UnescapeDataString(folderUri.MakeRelativeUri(pathUri).ToString().Replace("/", directorySeparatorChar));
    }
}
