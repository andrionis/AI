// 简单的HTML转PPT示例
// 这是一个JavaScript文件，可以直接修改和使用

const { htmlToPpt } = require('./dist/index');

// ==================== 修改这里的HTML内容 ====================
const myHtml = `
  <h1 style="color: #e74c3c; text-align: center;">我的演示文稿</h1>

  <h2 style="color: #3498db;">项目介绍</h2>
  <p>这是一个非常棒的项目演示</p>
  <ul>
    <li>功能强大</li>
    <li>操作简单</li>
    <li>效果出色</li>
  </ul>

  <h2 style="color: #27ae60;">核心优势</h2>
  <p><strong>技术先进：</strong>采用最新技术栈</p>
  <p><strong>性能优越：</strong>运行快速稳定</p>
  <p><strong>体验良好：</strong>界面友好美观</p>

  <h2 style="color: #f39c12;">联系方式</h2>
  <p>邮箱: your-email@example.com</p>
  <p>电话: 138-0000-0000</p>
`;

// ==================== 修改这里的配置 ====================
const options = {
  title: '项目演示',           // PPT标题
  author: '你的名字',          // 作者
  subject: '项目介绍',         // 主题
  defaultFontFace: 'Microsoft YaHei',  // 字体（微软雅黑）
  defaultFontSize: 16          // 默认字体大小
};

// ==================== 输出文件名 ====================
const outputFile = 'output/my-presentation.pptx';

// ==================== 开始转换 ====================
console.log('正在转换HTML到PPT...');

htmlToPpt(myHtml, outputFile, options)
  .then(() => {
    console.log('');
    console.log('========================================');
    console.log('✓ 转换成功！');
    console.log('========================================');
    console.log('文件位置:', outputFile);
    console.log('');
    console.log('现在可以打开这个文件查看效果了！');
    console.log('所有内容都可以在PowerPoint中编辑。');
  })
  .catch(err => {
    console.error('');
    console.error('========================================');
    console.error('✗ 转换失败！');
    console.error('========================================');
    console.error('错误信息:', err.message);
    console.error('');
  });
