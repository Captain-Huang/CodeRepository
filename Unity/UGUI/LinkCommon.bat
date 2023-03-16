::每次新建项目，将此文件拷贝至和Assets同级目录，可能需要修改路径
@echo off

echo ********************* 开始建立软链接 *************************
mklink /d "D:/workspace/_hts/Unity_2021_2_13/UGUI_Demo/Assets/Editor" "D:/workspace/_hts/Unity_2021_2_13/Common/Editor"

pause