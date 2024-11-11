using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEditor;

public class SplitAtlas
{
    [MenuItem("Tools/美术/切割规则图集")]
    static void ExportSprite()
    {
        string resourcePath = "Assets/Resources/";

        foreach (Object obj in Selection.objects)
        {
            string selectionPath = AssetDatabase.GetAssetPath(obj);
            if (selectionPath.StartsWith(resourcePath))
            {
                string selectionExt = System.IO.Path.GetExtension(selectionPath);
                if (selectionExt.Length == 0)
                    continue;

                string loadPath = selectionPath.Remove(selectionPath.Length - selectionExt.Length);
                loadPath = loadPath.Substring(resourcePath.Length);

                Sprite[] sprites = Resources.LoadAll<Sprite>(loadPath);
                if (sprites.Length > 0)
                {
                    string outPath = Application.dataPath + "/ExportSplitUI/" + loadPath;
                    if (!System.IO.Directory.Exists(outPath))
                    {
                        System.IO.Directory.CreateDirectory(outPath);
                    }

                    foreach (Sprite sprite in sprites)
                    {
                        Texture2D tex = new Texture2D((int)sprite.rect.width, (int)sprite.rect.height, sprite.texture.format, false);
                        tex.SetPixels(sprite.texture.GetPixels((int)sprite.rect.xMin, (int)sprite.rect.yMin, (int)sprite.rect.width, (int)sprite.rect.height));
                        tex.Apply();

                        System.IO.File.WriteAllBytes(outPath + "/" + sprite.name + ".png", tex.EncodeToPNG());
                    }
                    Debug.Log("ExportSplitUI Finished! path=" + outPath);
                }
            }
        }
    }
}