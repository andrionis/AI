# HTML/图片转PPT转换器

一个功能强大的工具，可以将HTML内容或图片转换为可编辑的PowerPoint (PPTX) 演示文稿。生成的PPT中的所有元素（文字、颜色、样式等）都是完全可编辑的。

## 特性

- ✅ **HTML转PPT**: 解析HTML内容并转换为PPT幻灯片
- ✅ **图片转PPT**: 将单张或多张图片转换为PPT
- ✅ **完全可编辑**: 生成的PPT中所有元素都可以编辑
- ✅ **样式保留**: 保留HTML中的文字样式、颜色、对齐方式等
- ✅ **智能布局**: 自动将内容分页为多张幻灯片
- ✅ **TypeScript支持**: 完整的类型定义
- ✅ **灵活API**: 提供简单和高级两种使用方式

## 安装

```bash
npm install
```

## 依赖

- `pptxgenjs`: PPT生成库
- `cheerio`: HTML解析
- `sharp`: 图片处理

## 快速开始

### 1. HTML转PPT（简单方式）

```typescript
import { htmlToPpt } from './src';

const html = `
  <h1>欢迎使用</h1>
  <h2>功能介绍</h2>
  <p>这是一个强大的转换工具</p>
  <ul>
    <li>功能一</li>
    <li>功能二</li>
  </ul>
`;

await htmlToPpt(html, 'output.pptx', {
  title: '我的演示',
  author: '作者名称'
});
```

### 2. 图片转PPT

```typescript
import { imageToPpt } from './src';

// 单张图片
await imageToPpt('image.jpg', 'output.pptx');

// 多张图片
await imageToPpt(['img1.jpg', 'img2.jpg', 'img3.jpg'], 'output.pptx');
```

### 3. 高级用法（更多控制）

```typescript
import { HtmlToPptConverter } from './src';

const converter = new HtmlToPptConverter({
  title: '技术分享',
  author: '张三',
  subject: '前端技术',
  defaultFontSize: 16,
  defaultFontFace: 'Microsoft YaHei'
});

const pptx = await converter.convertFromHtml(html);

// 可以继续自定义PPT
const slide = pptx.addSlide();
slide.addText('额外的幻灯片', {
  x: 1,
  y: 2,
  fontSize: 32,
  bold: true
});

await converter.save('output.pptx');
```

## API 文档

### 便捷函数

#### `htmlToPpt(html, outputPath, options?)`

快速将HTML转换为PPT文件。

**参数:**
- `html` (string): HTML内容
- `outputPath` (string): 输出文件路径
- `options` (ConverterOptions): 可选配置

#### `imageToPpt(imagePath, outputPath, options?)`

快速将图片转换为PPT文件。

**参数:**
- `imagePath` (string | string[]): 图片路径（单个或多个）
- `outputPath` (string): 输出文件路径
- `options` (ConverterOptions): 可选配置

### 类

#### `HtmlToPptConverter`

HTML转PPT转换器类。

**方法:**
- `convertFromHtml(html: string): Promise<PptxGenJS>` - 转换HTML
- `save(filename: string): Promise<void>` - 保存为文件
- `getPptx(): PptxGenJS` - 获取PPT对象

#### `ImageToPptConverter`

图片转PPT转换器类。

**方法:**
- `convertFromImage(imagePath: string): Promise<PptxGenJS>` - 转换单张图片
- `convertFromImages(imagePaths: string[]): Promise<PptxGenJS>` - 转换多张图片
- `convertFromBuffer(buffer: Buffer, title?: string): Promise<PptxGenJS>` - 从Buffer转换
- `save(filename: string): Promise<void>` - 保存为文件
- `getPptx(): PptxGenJS` - 获取PPT对象

### 配置选项 (ConverterOptions)

