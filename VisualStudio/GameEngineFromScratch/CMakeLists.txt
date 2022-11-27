# CMakeList.txt: GameEngineFromScratch 的 CMake 项目，在此处包括源代码并定义
# 项目特定的逻辑。
#
cmake_minimum_required (VERSION 3.8)

project ("GameEngineFromScratch")

include_directories("${PROJECT_SOURCE_DIR}/")
include_directories("${PROJECT_SOURCE_DIR}/Framework/Common")
include_directories("${PROJECT_SOURCE_DIR}/Framework/Interface")

add_subdirectory(Framework)
add_subdirectory(Empty)

# 将源代码添加到此项目的可执行文件。
add_executable (GameEngineFromScratch "Framework/Common/main.cpp" "Framework/Interface/Interface.hpp" "Framework/Interface/IRuntimeModule.hpp" "Framework/Interface/IApplication.hpp" "Framework/Common/BaseApplication.hpp" "Framework/Common/BaseApplication.cpp" "Platform/Windows/HelloEngine_WIN.c")

# TODO: 如有需要，请添加测试并安装目标。
