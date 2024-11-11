using System;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using Framework;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System.IO;
using System.Drawing;


public class SplitLayaAtlasRuntime : MonoBehaviour {
    public Sprite sp;

	// Use this for initialization
	void Start () {
        // 切图导出路径
        string exportPath = Application.dataPath + "/../ImgSplit";
        if (!FileHelper.DirectoryExists(exportPath))
        {
            FileHelper.CreateDirectory(exportPath);
        }

        // 读取Atlas图集配置信息
        string[] lines = FileHelper.ReadLines(Application.dataPath + "/Resources/config.txt");
        List<AtlasVo> atlasVos = new List<AtlasVo>();
        for (int i = 0; i < lines.Length; ++i)
        {
            string atlasName = lines[i];
            if (!String.IsNullOrEmpty(atlasName))
            {
                AtlasVo atlas = new AtlasVo();
                atlas.name = atlasName;
                atlas.relativePath = Application.dataPath + "/Resources/";
                atlas.path = Application.dataPath + "/Resources/" + atlasName + ".atlas";
                atlas.atlasFrames = new List<AtlasFrame>();

                string jsonStr = FileHelper.ReadText(atlas.path);
                JObject jroot = JObject.Parse(jsonStr);
                JEnumerable<JToken> children = jroot["frames"].Children();
                foreach (var item in children)
                {
                    AtlasFrame af = item.First.ToObject<AtlasFrame>();
                    af.name = ((JProperty)item).Name;
                    atlas.atlasFrames.Add(af);
                }

                atlas.meta = jroot["meta"].ToObject<AtlasMeta>();
                atlas.meta.images = atlas.meta.image.Split(',');

                List<Texture2D> texs = new List<Texture2D>();
                List<Vector2> texSizes = new List<Vector2>();
                // 读取大图集
                for (int j = 0; j < atlas.meta.images.Length; ++j)
                {
                    Texture2D texture2D = Resources.Load(atlas.meta.images[i].Substring(0, atlas.meta.images[i].Length - 4)) as Texture2D;
                    texs.Add(texture2D);

                    texSizes.Add(new Vector2(texture2D.width, texture2D.height));
                }
                atlas.picArray = texs.ToArray();
                atlas.picSizes = texSizes.ToArray();

                atlasVos.Add(atlas);
            }
        }

        // 根据图集信息生成sprite
        foreach (var atlasVo in atlasVos)
        {
            var exportPngDir = exportPath + "/" + atlasVo.name;
            // 保存sprite.texture
            if (FileHelper.DirectoryExists(exportPngDir))
            {
                FileHelper.DeleteDirectory(exportPngDir);
            }
            FileHelper.CreateDirectory(exportPngDir);
            foreach (var frame in atlasVo.atlasFrames)
            {
                Texture2D pic = atlasVo.picArray[frame.frame.index];
                Vector2 picSize = atlasVo.picSizes[frame.frame.index];
                //Sprite sprite = Sprite.Create(pic, new Rect(frame.frame.x, frame.frame.y, frame.frame.w, frame.frame.h), new Vector2(frame.spriteSourceSize.x, frame.spriteSourceSize.y));
                Sprite sprite = Sprite.Create(pic, new Rect(frame.frame.x, picSize.y - frame.frame.y, frame.frame.w, frame.frame.h), new Vector2(0.5f, 0.5f));
                Texture2D tex = new Texture2D((int)sprite.rect.width, (int)sprite.rect.height, TextureFormat.ARGB32, false);
                tex.SetPixels(sprite.texture.GetPixels((int)sprite.rect.xMin, (int)sprite.rect.yMin,
                    (int)sprite.rect.width, (int)sprite.rect.height));
                tex.Apply();

                byte[] bytes = tex.EncodeToPNG();
                FileStream fs = File.Open(exportPngDir + "/" + frame.name, FileMode.Create);
                BinaryWriter writer = new BinaryWriter(fs);
                writer.Write(bytes);
                fs.Close();
            }
        }
    }

    public class AtlasVo
    {
        public string name { get; set; }
        public string path { get; set; }
        public string relativePath { get; set; }
        public AtlasMeta meta { get; set; }
        public List<AtlasFrame> atlasFrames { get; set; }

        public Texture2D[] picArray;

        public Vector2[] picSizes;
    }

    public class AtlasFrame
    {
        public string name { get; set; }

        public frame frame { get; set; }
        public sourceSize sourceSize { get; set; }
        public spriteSourceSize spriteSourceSize { get; set; }

    }

    public struct frame
    {
        public float h;
        public int index;
        public float w;
        public float x;
        public float y;
    }

    public struct sourceSize
    {
        public float h;
        public float w;
    }

    public struct spriteSourceSize
    {
        public float x;
        public float y;
    }

    public class AtlasMeta
    {
        public string[] images { get; set; }
        public string image { get; set; }
        public string prefix { get; set; }
        public string scale { get; set; }
    }
}
