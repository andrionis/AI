/**
 * 使用示例
 */

import {
  HtmlToPptConverter,
  ImageToPptConverter,
  htmlToPpt,
  imageToPpt
} from '../index';

/**
 * 示例1: 从HTML转换为PPT
 */
async function exampleHtmlToPpt() {
  console.log('示例1: HTML转PPT\n');

  const htmlContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <title>产品介绍</title>
      </head>
      <body>
        <h1 style="color: #2c3e50;">产品介绍演示</h1>

        <h2 style="color: #3498db;">关于我们</h2>
        <p>我们是一家专注于技术创新的公司</p>
        <ul>
          <li>创新驱动</li>
          <li>客户至上</li>
          <li>追求卓越</li>
        </ul>

        <h2 style="color: #e74c3c;">核心功能</h2>
        <p><strong>智能化处理：</strong>采用最新的AI技术</p>
        <p><strong>高效稳定：</strong>7x24小时不间断服务</p>
        <p><strong>安全可靠：</strong>企业级安全保障</p>

        <h2 style="color: #27ae60;">联系方式</h2>
        <p>邮箱: contact@example.com</p>
        <p>电话: 123-456-7890</p>
      </body>
    </html>
  `;

  try {
    // 方法1: 使用便捷函数
    await htmlToPpt(htmlContent, 'output/example1.pptx', {
      title: '产品介绍',
      author: '示例作者',
      subject: 'HTML转PPT示例'
    });
    console.log('✓ 成功生成: output/example1.pptx\n');

    // 方法2: 使用类实例（更多控制）
    const converter = new HtmlToPptConverter({
      title: '产品介绍（高级）',
      author: '示例作者',
      defaultFontSize: 16,
      defaultFontFace: 'Microsoft YaHei'
    });

    await converter.convertFromHtml(htmlContent);
    await converter.save('output/example2.pptx');
    console.log('✓ 成功生成: output/example2.pptx\n');
  } catch (error) {
    console.error('转换失败:', error);
  }
}

/**
 * 示例2: 从图片转换为PPT
 */
async function exampleImageToPpt() {
  console.log('示例2: 图片转PPT\n');

  // 注意：这里使用示例图片路径，实际使用时需要替换为真实路径
  const imagePaths = [
    'examples/images/slide1.jpg',
    'examples/images/slide2.jpg',
    'examples/images/slide3.jpg'
  ];

  try {
    // 方法1: 使用便捷函数
    // await imageToPpt(imagePaths, 'output/images.pptx', {
    //   title: '图片演示',
    //   author: '示例作者'
    // });
    // console.log('✓ 成功生成: output/images.pptx\n');

    // 方法2: 单张图片
    const converter = new ImageToPptConverter({
      title: '单张图片演示',
      author: '示例作者'
    });

    // await converter.convertFromImage('examples/images/sample.jpg');
    // await converter.save('output/single_image.pptx');
    console.log('图片转换示例（需要实际图片文件）\n');
  } catch (error) {
    console.error('转换失败:', error);
  }
}

/**
 * 示例3: 高级用法 - 自定义PPT
 */
async function exampleAdvanced() {
  console.log('示例3: 高级自定义\n');

  const htmlContent = `
    <h1>技术栈介绍</h1>
    <h2>前端技术</h2>
    <ul>
      <li>React</li>
      <li>Vue</li>
      <li>Angular</li>
    </ul>

    <h2>后端技术</h2>
    <ul>
      <li>Node.js</li>
      <li>Python</li>
      <li>Java</li>
    </ul>
  `;

  try {
    const converter = new HtmlToPptConverter({
      title: '技术栈',
      author: 'Tech Team',
      defaultFontSize: 18
    });

    const pptx = await converter.convertFromHtml(htmlContent);

    // 可以在这里进一步自定义PPT
    // 例如添加自定义幻灯片
    const customSlide = pptx.addSlide();
    customSlide.background = { color: '2c3e50' };
    customSlide.addText('感谢观看', {
      x: 1,
      y: 2,
      w: 8,
      h: 1.5,
      fontSize: 44,
      bold: true,
      color: 'FFFFFF',
      align: 'center',
      valign: 'middle'
    });

    await converter.save('output/advanced.pptx');
    console.log('✓ 成功生成: output/advanced.pptx\n');
  } catch (error) {
    console.error('转换失败:', error);
  }
}

/**
 * 示例4: 处理富文本HTML
 */
async function exampleRichText() {
  console.log('示例4: 富文本HTML转换\n');

  const richHtml = `
    <h1 style="color: #e74c3c; text-align: center;">2024年度报告</h1>

    <h2 style="color: #3498db;">业绩概览</h2>
    <p style="font-size: 16px;">
      本年度公司取得了<strong>显著成绩</strong>，主要体现在以下几个方面：
    </p>
    <ul>
      <li>营收增长 <strong style="color: #27ae60;">35%</strong></li>
      <li>用户数量突破 <strong style="color: #27ae60;">100万</strong></li>
      <li>市场份额提升至 <strong style="color: #27ae60;">25%</strong></li>
    </ul>

    <h2 style="color: #3498db;">未来规划</h2>
    <p>
      <strong>2025年目标：</strong>
    </p>
    <ul>
      <li>扩大市场规模</li>
      <li>提升产品质量</li>
      <li>增强客户体验</li>
    </ul>
  `;

  try {
    await htmlToPpt(richHtml, 'output/richtext.pptx', {
      title: '2024年度报告',
      author: '公司管理层',
      subject: '年度总结',
      defaultFontFace: 'Microsoft YaHei'
    });
    console.log('✓ 成功生成: output/richtext.pptx\n');
  } catch (error) {
    console.error('转换失败:', error);
  }
}

// 运行所有示例
async function runAllExamples() {
  console.log('='.repeat(50));
  console.log('HTML/图片转PPT转换器 - 使用示例');
  console.log('='.repeat(50));
  console.log();

  // 创建输出目录
  const fs = require('fs');
  if (!fs.existsSync('output')) {
    fs.mkdirSync('output', { recursive: true });
  }

  await exampleHtmlToPpt();
  await exampleImageToPpt();
  await exampleAdvanced();
  await exampleRichText();

  console.log('='.repeat(50));
  console.log('所有示例运行完成！');
  console.log('='.repeat(50));
}

// 执行示例
runAllExamples().catch(console.error);
