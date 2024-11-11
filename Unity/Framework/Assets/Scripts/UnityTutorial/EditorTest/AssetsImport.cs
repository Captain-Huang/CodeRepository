using System.Collections;
using System.Collections.Generic;
using System.IO;
using UnityEngine;
using UnityEditor;

namespace GameEditor
{
    public class AssetsImport : AssetPostprocessor
    {
        public void OnPreprocessTexture()
        {            
            #region EditorLog
            // Debug.Log("AssetsImport  OnPreprocessTexture " + this.assetPath);
            #endregion
            TextureImporter importer = assetImporter as TextureImporter;
            string folder = Path.GetDirectoryName(assetPath);
            string fileName = Path.GetFileNameWithoutExtension(assetPath);
            string ext = Path.GetExtension(assetPath);
            
            // 根据目录结构区分图片设置
            bool isSprite = true;
            bool isReadable = false;
            
            /**
            // 开始设置图片
            if (isSprite)
            {
                importer.textureType = TextureImporterType.Sprite;
                importer.mipmapEnabled = false;
            }
            if (importer.isReadable)
            {
                importer.isReadable = isReadable;
            }

            importer.GetDefaultPlatformTextureSettings().crunchedCompression = true;
            */
        }
        
        // 所有的资源的导入，删除，移动，都会调用此方法，注意，这个方法是static的  
        public static void OnPostprocessAllAssets(string[] importedAsset, string[] deletedAssets, string[] movedAssets, string[] movedFromAssetPaths)
        {
            #region EditorLog
            // Debug.Log("AssetsImport  OnPostprocessAllAssets");
            // foreach (string str in importedAsset)
            // {
            //     Debug.Log("importedAsset = " + str);
            // }
            // foreach (string str in deletedAssets)
            // {
            //     Debug.Log("deletedAssets = " + str);
            // }
            // foreach (string str in movedAssets)
            // {
            //     Debug.Log("movedAssets = " + str);
            // }
            // foreach (string str in movedFromAssetPaths)
            // {
            //     Debug.Log("movedFromAssetPaths = " + str);
            // }
            #endregion

        }
    }
}

