@echo off
chcp 65001 >nul
echo ========================================
echo HTML/图片转PPT工具 - 快速开始
echo ========================================
echo.

echo 正在检查Node.js...
node --version >nul 2>&1
if errorlevel 1 (
    echo ✗ 未检测到Node.js！
    echo.
    echo 请先安装Node.js：
    echo 1. 访问 https://nodejs.org/
    echo 2. 下载并安装LTS版本
    echo 3. 重启命令提示符后再运行此文件
    echo.
    pause
    exit /b 1
)
echo ✓ Node.js已安装
echo.

echo 正在检查依赖...
if not exist "node_modules\" (
    echo 首次运行，正在安装依赖...
    echo 这可能需要几分钟，请耐心等待...
    echo.
    call npm install
    echo.
) else (
    echo ✓ 依赖已安装
    echo.
)

echo 正在编译项目...
call npm run build
if errorlevel 1 (
    echo ✗ 编译失败！
    pause
    exit /b 1
)
echo ✓ 编译成功
echo.

echo 正在运行示例...
echo.
call npm test
echo.

echo ========================================
echo 运行完成！
echo ========================================
echo.
echo 生成的PPT文件在 output 文件夹中
echo.
echo 接下来你可以：
echo 1. 打开 output 文件夹查看生成的PPT
echo 2. 修改 simple-html-example.js 创建自己的PPT
echo 3. 运行: node simple-html-example.js
echo.
pause
