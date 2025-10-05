const fs = require('fs');
const path = require('path');

console.log('🚀 Building ORCA Technologies Website...');

// Create directories if they don't exist
const createDir = (dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
    console.log(`📁 Created directory: ${dir}`);
  }
};

// Copy NASA WDS assets to public directories
const copyNasawdsAssets = () => {
  console.log('📦 Copying NASA WDS assets...');

  const nasawdsSrc = path.join(__dirname, 'node_modules', 'nasawds', 'src');

  // Copy CSS files
  const cssSrc = path.join(nasawdsSrc, 'css', 'styles.css');
  const cssDest = path.join(__dirname, 'assets', 'css', 'nasa-styles.css');
  createDir(path.dirname(cssDest));
  fs.copyFileSync(cssSrc, cssDest);
  console.log('✅ Copied NASA WDS styles.css');

  // Copy JavaScript files
  const jsSrc = path.join(nasawdsSrc, 'js', 'uswds.min.js');
  const jsDest = path.join(__dirname, 'assets', 'js', 'uswds.min.js');
  createDir(path.dirname(jsDest));
  fs.copyFileSync(jsSrc, jsDest);
  console.log('✅ Copied NASA WDS uswds.min.js');

  // Copy image files
  const imgSrcDir = path.join(nasawdsSrc, 'img');

  // Copy logo image
  const logoSrc = path.join(imgSrcDir, 'logo-img.png');
  const logoDest = path.join(__dirname, 'assets', 'images', 'logo-img.png');
  createDir(path.dirname(logoDest));
  fs.copyFileSync(logoSrc, logoDest);
  console.log('✅ Copied NASA logo image');

  // Copy US flag image
  const flagSrc = path.join(imgSrcDir, 'us_flag_small.png');
  const flagDest = path.join(__dirname, 'assets', 'images', 'us_flag_small.png');
  fs.copyFileSync(flagSrc, flagDest);
  console.log('✅ Copied US flag image');

  // Copy close icon
  const closeSrc = path.join(imgSrcDir, 'usa-icons', 'close.svg');
  const closeDest = path.join(__dirname, 'assets', 'images', 'usa-icons', 'close.svg');
  createDir(path.dirname(closeDest));
  fs.copyFileSync(closeSrc, closeDest);
  console.log('✅ Copied close icon');

  // Copy all usa-icons directory
  const iconsSrcDir = path.join(imgSrcDir, 'usa-icons');
  const iconsDestDir = path.join(__dirname, 'assets', 'images', 'usa-icons');
  copyDirectory(iconsSrcDir, iconsDestDir);
  console.log('✅ Copied all USA icons');

  // Copy fonts directory
  const fontsSrcDir = path.join(nasawdsSrc, 'fonts');
  const fontsDestDir = path.join(__dirname, 'assets', 'fonts');
  copyDirectory(fontsSrcDir, fontsDestDir);
  console.log('✅ Copied all fonts');
};

// Copy directory recursively
const copyDirectory = (src, dest) => {
  const stats = fs.statSync(src);

  if (stats.isDirectory()) {
    createDir(dest);
    const items = fs.readdirSync(src);

    for (const item of items) {
      const srcPath = path.join(src, item);
      const destPath = path.join(dest, item);
      copyDirectory(srcPath, destPath);
    }
  } else {
    fs.copyFileSync(src, dest);
  }
};

// Main build process
const build = () => {
  try {
    copyNasawdsAssets();
    console.log('🎉 Build completed successfully!');
    console.log('📝 Ready for deployment to Netlify');
  } catch (error) {
    console.error('❌ Build failed:', error);
    process.exit(1);
  }
};

// Run the build
build();
