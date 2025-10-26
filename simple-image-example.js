// 简单的图片转PPT示例
// 这是一个JavaScript文件，可以直接修改和使用

const { imageToPpt } = require('./dist/index');

// ==================== 方式1：单张图片 ====================
async function convertSingleImage() {
  console.log('示例1: 转换单张图片...');

  // 修改这里的图片路径（支持的格式：jpg, png, gif, bmp等）
  const imagePath = 'your-image.jpg';  // 改成你的图片路径，例如：'D:/Photos/photo1.jpg'

  try {
    await imageToPpt(imagePath, 'output/single-image.pptx', {
      title: '单张图片演示',
      author: '你的名字'
    });
    console.log('✓ 成功生成: output/single-image.pptx\n');
  } catch (err) {
    console.error('✗ 失败:', err.message, '\n');
  }
}

// ==================== 方式2：多张图片（相册模式） ====================
async function convertMultipleImages() {
  console.log('示例2: 转换多张图片为相册...');

  // 修改这里的图片路径列表
  const imagePaths = [
    'D:/Photos/photo1.jpg',  // 改成你的图片路径
    'D:/Photos/photo2.jpg',
    'D:/Photos/photo3.jpg',
    'D:/Photos/photo4.jpg'
  ];

  try {
    await imageToPpt(imagePaths, 'output/photo-album.pptx', {
      title: '我的相册',
      author: '你的名字'
    });
    console.log('✓ 成功生成: output/photo-album.pptx\n');
  } catch (err) {
    console.error('✗ 失败:', err.message, '\n');
    console.error('提示：请确保图片路径正确且文件存在\n');
  }
}

// ==================== 使用说明 ====================
console.log('========================================');
console.log('图片转PPT工具');
console.log('========================================');
console.log('');
console.log('使用说明：');
console.log('1. 修改上面的图片路径');
console.log('2. 保存文件');
console.log('3. 运行: node simple-image-example.js');
console.log('');
console.log('Windows路径格式示例：');
console.log('  - D:/Photos/photo.jpg  (推荐)');
console.log('  - D:\\\\Photos\\\\photo.jpg  (也可以)');
console.log('');
console.log('========================================');
console.log('');

// ==================== 执行转换 ====================
// 取消下面的注释来运行相应的功能

// convertSingleImage();  // 取消注释运行单张图片转换
// convertMultipleImages();  // 取消注释运行多张图片转换

console.log('提示：请先修改代码中的图片路径，然后取消相应函数的注释');
