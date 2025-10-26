# Windows 使用指南 - HTML/图片转PPT工具

这是一份针对Windows用户的详细使用指南，即使你没用过TypeScript也能轻松运行。

## 📋 准备工作

### 第一步：安装Node.js

1. 访问Node.js官网：https://nodejs.org/
2. 下载Windows版本（推荐下载LTS版本，左边的绿色按钮）
3. 双击下载的`.msi`文件，按照安装向导完成安装
4. 安装过程中，保持默认选项即可，一路"下一步"

验证安装成功：
- 按 `Win + R` 键，输入 `cmd`，回车打开命令提示符
- 输入以下命令：
```cmd
node --version
npm --version
```
- 如果显示版本号，说明安装成功！

### 第二步：获取代码

有两种方式：

**方式1：如果安装了Git**
```cmd
git clone <你的仓库地址>
cd AI
```

**方式2：直接下载**
- 从GitHub下载ZIP压缩包
- 解压到任意文件夹（比如：`D:\Projects\AI`）
- 记住这个文件夹位置

## 🚀 运行项目（三步走）

### 第一步：打开命令提示符

1. 按 `Win + R` 键
2. 输入 `cmd`，回车
3. 进入项目文件夹，比如：
```cmd
cd D:\Projects\AI
```
或者你解压到的位置

**小技巧：** 也可以在文件夹中，按住Shift键，右键点击空白处，选择"在此处打开PowerShell窗口"或"在此处打开命令窗口"

### 第二步：安装依赖

在命令提示符中输入：
```cmd
npm install
```

等待安装完成（可能需要几分钟，取决于网络速度）

### 第三步：运行示例

输入以下命令：
```cmd
npm test
```

成功运行后，你会看到：
```
==================================================
HTML/图片转PPT转换器 - 使用示例
==================================================

示例1: HTML转PPT
✓ 成功生成: output/example1.pptx
✓ 成功生成: output/example2.pptx

示例3: 高级自定义
✓ 成功生成: output/advanced.pptx

示例4: 富文本HTML转换
✓ 成功生成: output/richtext.pptx

==================================================
所有示例运行完成！
==================================================
```

### 第四步：查看生成的PPT

1. 打开项目文件夹下的 `output` 文件夹
2. 你会看到4个 `.pptx` 文件
3. 双击任意PPT文件，用PowerPoint或WPS打开
4. 所有内容都可以编辑！

## 📝 自定义使用

如果你想转换自己的HTML内容，可以这样做：

### 创建一个简单的使用脚本

1. 在项目根目录创建一个新文件 `my-convert.js`（用记事本就行）
2. 复制以下内容：

```javascript
// 引入转换器
const { htmlToPpt } = require('./dist/index');

// 你的HTML内容（可以随意修改）
const myHtml = `
  <h1 style="color: #e74c3c;">我的演示文稿</h1>

  <h2 style="color: #3498db;">第一部分</h2>
  <p>这是第一部分的内容</p>
  <ul>
    <li>要点一</li>
    <li>要点二</li>
    <li>要点三</li>
  </ul>

  <h2 style="color: #27ae60;">第二部分</h2>
  <p><strong>重要提示：</strong>这是一个重要的说明</p>
`;

// 转换为PPT
htmlToPpt(myHtml, 'output/my-presentation.pptx', {
  title: '我的演示',
  author: '你的名字',
  defaultFontFace: 'Microsoft YaHei'  // 使用微软雅黑字体
}).then(() => {
  console.log('✓ 转换成功！请查看 output/my-presentation.pptx');
}).catch(err => {
  console.error('转换失败：', err);
});
```

3. 保存文件
4. 在命令提示符中运行：

```cmd
npm run build
node my-convert.js
```

5. 在 `output` 文件夹查看生成的 `my-presentation.pptx`

### 转换图片为PPT

创建文件 `image-convert.js`：

```javascript
const { imageToPpt } = require('./dist/index');

// 方式1：单张图片
imageToPpt('你的图片路径.jpg', 'output/single-image.pptx', {
  title: '图片演示'
}).then(() => {
  console.log('✓ 单张图片转换成功！');
});

// 方式2：多张图片
const images = [
  'D:/Pictures/photo1.jpg',
  'D:/Pictures/photo2.jpg',
  'D:/Pictures/photo3.jpg'
];

imageToPpt(images, 'output/photo-album.pptx', {
  title: '我的相册',
  author: '你的名字'
}).then(() => {
  console.log('✓ 相册转换成功！');
});
```

运行：
```cmd
node image-convert.js
```

## 🎨 HTML样式说明

支持的HTML标签：
- `<h1>` 到 `<h6>`：标题（会自动分页）
- `<p>`：段落
- `<ul>` 和 `<li>`：列表
- `<strong>` 或 `<b>`：加粗
- `<em>` 或 `<i>`：斜体
- `<img>`：图片

支持的样式属性（写在style里）：
- `color: #ff0000;`：文字颜色
- `font-size: 20px;`：字体大小
- `text-align: center;`：对齐方式（left/center/right）
- `font-weight: bold;`：加粗
- `font-style: italic;`：斜体

示例：
```html
<h1 style="color: #e74c3c; text-align: center;">红色居中标题</h1>
<p style="font-size: 18px;">大号字体段落</p>
<p><strong>这是粗体</strong>，<em>这是斜体</em></p>
```

## ❓ 常见问题

### Q1: 运行 npm install 很慢？
A: 可以使用国内镜像：
```cmd
npm config set registry https://registry.npmmirror.com
npm install
```

### Q2: 提示"npm不是内部或外部命令"？
A: Node.js没安装好，重新安装Node.js，并重启命令提示符

### Q3: 中文乱码？
A: 在转换选项中指定中文字体：
```javascript
{
  defaultFontFace: 'Microsoft YaHei'  // 微软雅黑
}
```

### Q4: 图片无法加载？
A: 确保图片路径正确，Windows路径示例：
```javascript
'D:/Pictures/photo.jpg'  // 推荐用斜杠 /
'D:\\Pictures\\photo.jpg'  // 或用双反斜杠
```

### Q5: 想修改代码但不会TypeScript？
A: 不需要修改`.ts`文件，直接创建`.js`文件使用即可（参考上面的示例）

## 📞 需要帮助？

如果遇到问题：
1. 检查Node.js是否正确安装（`node --version`）
2. 确保在正确的文件夹中运行命令
3. 查看错误信息，通常会提示问题所在

## 🎯 快速命令总结

```cmd
# 1. 进入项目文件夹
cd D:\Projects\AI

# 2. 安装依赖（只需运行一次）
npm install

# 3. 运行示例
npm test

# 4. 如果修改了TypeScript代码，需要重新编译
npm run build

# 5. 运行自定义脚本
node my-convert.js
```

就这么简单！祝使用愉快！🎉