```typescript
interface ConverterOptions {
  title?: string;           // PPT标题
  author?: string;          // 作者
  subject?: string;         // 主题
  slideWidth?: number;      // 幻灯片宽度（英寸）
  slideHeight?: number;     // 幻灯片高度（英寸）
  defaultFontSize?: number; // 默认字体大小
  defaultFontFace?: string; // 默认字体
}
```

## HTML 支持的元素

转换器支持以下HTML元素：

| 元素 | 说明 | PPT效果 |
|------|------|---------|
| `<h1>` - `<h6>` | 标题 | 大号粗体文字，自动分页 |
| `<p>` | 段落 | 普通文本段落 |
| `<ul>`, `<li>` | 列表 | 带项目符号的列表 |
| `<strong>`, `<b>` | 加粗 | 粗体文字 |
| `<em>`, `<i>` | 斜体 | 斜体文字 |
| `<img>` | 图片 | 嵌入图片 |

## HTML 支持的样式

支持以下CSS样式属性：

- `color`: 文字颜色
- `font-size`: 字体大小
- `font-family`: 字体
- `font-weight`: 粗细
- `font-style`: 样式（斜体等）
- `text-align`: 对齐方式

## 示例

### 示例1: 产品介绍

```typescript
const html = `
  <h1 style="color: #2c3e50;">产品介绍</h1>

  <h2 style="color: #3498db;">核心功能</h2>
  <ul>
    <li>智能化处理</li>
    <li>高效稳定</li>
    <li>安全可靠</li>
  </ul>

  <h2 style="color: #e74c3c;">技术优势</h2>
  <p><strong>AI驱动:</strong> 采用最新人工智能技术</p>
  <p><strong>云端服务:</strong> 7x24小时不间断</p>
`;

await htmlToPpt(html, 'product.pptx', {
  title: '产品介绍',
  defaultFontFace: 'Microsoft YaHei'
});
```

### 示例2: 年度报告

```typescript
const html = `
  <h1 style="text-align: center;">2024年度报告</h1>

  <h2>业绩概览</h2>
  <ul>
    <li>营收增长 <strong style="color: #27ae60;">35%</strong></li>
    <li>用户数突破 <strong style="color: #27ae60;">100万</strong></li>
  </ul>
`;

await htmlToPpt(html, 'annual-report.pptx');
```

### 示例3: 图片相册

```typescript
const images = [
  'photos/pic1.jpg',
  'photos/pic2.jpg',
  'photos/pic3.jpg'
];

await imageToPpt(images, 'album.pptx', {
  title: '旅行相册',
  author: '旅行者'
});
```

## 运行示例

```bash
# 编译TypeScript
npm run build

# 运行示例
npm test
```

示例会在 `output/` 目录下生成多个PPT文件。

## 项目结构

```
.
├── src/
│   ├── converters/
│   │   ├── htmlConverter.ts    # HTML转换器
│   │   └── imageConverter.ts   # 图片转换器
│   ├── utils/
│   │   └── parser.ts           # HTML解析器
│   ├── types/
│   │   └── index.ts            # 类型定义
│   ├── examples/
│   │   └── example.ts          # 使用示例
│   └── index.ts                # 主入口
├── package.json
├── tsconfig.json
└── README.md
```

## 注意事项

1. **图片路径**: 使用图片时确保路径正确且文件存在
2. **中文字体**: 建议使用 `Microsoft YaHei` 或其他支持中文的字体
3. **文件大小**: 大量图片可能导致PPT文件较大
4. **样式限制**: 部分复杂CSS样式可能无法完全还原

## 技术栈

- **TypeScript**: 类型安全的开发
- **pptxgenjs**: PowerPoint生成
- **cheerio**: HTML解析
- **sharp**: 图片处理

## 许可证

MIT

## 贡献

欢迎提交Issue和Pull Request！

## 更新日志

### v1.0.0
- 初始版本
- 支持HTML转PPT
- 支持图片转PPT
- 支持样式自定义
- 完整的TypeScript类型支持
